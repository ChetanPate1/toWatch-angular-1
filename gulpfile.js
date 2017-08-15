/* Required */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;



/* SASS Task*/
gulp.task('sass', function () {
   return gulp.src('app/css/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({ stream: true }));
});

gulp.task('fonts', function(){
    return gulp.src('app/css/fonts/dripicons-v2.*')
        .pipe(gulp.dest('build/css/fonts'));
});

gulp.task('bootstrap', function(){
    return gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('build/css'));
});

gulp.task('css', ['sass', 'fonts', 'bootstrap'], function(){
    return gulp.src('app/css/main.css')
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});



/* Scripts Task */
gulp.task('angular', function(){
    return gulp.src('bower_components/angular/angular.min.js')
        .pipe(gulp.dest('build/js/libs'));
});

gulp.task('angular-ui-router', function(){
    return gulp.src('bower_components/angular-ui-router/release/angular-ui-router.min.js')
        .pipe(gulp.dest('build/js/libs'));
});

gulp.task('firebase', function(){
    return gulp.src('bower_components/firebase/firebase.js')
        .pipe(gulp.dest('build/js/libs'));
});

gulp.task('angularfire', function(){
    return gulp.src('bower_components/angularfire/dist/angularfire.min.js')
        .pipe(gulp.dest('build/js/libs'));
});

gulp.task('components', function(){
    return gulp.src('app/components/**/*.html')
        .pipe(gulp.dest('build/components'))
        .pipe(reload({ stream: true }));
});

gulp.task('scripts', ['components', 'angular', 'angular-ui-router', 'firebase', 'angularfire'], function(){
    return gulp.src(['app/**/*.js', 'app/components/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(reload({ stream: true }));
});



/* HTML Task */
gulp.task('html', function(){
    return gulp.src(['app/**/*.html', '!app/*index.html'])
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream: true }));
});



/* Images Task */
// gulp.task('compressImages', function() {
//     return gulp.src('app/images/**/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('build/images'));
// });



/* Browser-Sync Task */
gulp.task('browser-sync', function(){
    browserSync({
        server:{
           baseDir: 'app',
           routes: {
             "/bower_components": "bower_components"
          }
        }
    });
});



/* Watch Tasks */
gulp.task('watch', function(){
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch('app/components/**/*.html', ['components']);
    gulp.watch('app/css/**/*.scss', ['css']);
    gulp.watch('app/**/*.html', ['html']);
   //  gulp.watch('app/images/**/*', ['compressImages']);
});



/* Default Task */
gulp.task('default', [
    'scripts',
    'css',
    'html',
   //  'compressImages',
    'browser-sync',
    'watch'
]);
