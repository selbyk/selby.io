/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
  isProduction = EmberApp.env() === 'production';

var app = new EmberApp({
  vendorFiles: {
    'handlebars.js': null
  }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// Import Font Awesome font files
/*app.import("bower_components/octicons/octicons/octicons.eot", {
  destDir: "fonts"
});
app.import("bower_components/octicons/octicons/octicons.svg", {
  destDir: "fonts"
});
app.import("bower_components/octicons/octicons/octicons.ttf", {
  destDir: "fonts"
});*/
app.import("bower_components/octicons/octicons/octicons.woff", {
  destDir: "fonts"
});

// Import Font Awesome font files
/*app.import("bower_components/ionicons/fonts/ionicons.eot", {
  destDir: "fonts"
});
app.import("bower_components/ionicons/fonts/ionicons.svg", {
  destDir: "fonts"
});
app.import("bower_components/ionicons/fonts/ionicons.ttf", {
  destDir: "fonts"
});*/
app.import("bower_components/ionicons/fonts/ionicons.woff", {
  destDir: "fonts"
});

/*app.import({
  development: 'bower_components/d3/d3.js',
  production: 'bower_components/d3/d3.min.js'
});

app.import({
  development: 'bower_components/highlightjs/highlight.pack.js',
  production: 'bower_components/highlightjs/highlight.pack.js'
});
*/

//app.import("bower_components/highlightjs/styles/androidstudio.css");

app.import({
  development: 'bower_components/cryptojslib/rollups/sha3.js',
  production: 'bower_components/cryptojslib/rollups/sha3.js'
});

app.import("bower_components/bootstrap-less/js/dropdown.js");

var tree = app.toTree();

module.exports = tree;
