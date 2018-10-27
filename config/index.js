'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/index.php': {
        // target: 'http://jiatui.api.com/index.php', // ����
        // target: 'https://tyunzhentui.71360.com', // ��ʽ
        target: 'https://zhentuityun.71360.com', // ����
        changeOrigin: true,
        pathRewrite: {
          '^/index.php': ''
        }
      }
    },
    // token: '%21%A5%B9%C1%2FAt%BC%A0%2F%85yq%E05%ABi%BB%AFG%F6%0F%B6%9D%DD%FC%9E%86-Y%96%3A%25%0E%F6%D8%A5%3E%0Bj%8F%D2j%F4%F2%B3%A0B%86t%03GNI%F7+%F5%88%09q%DDs%E8.%C3HR%3E%85%D9%AC%B0',
    token: 'TnlIQ2JuMExmb0dMSVFnRytGVmRuR203cjBmMkQ3YWQzZnllaGkxWmxqclM0bC9SK1UyNDVvL1NhdlR5czZCQ1ZhM2FnWTNFelFjdWNVZEh5UlpHVGc9PQ%3D%3D',

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
