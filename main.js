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
  var doyoudeny = false;

  console.log(q.pathname.split("/")[0]);

  deny.forEach(function (item, index) {
    if (item==q.pathname || item==q.pathname.split("/")[1])
      doyoudeny = true;
  });

  if (q.pathname!="/")
    filename = "."+q.pathname;
  else
    filename = "./index.html";

  fs.readFile(filename, function(err, data) {
    if (err || doyoudeny) {
      if (doyoudeny){
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
}).listen(8080);

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 80 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('something');
  });
});
