var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');

var paths = {
    dist: 'dist/',
    distVendor: 'dist/vendor',
    index: 'app/index.html',
    app: 'app/**/*.js',
    css: 'app/**/*.css',
    images: 'images/**/*'
   
};


gulp.task('default', ['copyTemplate', 'scripts', 'watch']);

gulp.task('copyTemplate', function() {
   gulp.src(['template/**/*'], {base: '.'}).pipe(gulp.dest(paths.dist));
});

gulp.task('scripts', function() {
   var distIndex =  gulp.src(paths.index).pipe(gulp.dest(paths.dist));
   var images = gulp.src([paths.images], {base: '.'}).pipe(gulp.dest(paths.dist));
   var customScripts = gulp.src(paths.app).pipe(gulp.dest(paths.dist));
   var customCss = gulp.src(paths.css).pipe(gulp.dest(paths.dist));
   var distVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.distVendor));
   
   // distIndex.pipe(inject(customScripts, {relative: true}))
   //    .pipe(inject(distVendors, {relative: true, name: 'vendorInject'}))
   //    .pipe(gulp.dest(paths.dist))
});

gulp.task('watch', function() {
   gulp.watch(paths.index, ['scripts']);
   gulp.watch(paths.app, ['scripts']);
   gulp.watch(paths.bower, ['scripts']);
});