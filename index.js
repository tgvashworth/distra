#!/usr/bin/env node

var fs = require('fs')
  , path = require('path')
  , spawn = require('child_process').spawn
  , home_dir = process.env.HOME
  , config_file = path.resolve(home_dir, '.distra.json')
  , port = process.argv[2] || process.env.PORT || 8000;

try {
  fs.appendFileSync(config_file, '');
} catch (e) {
  throw new Error("Could not create file.");
}

var attach = function (child) {
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on('exit', function (code) {
    console.log('child exited with code ' + code);
  });
};

var reboot = (function () {
  var distra;
  return function () {
    if( distra ) distra.kill();
    console.log('\n========= restarting =========\n');
    distra = spawn('node', ['distra.js', config_file].concat(process.argv.slice(2)));
    attach(distra);
  };
}());

fs.watch(config_file, function (event, filename) {
  if( event === 'change' ) {
    reboot();
  }
});

reboot();