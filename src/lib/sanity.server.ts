import { createClient } from "@sanity/client";

//@ts-ignore
import { env } from "$env/dynamic/private";

export const sanity = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
  apiVersion: env.SANITY_API_VERSION,
  useCdn: true,
  token: env.SANITY_READ_TOKEN,
});
