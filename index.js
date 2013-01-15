var fs = require('fs')
  , path = require('path')
  , spawn = require('child_process').spawn
  , config_file = path.resolve(__dirname, process.env.CONFIG_FILE || './config.json')
  , port = process.argv[2] || process.env.PORT || 8000;

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
    distra = spawn('node', ['distra.js'].concat(process.argv.slice(2)));
    attach(distra);
  };
}());

fs.watch(config_file, function (event, filename) {
  if( event === 'change' ) {
    reboot();
  }
});

reboot();