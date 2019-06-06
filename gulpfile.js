
const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const browserSync = require("browser-sync").create();
const sassGlob = require("gulp-sass-glob");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
var reload = browserSync.reload;

gulp.task("copy", () => {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});
const scssFiles = [
    "./node_modules/normalize.css/normalize.css",
    "./src/styles/**/*.scss"
];
gulp.task("sass", () => {
    return gulp.src(scssFiles)
        .pipe(concat("main.scss"))
        .pipe(sassGlob())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: true
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});
gulp.task("scripts", () => {
    return gulp.src("./src/scripts/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("./dist/scripts"));
});

gulp.task("server", () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

gulp.watch("./src/styles/**/*.scss", gulp.series("sass"));
gulp.watch("./src/*.html", gulp.series("copy"));

gulp.task("default", gulp.series("copy", "sass", "scripts", "server"));