var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSynk = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    concatCss = require('gulp-concat-css'),
    uglifyCss = require('gulp-uglifycss'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


gulp.task ('scripts', function () {
    return gulp.src('app/js/*.js')
        .pipe(concat('main.script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSynk.reload({stream: true}));
});

gulp.task ('styles', function () {
    return gulp.src('app/scss/main.scss')
        .pipe(sass())
        .pipe(concatCss('main.style.min.css'))
        .pipe(uglifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSynk.reload({stream: true}));
});

// gulp.task ('styles_test', function () {
//     return gulp.src('app/scss/main.scss')
//         .pipe(sass())
//         // .pipe(concatCss('main.style.min.css'))
//         // .pipe(uglifyCss())
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSynk.reload({stream: true}));
// });


gulp.task ('html', function () {
    gulp.src('app/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSynk.reload({stream: true}));
});

gulp.task ('images', function () {
    gulp.src ('app/img/*.+(png|jpg|gif|svg)')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSynk.reload({stream: true}));
});

gulp.task ('fonts', function () {
    gulp.src('app/fonts/*.ttf')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSynk.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    browserSynk({
        server: {
            baseDir: 'dist'
        }
    })
});

gulp.task('build-all', ['scripts','styles', 'images', 'html', 'fonts']);

gulp.task('watch', ['browser-sync', 'build-all'], function () {
    gulp.watch('app/scss/**/*.scss', ['styles']);
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/img/**/*.+(png|jpg|gif|svg)', ['images']);
    gulp.watch('app/fonts/**/*.ttf', ['fonts']);
});