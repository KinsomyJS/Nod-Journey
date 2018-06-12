var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// 连接数据库的url
var url = 'mongodb://localhost:27017';

// 数据库名
var dbName = 'myproject';

// 连接到数据库服务器
MongoClient.connect(url, function (err, client) {
    if(err) throw err;
    console.log("连接数据库服务器成功");
    //连接到数据库
    var db = client.db(dbName);
    insertDocuments(db, function (result) {
        //关闭数据库连接
        client.close();
    })
});

//insert 操作
var insertDocuments = function (db, callback) {
    // 获得集合
    var collection = db.collection('documents');
    // Insert
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("集合中插入了三个文本");
        callback(result);
    });
};

