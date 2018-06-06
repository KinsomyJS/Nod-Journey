var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

//指定静态文件服务器的根目录为当前js文件的路径
var root = __dirname
var server = http.createServer(function (req, res) {
    var url = parse(req.url);
    //构造出请求的文件绝对路径
    var path = join(root, url.pathname);
    //创建文件读取流，会在data事件中返回读取的数据
    var stream = fs.createReadStream(path);
    stream.on('data', function (chunk) {
        res.write(chunk);
    });
    stream.on('end', function () {
        res.end();
    });

});

var serverRefined = http.createServer(function(req,res){
    var url = parse(req.url);
    var path = join(root,url.pathname);
    var stream = fs.createReadStream(path);
    stream.on('error',function(err){
        res.statusCode = 500;
        res.end('Internal Server Error');
    });
    //res.end()会在pipe内部调用
    stream.pipe(res);
});
serverRefined.listen(3000);