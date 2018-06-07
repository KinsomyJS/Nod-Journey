# 表单接受用户输入
### content-type
表单提交请求所带的Content-Type有两种：
* application/x-www-form-urlencoded:html表单的默认值
* multipart/form-data:表单中含有文件或者非ASCII或二进制数据时使用


### 简单的todo sample
```js
var http = require('http');
var items = [];
var server = http.createServer(function (req, res) {
    //只有当path为/时才进行处理，否则返回404
    if (req.url == '/') {
        switch (req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res)
                break;
        }
    } else {
        notFound(res);
    }
});
server.listen(3000);

function show(res) {
    var html = '<html><head><title>Todo List</title></head><body>'
        + '<h1>Todo List</h1>'
        + '<ul>'
        + items.map(function (item) {
            return '<li>' + item + '</li>'
        }).join(' ')
        + '</ul>'
        + '<form method="post" action="/">'
        + '<p><input type="text" name="item"/></p>'
        + '<p><input type="button" value="Add Item"/></p>'
        + '</form></body></html>';
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
}

function notFound(res){
    res.statusCode = 404;
    res.setHeader('Content-Type','text/plain');
    res.end('Not Found');
}

function badRequest(res){
    res.statusCode = 400;
    res.setHeader('Content-Type','text/plain');
    res.end('Bad Request');
}

var qs = require('querystring');
function add(req,res){
    var body = '';
    req.setEncoding('utf8');
    req.on('data',function(chunk){
        body += chunk;
    });
    req.on('end',function(){
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    });
}
```

### 上传文件 sample
上传文件需要把表单的enctype属性设置为multipart/form-data,适用于大型二进制文件的MIME类型。
用formidable库来进行上传操作。
```js
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
    //指定上传路径
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
```