var connect = require('connect')
  , http = require('http')
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
    };

// Log static requests
static_server
  .use(connect.logger('dev'));

// Store hostnames for the hostsfile
var hosts = [];

Object.keys(config).forEach(function (host) {
  hosts.push({ip: '127.0.0.1', names: [host]});
  if( config[host].slice(0,1) === '/' ) {
    static_server.use(connect.vhost(host, connect.static(config[host])));
    proxy_options.router[host] = host + ':' + port.static_server;
  } else {
    proxy_options.router[host] = config[host];
  }
});

// Update the user's hostsfile, unless they specify --no-hosts
if( process.argv.indexOf('--no-hosts') === -1 ) {

  hf.readHostsFile(function (err, original) {
    if( err ) throw err;
    var file = hf.removeTagged(original, hosts_tag);
    file = hf.addHosts(file, hosts, hosts_tag);
    hf.replaceHostsFile(file, function (err) {
      if (err) throw err;
      console.log('hostsfile updated');
    });
  });

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