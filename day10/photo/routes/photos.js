var photos = [];
var Photo = require('../model/Photo');//引入Photo Mongoose模型
var path = require('path');
var fs = require('fs');
var join = path.join;
photos.push({
    name: 'node js logo',
    path: 'https://nodejs.org/static/images/logo.svg'
});
photos.push({
    name: 'mongodb logo',
    path: 'http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=mongodb'
});
// exports.list = function (req, res) {
//     res.render('photos', {
//         title: 'Photos',
//         photos: photos
//     });
// };

exports.list = function (req, res, next) {
    //{}表示查找所有集合
    Photo.find({}, function (err, photos) {
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
};

exports.form = function (req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};

//dir为app.js中定义的photos
exports.submit = function (dir) {
    return function (req, res, next) {
        var img = req.files.photo.image;
        var name = req.body.photo.name || img.name;
        var path = join(dir, img.name);
        //重命名文件来移动文件
        fs.rename(img.path, path, function (err) {
            if (err) return next(err);
            Photo.create({
                name: name,
                path: img.name
            }, function (err) {
                if (err) return next(err);
                res.redirect('/');//重定向回到首页
            });
        });
    };
};