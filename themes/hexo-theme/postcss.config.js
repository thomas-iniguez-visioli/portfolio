module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url')([
      { filter: '**/*.woff2', url: 'inline' },
    ]),
    require('postcss-preset-env')({
      stage: 0,
      autoprefixer: {
        // Enhanced browser support for performance
        overrideBrowserslist: [
          'Chrome >= 90',
          'Firefox >= 88', 
          'Safari >= 14',
          'Edge >= 90',
          'iOS >= 14',
          'Android >= 90'
        ]
      },
    }),
    require('postcss-nested'),
    require('postcss-color-function'),
    require('postcss-extend-rule'),
    
    // Performance optimizations - Requirement 4.3
    ...(process.env.NODE_ENV === 'production' ? [
      // CSS minification and compression
      require('cssnano')({
        preset: ['advanced', {
          // Aggressive minification for better compression
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          mergeIdents: true,
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifyParams: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeDisplayValues: true,
          normalizePositions: true,
          normalizeRepeatStyle: true,
          normalizeString: true,
          normalizeTimingFunctions: true,
          normalizeUnicode: true,
          normalizeUrl: true,
          orderedValues: true,
          reduceIdents: true,
          reduceInitial: true,
          reduceTransforms: true,
          svgo: true,
          uniqueSelectors: true
        }]
      })
    ] : [])
  ]
}
