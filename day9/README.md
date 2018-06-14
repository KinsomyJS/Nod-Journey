# Connect 自带中间件
## 1. cookieParser 解析cookie
* 用来解析浏览器的cookie放到req.cookies中。
* 支持解析常规cookie、签名cookie和特殊的JSON cookie，req.cookies默认是用常规cookie拼装。
* Connect 3.0之后将内置的cookieParser废弃了，需要自己引入三方库
### 基本用法
```js
var connect = require('connect');
var cookieParser = require('cookie-parser');
var app = connect()
    .use(cookieParser())
    .use(function (req, res) {
        //设定出站cookie
        res.setHeader('Set-Cookie', 'foo=bar');
        res.setHeader('Set-Cookie', 'tobi=ferret;Expires=Thu, 14 Jun 2018 05:55:53 GMT');
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello\n');
    }).listen(3000);
```
然后使用curl带cookie请求服务器的时候，控制台会输出req.cookie,但是因为cookie没有使用带签名的，因此signedCookies为空。
```s
curl --cookie 'name=kinsomy' http://localhost:3000/ 
```

## 2.bodyParser 解析请求body
整合了三个更小的组件：json(),urlencoded(),multipart()。
它在req里面提供了body的属性，可以用来解析json，x-www-form-urlencoded和multipart/form-data请求,如果是multipart/form-data请求，还提供了req.files属性。
```js
var connect = require('connect');
var bodyParser = require('body-parser');
var app = connect()
    .use(bodyParser.urlencoded({extended: true}))
    .use(function (req, res) {
        console.log(req.body);
        res.end('success');
    }).listen(3000);
```