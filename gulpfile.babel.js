import gulp from 'gulp';
import connect from 'gulp-connect';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import prefix from 'gulp-autoprefixer'
import image from 'gulp-image';
import sass from 'gulp-sass';
import include from 'gulp-include';

gulp.task('connect', ()=>{
  connect.server({
  	base: 'http://localhost',
    root: './dist',
    port: 9000,
    livereload: true
  });
});

gulp.task('html', ()=>{
  gulp.src('./src/*.html')
    .pipe(include()).on('error', console.log)
    .pipe(gulp.dest('./dist/'))
  	.pipe(connect.reload())
});

gulp.task('styles',function() {  
    gulp.src(['./src/**/*.css'])
        .pipe(prefix('last 22 versions'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())
});

gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 22 versions'))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/*.scss', ['sass']);
});


gulp.task('image', function () {
  gulp.src('./src/img/**/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('watch', ()=>{
	gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/**/*.css', ['styles']);
  gulp.watch('./src/img/**/*', ['image']);
});

gulp.task('autoprefixer', ()=>{
    gulp.src('./src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});
//,'html'
gulp.task('default', ['image','styles','connect','html','watch'], function () {
 
});