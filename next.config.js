// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// // module.exports = withBundleAnalyzer({})

module.exports = {
  images: {
    domains: [
      "static.holycoders.com",
      "holycoders.s3.amazonaws.com",
      "holycoders.s3.eu-west-2.amazonaws.com",
      "i0.wp.com",
      "i1.wp.com",
      "i2.wp.com",
    ],
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/newsletter/",
        destination: "/enter/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/post-sitemap.xml",
        destination: "/api/sitemap/",
      },
      {
        source: "/course-sitemap.xml",
        destination: "/api/course-sitemap/",
      },
    ];
  },
  poweredByHeader: false,
};