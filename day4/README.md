# 构建restful web 服务
* 通过检查req.method可以查看请求的http方法
* req.on('data')可以监听到请求，返回一个Buffer对象，Buffer是node里面的字节数组，如果只需要文本可是的返回，可以通过**req.setEncoding('utf8')**将流编码设定为utf8，这样data事件将返回字符串。
### 设定content-length
设定content-length可以提高响应速度，content-length应为字节长度而不是自负长度，所以要用Node提供的Buffer.byteLength(body)方法。

### url parse
url模块中的parse函数可以解析url到一个对象中
```js
require('url').parse('http://localhost:3000/1?api-key=foo')
```
会得到：
```json
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:3000',
  port: '3000',
  hostname: 'localhost',
  hash: null,
  search: '?api-key=foo',
  query: 'api-key=foo',
  pathname: '/1',
  path: '/1?api-key=foo',
  href: 'http://localhost:3000/1?api-key=foo'
  }
```

#创建静态服务器
首先需要定一个root变量，作为静态文件服务器的根目录
```js
var root = _dirname;
```
**_dirname**就是指的js文件的当前路径。