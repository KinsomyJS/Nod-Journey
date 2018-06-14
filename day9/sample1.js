var connect = require('connect');
var cookieParser = require('cookie-parser');
var app = connect()
    .use(cookieParser())
    .use(function (req, res) {
        res.setHeader('Set-Cookie', 'foo=bar');
        res.setHeader('Set-Cookie', 'tobi=ferret;Expires=Thu, 14 Jun 2018 05:55:53 GMT');
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello\n');
    }).listen(3000);