var mongoose = require('mongoose');
//建立到本地mongodb的连接，数据库名字为photo_app
mongoose.connect('mongodb://localhost/photo_app');

var schema = new mongoose.Schema({
    name:String,
    path:String
});

module.exports = mongoose.model('Photo',schema);