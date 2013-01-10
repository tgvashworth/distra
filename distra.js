var connect = require('connect')
  , http = require('http')
  , http_proxy = require('http-proxy')
  , path = require('path')
  , config = require('./config.json')
  , static_server = connect()
  , proxy_options = {
      hostnameOnly: true,
      router: {}
    }
  , port = {
      proxy: process.argv[2] || process.env.PORT || 8000,
      static_server: 9999
    };

static_server
  .use(connect.logger('dev'));

Object.keys(config).forEach(function (host) {
  if( config[host].slice(0,1) === '/' ) {
    static_server.use(connect.vhost(host, connect.static(config[host])));
    proxy_options.router[host] = host + ':' + port.static_server;
  } else {
    proxy_options.router[host] = config[host];
  }
});

http_proxy.createServer(proxy_options).listen(port.proxy, function () {
  console.log('proxy listening on %d', port.proxy);
});

http.createServer(static_server).listen(port.static_server, function () {
  console.log('static listening on %d', port.static_server);
});