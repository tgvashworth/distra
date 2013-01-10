var connect = require('connect')
  , http = require('http')
  , path = require('path')
  , config = require('./config.json')
  , app = connect()
  , port = process.argv[2] || process.env.PORT || 8000;

app
  .use(connect.logger('dev'));

Object.keys(config).forEach(function (host) {
  app.use(connect.vhost(host, connect.static(config[host])));
});

http.createServer(app).listen(port, function () {
  console.log('listening on %d', port);
});