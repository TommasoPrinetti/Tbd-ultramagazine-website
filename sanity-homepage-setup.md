# Sanity Studio changes for project `8c5n4win` (source of truth is online Studio)

The web app on branch `feat/sanity-rebase-v2` already queries these fields —
add them in the online Studio, no code deploy needed for content edits.

## 1. `temporaryCall`: add 4 optional fields

| field          | type    | meaning                                                                 |
|----------------|---------|-------------------------------------------------------------------------|
| `bannerEnabled`| boolean | show/hide the top scrolling banner for this call (default: visible)     |
| `bannerText`   | string  | banner text, e.g. `© TBD ULTRAMAGAZINE - LISTE ART FAIR BASEL - …`       |
| `bannerUrl`    | url     | where the banner links; empty = non-clickable strip                    |
| `promoEnabled` | boolean | show/hide the homepage promo block (default: visible)                   |

Existing docs without these fields keep current behavior (banner + promo visible).

## 2. `siteSettings` singleton (id `homepage`) — optional, overrides per-call

Create a `siteSettings` document with `_id == "homepage"`:

```js
// studio/schemas/siteSettings.js
export default {
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    {
      name: 'topBanner', type: 'object', fields: [
        { name: 'enabled', type: 'boolean', initialValue: true },
        { name: 'text', type: 'string' },
        { name: 'url', type: 'url' },
      ],
    },
    {
      name: 'promoFeature', type: 'object', fields: [
        { name: 'enabled', type: 'boolean', initialValue: true },
        { name: 'mode', type: 'string', options: { list: ['temporaryCall', 'custom'] }, initialValue: 'temporaryCall' },
        { name: 'title', type: 'string' },
        { name: 'image', type: 'image' },
        { name: 'ctaLabel', type: 'string' },
        { name: 'ctaUrl', type: 'string' },
      ],
    },
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
}
```

Frontend precedence (`src/routes/+layout.server.ts`):
`siteSettings.topBanner` → `temporaryCall.banner*` → built-in default.
`siteSettings.promoFeature.enabled=false` hides the homepage promo block.
Until the singleton exists, the query returns `null` and per-call fields apply.

## 3. Verify

```bash
npx sanity documents query --project 8c5n4win --dataset production \
  '*[_type == "siteSettings" && _id == "homepage"][0]{topBanner, promoFeature}'
```
