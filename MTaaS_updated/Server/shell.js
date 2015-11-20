var tty = require('tty.js');

var app = tty.createServer({
  shell: 'mongo',
  users: {
    foo: 'bar'
  },
  port: 8060
});

app.get('/foo', function(req, res, next) {
  res.send('bar');
});

app.listen();
