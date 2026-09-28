// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Swap for the real domain once it's live (used for canonical URLs and social cards).
  site: 'https://marys-pet-grooming-demo.netlify.app',
  devToolbar: { enabled: false },
  // Lets a parent's scoped styles reach the `class` it passes to child components.
  scopedStyleStrategy: 'class',
});
