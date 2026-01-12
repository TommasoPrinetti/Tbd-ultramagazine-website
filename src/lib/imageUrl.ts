import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

//@ts-ignore
import { env } from "$env/dynamic/private";

const builder = imageUrlBuilder({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
});

export function urlFor(
  source: SanityImageSource | null | undefined
): string | null {
  if (!source || !(source as any).asset) return null;
  return builder.image(source).url();
}

export function urlForOptimized(
  source: SanityImageSource | null | undefined,
  width?: number,
  height?: number
): string | null {
  if (!source || !(source as any).asset) return null;
  let image = builder.image(source);
  if (width) image = image.width(width);
  if (height) image = image.height(height);
  return image.url();
}
