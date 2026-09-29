import { error } from '@sveltejs/kit';
import articlesData from '$lib/articles_new.json';

// Resolves a full article body: nested Sanity article first (ISSUE > ARTICLES),
// legacy JSON fallback (keeps TERRAFORMA EXO + old URLs alive).
// Slugified-title fallback so articles without a stored slug/legacyName
// in Sanity stay reachable (mirrors the issue-article link builder).
function createSlug(title: string | null | undefined) {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export async function load({ params, parent }: any) {
  const { issues } = (await parent()) as { issues: any[] };
  const issue = (issues || []).find((i: any) => i.issueTitle === params.issue);
  if (issue?.showPage === false) {
    throw error(404, 'Issue not found');
  }
  const nested = issue?.articles?.find(
    (a: any) => a.legacyName === params.article || a.slug?.current === params.article || createSlug(a.title) === params.article,
  );
  if (nested && issue) {
    const related = (issue.articles || [])
      .filter((a: any) => a !== nested)
      .map((a: any, i: number) => ({
        index: i + 1,
        title: a.title,
        href: `/issues/${issue.issueTitle}/articles/${a.slug?.current ?? a.legacyName ?? createSlug(a.title)}`,
      }));
    return {
      mode: 'sanity' as const,
      issueTitle: issue.issueTitle,
      slider: {
        issueCover: issue.issueCover,
        issuePrice: issue.issuePrice,
        issueTitle: issue.issueTitle,
      },
      related,
      article: {
        articleTitle: nested.title,
        articleText: nested.description,
        parentIssue: issue.issueTitle,
        autore: nested.autore,
        note_autore: nested.note_autore,
        showDidascalie: !!nested.showDidascalie,
        rowsDidascalie: nested.didascalie ?? [],
        showBibliografia: !!nested.showBibliografia,
        rowsBibliografie: nested.bibliografie ?? [],
        heroImg: nested.thumbnail?.asset?.url ?? nested.hero?.asset?.url ?? null,
        body: nested.body ?? [],
      },
    };
  }
  const article = (articlesData as any[]).find((a) => a.articleName === params.article);
  if (article) {
    return { mode: 'json' as const, article };
  }
  throw error(404, 'Article not found');
}
