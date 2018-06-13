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