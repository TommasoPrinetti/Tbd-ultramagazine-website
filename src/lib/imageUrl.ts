import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

//@ts-ignore
import { env } from "$env/dynamic/private";

const builder = imageUrlBuilder({
  projectId: env.SANITY_PROJECT_ID || '8c5n4win',
  dataset: env.SANITY_DATASET || 'tbd_issues',
});

export function urlFor(
  source: SanityImageSource | null | undefined
): string | null {
  if (!source || !(source as any).asset) return null;
  // auto=format only: same dimensions, modern container (webp/avif),
  // full quality. Safe drop-in default everywhere (incl. og:image).
  return builder.image(source).auto('format').url();
}

export function urlForOptimized(
  source: SanityImageSource | string | null | undefined,
  width?: number,
  height?: number
): string | null {
  if (!source) return null;
  if (
    typeof source !== 'string' &&
    !(source as any).asset &&
    !(source as any)._ref &&
    !(source as any)._id
  )
    return null;
  // Accepts image objects ({asset: {_ref}} or expanded {asset: {_id}/{url}}),
  // asset-id strings and existing CDN URLs. Proportional downscale + modern
  // format at q80.
  let image = builder.image(source as any).auto('format').quality(80);
  if (width) image = image.width(width);
  if (height) image = image.height(height);
  return image.url();
}
