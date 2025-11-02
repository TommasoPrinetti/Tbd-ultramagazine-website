import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      // Alias configuration as per the updated documentation
      $webresources: "src/lib/webresources",
      $components: "src/components",
      $routes: "src/routes",
      $types: "src/typefaces",
      $issues: "src/routes/issues/",
      $articles: "src/routes/issues/[issue]/articles",
    },
  },
};

export default config;
