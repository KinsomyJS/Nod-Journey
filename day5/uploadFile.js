var http = require('http');
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            upload(req, res);
            break;
    }
});

function show(req, res) {
    var html = '<form method="POST" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="name"/></p>'
        + '<p><input type="file" name="file"/></p>'
        + '<p><input type="submit" value="upload"/></p>'
        + '</form>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

var formidable = require('formidable');

function upload(req, res) {
    if (!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad Request: exprcting multipart/form-data');
        return;
    }
    var form = new formidable.IncomingForm();
    form.uploadDir = '/tmp';
    /** 
    //收完输入域后会发出
    form.on('field',function(field,value){
        console.log(field);
        console.log(value);
    });
    //收到文件并处理好后会发出
    form.on('file',function(name,file){
        console.log(name);
        console.log(file);
    });
    form.on('end',function(){
        res.end('upload complete!');
    });
    form.parse(req);
    */
    //上述代码可以简化为
    form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        console.log('upload complete~');
        res.end('upload complete~');
    });
    //计算上传进度
    form.on('progress', function (bytesRecevived, bytesExpected) {
        var percent = Math.floor(bytesRecevived / bytesExpected * 100);
        console.log('progress: ', percent);
    });
}

//判断request的header是否是multipart/form-data
function isFormData(req) {
    var type = req.headers['content-type'] || '';
    console.log(type);
    return 0 == type.indexOf('multipart/form-data');
}
server.listen(3000);