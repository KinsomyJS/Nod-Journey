var http = require('http');
var server = http.createServer(function (req, res) {
    var body = 'http request method is ' + req.method;
    res.end(body);
});
server.listen(3000);

