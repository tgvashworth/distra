#!/usr/bin/env node

var argv = require('optimist').argv
  , fs = require('fs')
  , path = require('path')
  , spawn = require('child_process').spawn
  , home_dir = process.env.HOME
  , config_file = path.resolve(home_dir, '.distra.json')
  , port = process.argv[2] || argv.port || process.env.PORT || 8000;

try {
  if (!fs.existsSync(config_file) || fs.readFileSync(config_file) === '') {
    fs.writeFileSync(config_file, '{}');
  }
} catch (e) {
  throw new Error("Could not open or create config file.");
}

// ======================
// Command line usage
// ======================

var config = require(config_file)
  , target = path.resolve()
  , host = path.basename(target);

// Add a new host
if( argv._[0] === 'add' ) {

  // Default:
  // No further arguments passed.
  // Serve this directory with using its name

  // One argument passed.
  // Use as hostname for current dir.
  if( argv._.length >= 2 ) {
    host = argv._[1];
  }

  // Two arguments passed.
  // Use as hostname for target.
  if( argv._.length >= 3 ) {
    target = argv._[2];
  }

  if( config[host] ) {
    console.log("Host %s already in use.", host);
    process.exit();
  } else {
    config[host] = target;
    fs.writeFileSync(config_file, JSON.stringify(config, null, 2));
    console.log("Host %s pointing to %s added.", host, target);
  }

  process.exit();
}

// Remove a host
if( argv._[0] === 'rm' ) {
  var config = require(config_file);

  // Default:
  // No further arguments passed.
  // Remove this directory.

  // One argument passed.
  // Remove that host.
  if( argv._.length >= 2 ) {
    host = argv._[1];
  }

  if( !config[host] ) {
    console.log("No such host (%s) found.", host);
    process.exit();
  } else {
    delete config[host];
    fs.writeFileSync(config_file, JSON.stringify(config, null, 2));
    console.log("Host %s removed.", host);
  }

  process.exit();
}

// Show the current configuration
if( argv._[0] === 'config' ) {
  var config = require(config_file);

  var pad = function (str, len) {
    while( str.length < len ) {
      str += ' ';
    }
    return str;
  };

  Object.keys(config).forEach(function (host) {
    console.log('%s : %s', pad(host, 25), config[host]);
  });

  process.exit();
}

// ======================
// Server
// ======================

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
    distra = spawn('node', [path.resolve(__dirname, 'distra.js'), config_file].concat(process.argv.slice(2)));
    attach(distra);
  };
}());

fs.watch(config_file, function (event, filename) {
  if( event === 'change' ) {
    reboot();
  }
});

reboot();