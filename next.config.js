const siteconfig = require('./siteconfig.json')
const path = require('path')

module.exports = {
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
  // env: {
  //   ESBUILD_BINARY_PATH: path.join(
  //     process.cwd(),
  //     'node_modules',
  //     'esbuild',
  //     'bin',
  //     'esbuild'
  //   ),
  // },
  target: 'serverless',
  images: {
    domains: [siteconfig.domain],
  },
  webpack: (config, { isServer, defaultLoaders }) => {
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
    config.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['body'] },
    })
    config.module.rules.push({
      test: /\.mdx$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['body'] },
    })
    // config.module.rules.push({
    //   test: /\.mdx$/,
    //   use: [
    //     defaultLoaders.babel,
    //     '@mdx-js/loader',
    //     path.join(__dirname, './lib/fm-loader'),
    //   ],
    // })
    return config
  },
}
