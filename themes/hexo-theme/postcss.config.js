module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-url')([
      { filter: '**/*.woff2', url: 'inline' },
    ]),
    require('postcss-preset-env')({
      stage: 1, // Changed from 0 to 1 to avoid experimental features that might cause issues
      features: {
        'custom-properties': true,
        'nesting-rules': true,
        'color-function': true,
        // Disable env-function that's causing issues with clamp()
        'environment-variables': false
      },
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
        preset: ['default', {
          // Optimized minification for better compression
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          colormin: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyGradients: true,
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
          reduceInitial: true,
          reduceTransforms: true,
          uniqueSelectors: true
        }]
      })
    ] : [])
  ]
}
