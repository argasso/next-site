const siteconfig = require('./siteconfig.json')

module.exports = {
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
  target: 'serverless',
  images: {
    domains: [siteconfig.domain],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on fs module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }
    // SVG support
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    })
    return config
  },
}
