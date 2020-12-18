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

// module.exports = {
//   trailingSlash: true,
//   async rewrites() {
//     return [
//       {
//         source: "/sitemap/",
//         destination: "/api/sitemap/",
//       },
//     ];
//   },
// };

module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/courseSitemap.js");
      console.log("Generating Course Sitemap");
    }

    return config;
  },
};

module.exports = withMDX({
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/courseSitemap.js");
      console.log("Generating Course Sitemap");
    }

    return config;
  },
  pageExtensions: ["js", "jsx", "mdx"],
  images: {
    domains: [
      "holycoders.s3.amazonaws.com",
      "holycoders.s3.eu-west-2.amazonaws.com",
      "i0.wp.com",
      "i1.wp.com",
      "i2.wp.com",
    ],
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/post-sitemap/",
        destination: "/api/sitemap/",
      },
      {
        source: "/sitemap/",
        destination: "/sitemap.xml/",
      },
      {
        source: "/course-sitemap/",
        destination: "/course-sitemap.xml/",
      },
    ];
  },
  poweredByHeader: false,
});
