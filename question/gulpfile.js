// gulpを導入
var gulp = require('gulp');

// 導入されているプラグイン
var rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	path = require('path'),
	cssnano = require('gulp-cssnano'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb'),
	plumber = require('gulp-plumber')
	replace = require('gulp-replace');

//SCSSファイルをCSSにコンパイルする
gulp.task('sass', function () {
	gulp.src(['scss/*.scss'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9'],
			cascade: false
		}))
		.pipe(csscomb())
		.pipe(gulp.dest('css/'))
});

// SCSSファイルを圧縮する
gulp.task('min', function () {
	gulp.src(['scss/*.scss'])
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9'],
			cascade: false
		}))
		.pipe(csscomb())
		.pipe(cssnano({safe: true}))
		.pipe(gulp.dest('css/'));
});

//監視する
gulp.task('watch', function() {
	gulp.watch('scss/*.scss',['sass']);
	gulp.watch('css/*.css',['min']);
});

// デフォルトのタスク
gulp.task('default', ['watch']);