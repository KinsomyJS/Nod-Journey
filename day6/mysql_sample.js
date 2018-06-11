var http = require('http');
var mysql = require('mysql');
//连接数据库
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'myuser',
    password: 'mypassword',
    database: 'testdb'
});
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/add':
                    add(db, req, res);
                    break;
                case '/delete':
                    delete (db, req, res);
                    break;
            }
            break;
        case 'GET':
            switch (req.url) {
                case '/show':
                    search(db, req, res);
                    break;
            }
            break;
    }
});