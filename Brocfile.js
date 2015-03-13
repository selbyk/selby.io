/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    isProduction = EmberApp.env() === 'production',
    uglifyJavaScript = require('broccoli-uglify-js');

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
app.import("bower_components/octicons/octicons/octicons.eot", {
  destDir: "fonts"
});
app.import("bower_components/octicons/octicons/octicons.svg", {
  destDir: "fonts"
});
app.import("bower_components/octicons/octicons/octicons.ttf", {
  destDir: "fonts"
});
app.import("bower_components/octicons/octicons/octicons.woff", {
  destDir: "fonts"
});

// Import Font Awesome font files
app.import("bower_components/ionicons/fonts/ionicons.eot", {
  destDir: "fonts"
});
app.import("bower_components/ionicons/fonts/ionicons.svg", {
  destDir: "fonts"
});
app.import("bower_components/ionicons/fonts/ionicons.ttf", {
  destDir: "fonts"
});
app.import("bower_components/ionicons/fonts/ionicons.woff", {
  destDir: "fonts"
});

app.import({
  development: 'bower_components/d3/d3.js',
  production:  'bower_components/d3/d3.min.js'
});

app.import({
  development: 'bower_components/cryptojslib/rollups/sha3.js',
  production:  'bower_components/cryptojslib/rollups/sha3.js'
});

app.import("bower_components/bootstrap-less/js/dropdown.js");

var tree = app.toTree();

if(isProduction){
  tree = uglifyJavaScript(tree, {
    mangle: true,
    compress: {
      sequences     : true,  // join consecutive statemets with the “comma operator”
      properties    : true,  // optimize property access: a["foo"] → a.foo
      dead_code     : true,  // discard unreachable code
      drop_debugger : true,  // discard “debugger” statements
      unsafe        : false, // some unsafe optimizations (see below)
      conditionals  : true,  // optimize if-s and conditional expressions
      comparisons   : true,  // optimize comparisons
      evaluate      : true,  // evaluate constant expressions
      booleans      : true,  // optimize boolean expressions
      loops         : true,  // optimize loops
      unused        : true,  // drop unused variables/functions
      hoist_funs    : true,  // hoist function declarations
      hoist_vars    : false, // hoist variable declarations
      if_return     : true,  // optimize if-s followed by return/continue
      join_vars     : true,  // join var declarations
      cascade       : true,  // try to cascade `right` into `left` in sequences
      side_effects  : true,  // drop side-effect-free statements
      warnings      : true,  // warn about potentially dangerous optimizations/code
      global_defs   : {}     // global definitions
    }
  });
}

module.exports = tree;
