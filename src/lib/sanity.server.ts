import { createClient } from "@sanity/client";

//@ts-ignore
import { env } from "$env/dynamic/private";

export const sanity = createClient({
  // projectId/dataset are public identifiers — safe as code defaults so
  // `vite dev` works without a local .env (token stays env-only).
  // Live content is in `tbd_issues` (`tbd_articles` is empty).
  projectId: env.SANITY_PROJECT_ID || '8c5n4win',
  dataset: env.SANITY_DATASET || 'tbd_issues',
  apiVersion: env.SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
  token: env.SANITY_READ_TOKEN,
});
