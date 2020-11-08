// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// next.config.js
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// // module.exports = withBundleAnalyzer({})

module.exports = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/sitemap/",
        destination: "/api/sitemap/",
      },
    ];
  },
};

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],

  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/sitemap/",
        destination: "/api/sitemap/",
      },
    ];
  },
});
