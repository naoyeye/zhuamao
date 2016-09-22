var gulp = require('gulp');
gulp.task('check', function (next) {
  var fs = require('fs')
  var cwd = process.cwd()
  var dirs = fs.readdirSync(cwd+'/node_modules')
  var pkg = JSON.parse(fs.readFileSync('package.json'))
  var deps = Object.keys(pkg.dependencies)
  var not_exists = []

  for (var i = 0,len = deps.length;i<len;i++) {
    if (dirs.indexOf(deps[i]) < 0) {
      not_exists.push(deps[i])
    }
  }

  if (not_exists.length !== 0) {
    console.log('\x1b[31mSomething wrong')
    console.log('\x1b[0mnode_modules: ' + '\x1b[33m\x1b[4m'+not_exists.toString() +'\x1b[0m should be installed')
  } else {
    next()
  }

})