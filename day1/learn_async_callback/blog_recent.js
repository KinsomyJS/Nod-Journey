var http = require('http');
var fs = require('fs');

//创建http server，用function回调响应
http.createServer(function (req, res) {
    if (req.url == '/') {
        fs.readFile('./titles.json', function (err, data) {
            if (err) return handleError(err, res)
            var titles = JSON.parse(data.toString());
            fs.readFile('./templates.html', function (err, data) {
                if (err) return handleError(err, res)
                var tmpl = data.toString();
                var html = tmpl.replace('%', titles.join('</li><li>'));
                console.log(titles.join('</li><li>'));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            });
        });
    }
}).listen(8000, "127.0.0.1");

function handleError(err, res) {
    console.error(err);
    res.end('Server Error');
}

