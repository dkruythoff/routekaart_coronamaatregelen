const sass = require('sass')
const path = require('path')

module.exports = function (eleventyConfig) {

  const dirRoot = path.join(__dirname, 'src')
  eleventyConfig.addTransform('sass', async (content, outputPath) => {
    if (outputPath.endsWith('.css')) {
      return await new Promise((resolve, reject) => {
        sass.render(
          { data: content, includePaths: [dirRoot], outputStyle: 'compressed' },
          (error, result) => error ? reject(error) : resolve(result.css)
        )
      })
    }
    return content
  })
  eleventyConfig.addWatchTarget(path.join(dirRoot, '_scss'))

  // eleventyConfig.addPassthroughCopy({ "static/images": "images" })
  // eleventyConfig.addPassthroughCopy({ "static/fonts": "fonts" })
  // eleventyConfig.setDataDeepMerge(true)

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes'
    }
  }
}
