// svelte.config.js
import adapter from "@sveltejs/adapter-static";
const dev = process.env.NODE_ENV === "development";

export default {
  kit: {
    adapter: adapter({
      // default options are shown
      pages: "build",
      assets: "build",
      fallback: null,
      precompress: false,
      paths: {
        base: dev ? "" : "ajboni/blog",
      },
    }),

    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: true,
    },
  },
};
