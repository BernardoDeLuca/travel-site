var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();


gulp.task('watch', function() {

  browserSync.init ({
    notify: false,  // prevents browser-sync from displaying (a black box displaying injected CSS changes) in the upper right corner of the web browser every time a change is saved to a relevant file.
    server: { baseDir: "app"}  // tells browser-sync where our website resides, because browser-sync spins up a little web server on our computer!  So browser-sync needs to know where that web server should point.  Since our gulpfile.js resides in the root of the travel-site folder (the working directory), we simply tell browser-sync to go into the "app" folder because our index.html file resides within the "app" folder.
  });

  watch('./app/index.html', function() {  //leverage the gulp-watch plugin.   Note:  ./ goes to the root folder of our project.  We then drill into the app folder and target the index.html file.  ./app/index.html
  browserSync.reload();   // replaces the previous dummy command  gulp.start('html');  which was an anonymous function which automatically triggers/starts our previously coded html task.
  });

  watch('./app/assets/styles/**/*.css', function() { //If any saved changes are detected within any file in the styles folder, the following task will be triggered/started.
  gulp.start('cssInject');
  });

});


gulp.task('cssInject', ['styles'], function () {
  return gulp.src('./app/temp/styles/styles.css')  //points toward our compiled CSS file
    .pipe(browserSync.stream());  // pipes the styles.css compiled CSS file’s contents into browser-sync.  browser-sync's .stream method makes whatever is being piped into it available in the web browser.
});
