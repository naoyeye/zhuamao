/**
 * build task for webpack
 */
var gulp = require('gulp')
var path = require('path')
var util = require('gulp-util')
var inquirer = require("inquirer")
var webpack = require('webpack')
var requireDir = require('require-dir')

var webpackEntry = requireDir(path.resolve(__dirname, '../entry'))

// cli arguments
var argv = require('yargs')
           .array('entry')
           .default('entry', [])
           .alias('e', 'entry')
           .argv;

var question = [
  {
    type: "checkbox",
    message: "Select entry",
    name: "entry",
    choices: [{name: 'ALL'}].concat(Object.keys(webpackEntry).map(function(item) {
      return {
        name: item
      }
    })),
    validate: function(answer) {
      if (answer.length < 1) {
        return "You must choose at least one entry.";
      }
      return true;
    }
  }
];

function prompt(entry) {
  // entry name list => entry map
  function getEntryMap(entry) {
    return entry.reduce(function(result, item) {
      if(webpackEntry[item]) {
        result = Object.assign(result, webpackEntry[item])
      }
      return result
    }, {})
  }

  if(entry.length > 0) {
    return getEntryMap(entry)
  }
  return new Promise(function(resolve, reject) {
    inquirer.prompt(question, function(answers) {
      if(~answers.entry.indexOf('ALL')) {
        resolve(getEntryMap(Object.keys(webpackEntry)))
      } else {
        resolve(getEntryMap(answers.entry))
      }
    })
  })
}

function getEntry() {
  return Promise.resolve(argv.entry).then(prompt)
}

gulp.task('webpack:dev',['check'], function(callback) {
  getEntry().then(function(entry) {
    var webpackConfig = require('../config/webpack-dev.config.js');
    webpackConfig.entry = Object.assign({}, entry, webpackConfig.entry);
    var devCompiler = webpack(webpackConfig);
    
    var first = true;

    devCompiler.watch({
      aggregateTimeout: 500,
      poll: true
    }, function(err, stats) {
      if (err) {
        throw new util.PluginError('[webpack ERROR]', err)
      }
      util.log('[webpack]', stats.toString({
        colors: true
      }))

      if (first) {
        callback()
        first = false;
      }
    })

  }).catch(function (err) {
    console.warn(err)
  })

})

gulp.task('webpack:build',['check'], function(callback) {
  getEntry().then(function(entry) {
    var webpackConfig = require('../config/webpack-production.config.js');
    webpackConfig.entry = Object.assign({}, entry, webpackConfig.entry);
    var buildCompiler = webpack(webpackConfig);

    buildCompiler.run(function(err, stats) {
      if (err) {
        throw new util.PluginError('[webpack ERROR]', err)
      }
      util.log('[webpack]', stats.toString({
        colors: true
      }))

      callback()
    })

  }).catch(function (err) {
    console.warn(err)
  })

})
