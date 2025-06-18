module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url')([
      { filter: '**/*.woff2', url: 'inline' },
    ]),
    require('postcss-preset-env', {
      stage: 0,
      autoprefixer: {},
    }),
    require('postcss-nested'),
    require('postcss-color-function'),
    require('postcss-extend-rule'),
  ]
}
