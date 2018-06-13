# Connect 框架
Connect是一个第三方模块，node默认没有带，所以需要自己安装。
```s
npm install connect
```
## 工作机制
Connect是一个中间件框架，里面提供了很多中间件组件，每个中间件组件实际是一个JavaScript函数，一个中间件拦截请求并做出响应，然后传递给下一个中间件组件，Connect用分派器(Dispatcher)将中间件串联在一起。

## 简单的Connect sample
```js
var connect = require('connect');
var app = connect();
app.listen(3000);
```
这样可以创建一个Connec程序，但是因为没有加入一个中间件，请求的时候会收到**Cannot GET**的提示。后面会加入一个日志中间件和一个响应请求中间件。

### 加入日志中间件
想要能够用日志记录每次进入服务器的请求方法和请求url，可以创建一个日志中间件（函数）。
```js
//日志中间件
//next是异步回调，将控制权交给下一个中间件
function logger(req,res,next){
    console.log('%s : %s' ,req.method,req.url);
    next();
}
```
使用日志中间件，只需要一行代码：
```js
app.use(logger);
```
当你再次对服务器发起请求的时候，在控制台会输出每次请求的方法和url，当然你还可以写的更完美一点，写入一个日志文件中做持久化。

### 响应中间件
```js
//响应中间件
function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}
app.use(hello);
```
hello方法的参数中没有next，因为hello不再需要往下传递中间件。这里就引入了一个很重要的问题，就是use()引用组件的顺序。

## 中间件引入
### 引入顺序
向上述例子正确的写法应该是
```js
app.use(logger);
app.use(hello);
```
这样logger方法执行完毕之后，Dispatcher会去调用hello中间件，但是如果引入顺序倒过来，hello函数中没有next参数，那么logger函数将永远不会被执行到。因此Connect允许开发者定义中间件的执行顺序，要自己注意。

### 挂载
可以在use方法的第一个参数加一个url前缀，只有当前缀匹配时，中间件才会被调用。
```js
app.use('/log', logger);//只有url前缀匹配/log才会调用
```

### 简单的认证服务器的例子
```js
var connect = require('connect');
connect()
    .use(logger)
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
    .listen(3000);

function restrict(req, res, next) {
    var authorization = req.headers.authorization;
    //auth 为空
    if (!authorization) return new next(new Error('Unauthorized'));

    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    if (user == 'kinsomy' && pass == 'kinsomy') {
        next();
    } else {
        return new next(new Error('Unauthorized'));
    }
}

function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['kinsomy', 'kisnomy1', 'kisnomy2']));
            break;
    }
}

//日志中间件
//next是异步回调，将控制权交给下一个中间件
function logger(req, res, next) {
    console.log('%s : %s', req.method, req.url);
    next();
}

//响应中间件
function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}
```
只有输入如下命令的时候,用户名和密码为kinsomy才会验证通过，进入admin后台
```s
curl --user kinsomy:kinsomy http://localhost:3000/admin/users
```