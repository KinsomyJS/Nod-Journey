var http = require('http');
var server = http.createServer(function (req, res) {
    //每当有新的请求，就会触发data事件
    req.on('data', function (chunk) {
        console.log('buffer object' + chunk);
    });

    req.on('end', function () {
        console.log('done ~');
        res.end();
    });

});
server.listen(3000);
