var gulp = require('gulp');

var paths = {
    src: 'build/**/*',
    srcJS: 'build/static/js/*.js',
    srcCSS: 'build/static/css/*.js',
    resources: 'static/media/*',
    srcHTML: 'bulid/*.html',
    
    dist: '../public'
    
}
/*
gulp.task('toPug', function() {
    return gulp.src(paths.srcHTML)
    .pipe(html2pug())
    .pipe(gulp.dest(paths.dist));
  });
*/
gulp.task(/*'toPug',*/'all', function () {
    return gulp.src(paths.src).pipe(gulp.dest(paths.dist));
});

gulp.task('copy', ['all']);