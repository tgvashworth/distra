var connect = require('connect')
  , http = require('http')
  , gzippo = require('gzippo')
  , http_proxy = require('http-proxy')
  , hf = require('hostsfile')
  , path = require('path')
  , static_server = connect()
  , config = require(process.argv[2])
  , hosts_tag = 'distra'
  , proxy_options = { hostnameOnly: true, router: {} }
  , port = {
      proxy: parseInt(process.argv[3], 10) || process.env.PORT || 9876,
      static_server: 9999
    }
  , gzip_options = {
      matchType: /text|javascript|json|css/
    };

// Log static requests
static_server
  .use(connect.logger('dev'));

var createStaticServer = function (path) {
  var server = connect();
  server.use(gzippo.staticGzip(path, { maxAge: 0 }))
        .use(connect.directory(path));
  return server;
};

// Store hostnames for the hostsfile
var hosts = [];

Object.keys(config).forEach(function (host) {
  hosts.push({ip: '127.0.0.1', names: [host]});
  hosts.push({ip: 'fe80::1%lo0', names: [host]});
  if( config[host].slice(0,1) === '/' ) {
    static_server.use(connect.vhost(host, createStaticServer(config[host])));
    proxy_options.router[host] = host + ':' + port.static_server;
  } else {
    proxy_options.router[host] = config[host];
  }
});

// Update the user's hostsfile if they are sudo, unless they specify --no-hosts
if( process.argv.indexOf('--no-hosts') === -1 && process.env.SUDO_UID) {

  hf.readHostsFile(function (err, original) {
    if( err ) throw err;
    var file = hf.removeTagged(original, hosts_tag);
    file = hf.addHosts(file, hosts, hosts_tag);
    hf.replaceHostsFile(file, function (err) {
      if (err) throw err;
      console.log('hostsfile updated');
    });
  });

} else {
  console.log("You'll need to manually update your hostsfile.");
}

// Boot up the proxy server!
http_proxy
  .createServer(proxy_options)
  .listen(port.proxy, function () {
    console.log('proxy listening on %d', port.proxy);
  });

// Boot up the static server!
http
  .createServer(static_server)
  .listen(port.static_server, function () {
    console.log('static listening on %d', port.static_server);
  });