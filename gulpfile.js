const { series, watch, src, dest, parallel } = require("gulp");
const pump = require("pump");
var cssnano = require("cssnano");
// gulp plugins and utils
var livereload = require("gulp-livereload");
var postcss = require("gulp-postcss");

// postcss plugins
var tailwinds = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");
function serve(done) {
  livereload.listen();
  done();
}

const handleError = (done) => {
  return function (err) {
    return done(err);
  };
};

function css(done) {
  var processors = [
    tailwinds(),
    purgecss({
        content: ['./pages/**/*.js', './components/**/*.js'],
      }),
      cssnano(),
  ];

  pump(
    [
      src("./styles/tw/twinit/style.css", { sourcemaps: true }),
      postcss(processors),
      dest("./styles/tw/twdist/", { sourcemaps: "." }),
      livereload(),
    ],
    handleError(done)
  );
}

const cssWatcher = () => watch("pages/**", css);
const watcher = parallel(cssWatcher);
const build = series(css);
const dev = series(build, serve, watcher);

exports.build = build;
exports.default = dev;