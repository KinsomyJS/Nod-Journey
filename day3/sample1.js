var http = require('http');
var server = http.createServer(function (req, res) {
    var body = 'Hello Kinsomy';
    //修改header
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;//设置响应码
    // res.write(body);
    // res.end();
    res.end(body);//和上面两句等同
})

//绑定监听端口3000
server.listen(3000);