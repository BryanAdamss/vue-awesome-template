// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require('./src/plugins/postcss-plugin-add-var-value.js'),
    require('postcss-import'),
    require('postcss-url'),
    // to edit target browsers: use "browserslist" field in package.json
    require('autoprefixer')
  ]
}
