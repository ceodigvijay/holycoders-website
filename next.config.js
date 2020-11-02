// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withMdxEnhanced = require('next-mdx-enhanced')

// // module.exports = withBundleAnalyzer({})


module.exports = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/sitemap/',
        destination: '/api/sitemap/',
      },
    ]
  },
  
}

module.exports = withMdxEnhanced({
  layoutPath: 'components/layouts/',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [],
  usesSrc: false,
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {},
    phase: 'prebuild|loader|both',
  },
  reExportDataFetching: false,
})({
  trailingSlash: true,
  images: {
    domains: ['holycoders.com'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap/',
        destination: '/api/sitemap/',
      },
    ]
  },
  
})