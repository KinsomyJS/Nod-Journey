var http = require('http');
var mysql = require('mysql');
//连接数据库
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'myuser',
    password: 'mypassword',
    database: 'testdb'
});