var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename;
  console.log("."+q.pathname);

  var deny = ["/main.js","/package.json","package-lock.json"];
  var doyoudeny = false;

  deny.forEach(function (item, index) {
    if (item==q.pathname+"")
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
