var connect = require('connect');
var app = connect();
app.listen(3000);
app.use('/log', logger);//只有url前缀匹配/log才会调用
app.use(hello);

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