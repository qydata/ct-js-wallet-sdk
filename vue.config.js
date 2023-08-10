module.exports = {
  productionSourceMap: true,
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  }
}
