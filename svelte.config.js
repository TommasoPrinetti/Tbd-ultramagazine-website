import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      // Alias configuration as per the updated documentation
      $components: "src/components",
      $routes: "src/routes",
      $issues: "src/routes/issues/",
      $articles: "src/routes/issues/[issue]/articles",
    },
  },
};

export default config;
