module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer')({
      overrideBrowserslist: [
        'Chrome >= 90',
        'Firefox >= 88', 
        'Safari >= 14',
        'Edge >= 90',
        'iOS >= 14',
        'Android >= 90'
      ]
    }),
    
    // CSS minification for production
    ...(process.env.NODE_ENV === 'production' ? [
      require('cssnano')({
        preset: 'default'
      })
    ] : [])
  ]
}