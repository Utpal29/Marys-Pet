/** Unsplash CDN URL for a photo ID, cropped to `w` (and `h` when given). */
export function unsplash(id: string, w: number, h?: number, q = 70): string {
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(w), q: String(q) });
  if (h) params.set('h', String(h));
  return `https://images.unsplash.com/photo-${id}?${params}`;
}

/** A `srcset` covering 1x/2x-ish widths, keeping the same aspect ratio (h / w) at every size. */
export function unsplashSrcset(id: string, widths: number[], ratio?: number): string {
  return widths
    .map((w) => `${unsplash(id, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`)
    .join(', ');
}
