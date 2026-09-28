// Migrates src/lib/articles_new.json bodies INTO nested issue.articles[] in tbd_issues.
// Usage: node src/scripts/migrate-articles.mjs [--dry-run]
// Env (from .env): SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN
// Strategy: fetch live nested items, MERGE (keep live section/thumbnail/title/
// description, add body/hero/author/etc from JSON), patch wholesale per issue.
// Idempotent: patches set the full array deterministically; safe to re-run.
import {createClient} from '@sanity/client'
import {readFileSync, existsSync, readdirSync} from 'node:fs'

const args = process.argv.slice(2)
const DRY = args.includes('--dry-run')

function loadEnv() {
  const env = {}
  const p = new URL('../../.env', import.meta.url)
  if (!existsSync(p)) throw new Error('Missing .env (see .env.example)')
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)=(.*)\s*$/)
    if (m) env[m[1]] = m[2]
  }
  return env
}
const env = loadEnv()

const client = createClient({
  projectId: env.SANITY_PROJECT_ID || '8c5n4win',
  dataset: env.SANITY_DATASET || 'tbd_issues',
  apiVersion: env.SANITY_API_VERSION || '2024-01-01',
  token: env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// JSON parentIssue -> live issue _id (TERRAFORMA EXO has no issue doc -> skipped)
const PARENT_MAP = {
  ISSUE1: 'QvNu05jcrmUxtcyMDj0oMJ',
  ISSUE2: 'RPrHIEg1p7tfu65MoRt2M2',
  XPOST: 'QvNu05jcrmUxtcyMDj0ou4',
  LOOKATME_VOL_I: 'RPrHIEg1p7tfu65MoRt45b',
  LOOKATME_VOL_II: 'RPrHIEg1p7tfu65MoRt4HY',
  FOREHEADVULVA: 'V4xz0Lvll0E9i9bq8T3IF9',
}

const MANIFEST = JSON.parse(
  readFileSync('/var/folders/ky/cxzrn_m55hb27d6nnvcg3w7m0000gn/T/opencode/tbd-migrate/manifest.json', 'utf8'),
)

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'untitled'

let key = 0
const K = (p) => `${p}${key++}`

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
}

// <br><br>+ -> paragraph breaks; <b>/<i>/<u> -> marks. All other tags stripped.
function htmlToBlocks(html) {
  const paras = String(html)
    .split(/<br\s*\/?>(?:\s*<br\s*\/?>)+/i)
    .map((p) => p.replace(/<br\s*\/?>/gi, ' ').trim())
    .filter(Boolean)
  const out = []
  for (const para of paras) {
    const children = []
    const re = /<(b|i|u)>|<\/[a-zA-Z0-9]+>/g
    const stack = []
    let last = 0
    let m
    const push = (text) => {
      const clean = decodeEntities(text.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ')
      if (clean.trim()) children.push({_type: 'span', _key: K('s'), text: clean, marks: [...stack]})
    }
    while ((m = re.exec(para))) {
      push(para.slice(last, m.index))
      const tag = m[0]
      if (tag === '<b>') stack.push('strong')
      else if (tag === '<i>') stack.push('em')
      else if (tag === '<u>') stack.push('underline')
      else if (tag === '</b>') stack.splice(stack.lastIndexOf('strong'), 1)
      else if (tag === '</i>') stack.splice(stack.lastIndexOf('em'), 1)
      else if (tag === '</u>') stack.splice(stack.lastIndexOf('underline'), 1)
      last = m.index + tag.length
    }
    push(para.slice(last))
    if (children.length) out.push({_type: 'block', _key: K('b'), style: 'normal', markDefs: [], children})
  }
  return out
}

const htmlToPlain = (html) =>
  decodeEntities(String(html).replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')).trim()

const splitList = (s) =>
  String(s || '')
    .split('*')
    .map(htmlToPlain)
    .filter(Boolean)

const assetCache = new Map()
let nUploads = 0
async function upload(localPath) {
  const entry = MANIFEST[localPath]
  if (!entry || entry.missing) {
    console.warn(`    ! missing asset, skipping: ${localPath}`)
    return null
  }
  if (assetCache.has(localPath)) return assetCache.get(localPath)
  if (DRY) {
    const fake = {_type: 'image', asset: {_type: 'reference', _ref: 'dryrun'}}
    assetCache.set(localPath, fake)
    return fake
  }
  process.stdout.write(`    uploading ${localPath.split('/').pop()}...`)
  const asset = await client.assets.upload('image', readFileSync(entry.tmp), {
    filename: localPath.split('/').pop(),
  })
  nUploads++
  console.log(` ok (${nUploads} total)`)
  const ref = {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
  assetCache.set(localPath, ref)
  return ref
}

async function buildBody(a) {
  const body = []
  // Preserve legacy render order: Object key insertion order (p1,img1,gallery1,p2,...)
  for (const [k, v] of Object.entries(a.articleContent || {})) {
    if (!v) continue
    if (k.startsWith('p')) body.push(...htmlToBlocks(v))
      else if (k.startsWith('img')) {
        const ref = await upload(v)
        // Schema member is named `bodyImage` -> stored _type must be bodyImage
        if (ref) body.push({...ref, _type: 'bodyImage', _key: K('b')})
      } else if (k.startsWith('gallery')) {
      const dir = 'static' + v
      let files = []
      if (existsSync(dir)) {
        files = readdirSync(dir)
          .filter((f) => /\.(webp|png|jpe?g)$/i.test(f))
          .sort((x, y) => x.localeCompare(y, undefined, {numeric: true}))
          .map((f) => `${v}/${f}`)
      }
      if (!files.length) {
        console.warn(`    ! empty gallery ${v}`)
        continue
      }
      const images = []
      for (const f of files) {
        const ref = await upload(f)
        if (ref) images.push(ref)
      }
      if (images.length) body.push({_type: 'gallery', _key: K('b'), images})
    }
  }
  return body
}

async function migrate() {
  const articles = JSON.parse(readFileSync(new URL('../lib/articles_new.json', import.meta.url), 'utf8'))
  const byParent = new Map()
  for (const a of articles) {
    if (!byParent.has(a.parentIssue)) byParent.set(a.parentIssue, [])
    byParent.get(a.parentIssue).push(a)
  }
  console.log(`articles: ${articles.length}, groups: ${[...byParent.keys()].join(', ')}, dry-run: ${DRY}`)

  // Fetch live nested items to merge with (keeps Studio-edited abstracts)
  const liveIssues = await client.fetch(
    `*[_type == "issue"]{_id, issueTitle, articles}`,
  )
  const liveById = new Map(liveIssues.map((i) => [i._id, i]))

  const warnings = []
  let nPatched = 0
  for (const [parent, group] of byParent) {
    const issueId = PARENT_MAP[parent]
    if (!issueId) {
      warnings.push(`no issue doc for parentIssue ${parent} (${group.map((a) => a.articleName).join(', ')}) — skipped`)
      continue
    }
    const live = liveById.get(issueId)
    console.log(`[${live?.issueTitle ?? issueId}] ${group.length} articles`)
    const liveItems = live?.articles ?? []
    const norm = (s) => s?.trim().toLowerCase()
    const match = (a) =>
      liveItems.find(
        (li) =>
          li.title === a.articleTitle ||
          li.title === a.articleName ||
          norm(li.title) === norm(a.articleTitle) ||
          norm(li.title) === norm(a.articleName),
      )
    const enriched = []
    for (const a of group) {
      console.log(`  - ${a.articleName}`)
      const base = match(a) ?? {title: a.articleTitle, description: a.articleText}
      if (!match(a)) console.log(`    (new nested item)`)
      const body = await buildBody(a)
      // Hero reuses the list thumbnail asset (same image) — no duplicate upload.
      // Only uploads when the nested item has no thumbnail yet (new items).
      let hero = base?.thumbnail ?? null
      if (hero) console.log(`    hero: reused thumbnail asset`)
      else if (a.articleImg) hero = await upload(a.articleImg)
      enriched.push({
        ...base,
        _key: base._key ?? `a${key++}`,
        _type: base._type ?? 'issueArticle',
        slug: {current: slugify(a.articleName)},
        legacyName: a.articleName,
        hero: hero ?? base.hero ?? undefined,
        autore: a.autore || base.autore || undefined,
        note_autore: a.note_autore || base.note_autore || undefined,
        ultra: !!a.articleUltra,
        body,
        showDidascalie: !!a.showDidascalie,
        didascalie: splitList(a.didascalie),
        showBibliografia: !!a.showBibliografia,
        bibliografie: splitList(a.bibliografie),
      })
      console.log(`    body: ${body.length} blocks`)
    }
    if (DRY) {
      nPatched++
      continue
    }
    await client.patch(issueId).set({articles: enriched}).commit()
    nPatched++
    console.log(`  = patched ${issueId} (${enriched.length} nested articles)`)
  }
  console.log(`done: ${nPatched} issues patched, ${nUploads} uploads, warnings: ${warnings.length}`)
  warnings.forEach((w) => console.log('  !', w))
}

migrate().catch((e) => {
  console.error('MIGRATION FAILED:', e.message)
  process.exit(1)
})
