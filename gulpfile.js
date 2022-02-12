import gulp from 'gulp';
import concat from 'gulp-concat';
import clean from 'gulp-clean';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'

const sass = gulpSass(dartSass);
browserSync.create();


const path = {
  src: {
    scss: './src/scss/**/*.scss',
    js: './src/js/*.js',
    img: './src/img/*',
  },
  dist: {
    self: './dist/',
    css: './dist/css/',
    js: './dist/js/',
    img: './dist/img/',
  },
};


const buildScss = () =>
  gulp
    .src(path.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream());

const buildJs = () =>
  gulp
    .src(path.src.js)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.stream());

const buildImgs = () =>
  gulp.src(path.src.img).pipe(imagemin()).pipe(gulp.dest(path.dist.img));

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  gulp.watch('./index.html').on('change', browserSync.reload);
  gulp.watch(path.src.scss, buildScss).on('change', browserSync.reload);
  gulp.watch(path.src.js, buildJs).on('change', browserSync.reload);
  gulp.watch(path.src.img, buildImgs).on('change', browserSync.reload);
};

const cleanBuild = () =>
  gulp.src(path.dist.self, { allowEmpty: true }).pipe(clean());


const build = gulp.series(buildScss, buildJs);


gulp.task(
  'build',
  gulp.series(cleanBuild, gulp.parallel(buildImgs, build))
);

gulp.task('dev', gulp.parallel(watcher, build))
