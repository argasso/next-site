const siteconfig = require('./siteconfig.json')

module.exports = {
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
  // target: 'serverless',
  images: {
    domains: [siteconfig.domain],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on fs module
    //if (!isServer) {
    //  config.node = {
    //    fs: 'empty',
    //  }
    //}
    // SVG support
    //    config.module.rules.push({
    //      test: /\.svg$/,
    //      use: [
    //        {
    //          loader: '@svgr/webpack',
    //        },
    //        {
    //          loader: 'file-loader',
    //        },
    //      ],
    //      type: 'javascript/auto',
    //      issuer: {
    //        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
    //      },
    //    })
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
