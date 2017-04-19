var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSynk = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');

gulp.task ('sass', function () {
    return gulp.src('app/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSynk.reload({stream: true}))
});

// gulp.task ('scripts', function () {
//     return gulp.src()
//
// });

gulp.task('browser-sync', function () {
    browserSynk({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSynk.reload);
    gulp.watch('app/js/**/*.js', browserSynk.reload);
});