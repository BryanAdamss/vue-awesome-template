const path = require('path')

module.exports = {
  pluginOptions: {
    'vue-cli-plugin-auto-alias': {
      rootDirName: 'src',
      alias: {}
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/sass/utils/_variablesCustom-m.scss'),
        path.resolve(__dirname, 'src/sass/utils/_variables.scss'),
        path.resolve(__dirname, 'src/sass/utils/_function.scss'),
        path.resolve(__dirname, 'src/sass/utils/_mixins.scss'),
        path.resolve(__dirname, 'src/sass/utils/_mediaQuery.scss'),
        path.resolve(__dirname, 'src/sass/utils/_placeholders.scss')
      ]
    }
  }
}
