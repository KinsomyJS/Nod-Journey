var connect = require('connect');
var bodyParser = require('body-parser');
var app = connect()
    .use(bodyParser())
    .use(function (req, res) {
        console.log(req.body);
        res.end('success');
    }).listen(3000);