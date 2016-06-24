import gulp from 'gulp';
import connect from 'gulp-connect';
import jade from 'gulp-jade';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import image from 'gulp-image';


gulp.task('jade', ()=>{
  gulp.src('./src/*.jade')
  	.pipe(jade({
  		pretty: true
  	}))
  	.pipe(gulp.dest('./dist/'))
  	.pipe(connect.reload())
});

gulp.task('connect', ()=>{
  connect.server({
  	base: 'http://localhost',
    root: './dist',
    port: 9000,
    livereload: true
  });
});

gulp.task('html', ()=>{
  gulp.src('./src/**/*.html')
  	.pipe(connect.reload())
});

gulp.task('styles', ['autoprefixer'],function() {  
    gulp.src(['./src/**/*.css'])
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())
});

gulp.task('image', function () {
  gulp.src('./src/img/**/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('watch', ()=>{
	gulp.watch('./src/**/*.html', ['html']);
	gulp.watch('./src/*.jade', ['jade']);
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
gulp.task('default', ['image','styles','connect','jade','watch'], function () {
 
});