var connect = require('connect')
  , http = require('http')
  , http_proxy = require('http-proxy')
  , hf = require('hostsfile')
  , path = require('path')
  , config = require('./config.json')
  , static_server = connect()
  , hosts_tag = 'distra'
  , proxy_options = { hostnameOnly: true, router: {} }
  , port = {
      proxy: process.argv[2] || process.env.PORT || 8000,
      static_server: 9999
    };

static_server
  .use(connect.logger('dev'));

var localhost = {ip: '127.0.0.1', names: []};

Object.keys(config).forEach(function (host) {
  localhost.names.push(host);
  if( config[host].slice(0,1) === '/' ) {
    static_server.use(connect.vhost(host, connect.static(config[host])));
    proxy_options.router[host] = host + ':' + port.static_server;
  } else {
    proxy_options.router[host] = config[host];
  }
});

hf.readHostsFile(function (err, original) {
  if( err ) throw err;

  var file = hf.removeTagged(original, hosts_tag);
  file = hf.addHosts(file, [localhost], hosts_tag);
  hf.replaceHostsFile(file, function (err) {
    if (err) throw err;
    console.log('hostsfile updated');
  });
});

http_proxy
  .createServer(proxy_options)
  .listen(port.proxy, function () {
    console.log('proxy listening on %d', port.proxy);
  });

http
  .createServer(static_server)
  .listen(port.static_server, function () {
    console.log('static listening on %d', port.static_server);
  });