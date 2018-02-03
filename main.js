var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename;
  console.log("."+q.pathname);

  var deny = ["/main.js","/package.json","/package-lock.json","node_modules"];
  var denyfolders = ["node_modules"];
  var detectdeny = false;

  console.log(q.pathname.split("/")[0]);

  detectdeny = deny[q.pathname] || deny[q.pathname.split("/")[1]]

  if (q.pathname!="/")
    filename = "."+q.pathname;
  else
    filename = "./index.html";

  fs.readFile(filename, function(err, data) {
    if (err || detectdeny) {
      if (detectdeny){
        console.log("connection denied");
        res.writeHead(403, {'Content-Type': 'text/html'});
        return res.end("403 Forbidden");
      } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found :(");
      }
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(process.env.PORT || 8080);

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 80 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    try {
      ws.send('something');
    } catch (e) {
      console.error(e);
    }
  });
  ws.on('error', function(e){
    console.log(e);
  });
});

wss.on('close', function close() {
  console.log('disconnected');
});
