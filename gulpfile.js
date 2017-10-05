var gulp = require('gulp'),
    bourbon = require('node-bourbon'),
    pug = require('gulp-pug'),
    fileinclude = require('gulp-file-include'),
    gulpRemoveHtml = require('gulp-remove-html'), 
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'); // Подключаем gulp-uglifyjs (для сжатия JS)
    cleanCSS = require('gulp-clean-css'),
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    htmlmin = require('gulp-html-minifier'),
    rename = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
    cache = require('gulp-cache'); // Подключаем библиотеку кеширования
    browserSync = require('browser-sync'); // Подключаем Browser Sync;

// gulp.task('buildhtml', function() {
//   gulp.src(['app/temp/*.html'])
//     .pipe(fileinclude({
//       prefix: '@@'
//     }))
//     // .pipe(gulpRemoveHtml())
//     .pipe(gulp.dest('app/'));
// });

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/style.sass') // Берем источник
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
            })) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions']))// Автопрефиксер
        // .pipe(cleanCSS())
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

// Работа с Pug
gulp.task('pug', function() {
    return gulp.src('app/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', function() {
    return gulp.src('dist/img/**/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('app/img')); 
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src(['app/css/style.css', 'app/css/libs.css']) // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

// gulp.task('minify', function() {
// gulp.src('app/**/*.html')
//    .pipe(htmlmin({collapseWhitespace: true}))
//    .pipe(gulp.dest('dist/html'))
//    .pipe(browserSync.reload({stream: true})) // Обновляем HTML на странице при изменении
// });


 gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery-1.11.3.min.js', // Берем jQuery
        'app/libs/bootstrap.min.js', // Берем bootstrap.min.js
        'app/libs/plugins/owl-carousel/owl.carousel.js', // Берем owl.carousel.js
        'app/libs/jquery.magnific-popup.min.js' // Берем jquery.magnific-popup.min.js
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
 });


gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});



gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
    gulp.watch('app/sass/*.sass', browserSync.reload); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/pug/**/*.pug', ['pug']);
    gulp.watch('app/**/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/**/*.php', browserSync.reload); // Наблюдение за PHP файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});