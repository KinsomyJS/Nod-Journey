# Express (二)
## 渲染视图
Express 有两种渲染视图的方法。
1、在程序里面使用app.render()方法
2、在请求或者响应里用res.render()方法，它内部也是实现了app.render()

## 视图系统配置
### 设置视图目录
```js
app.set('views', path.join(__dirname, 'views'));//设置视图所在目录，在当前工作目录下的views文件夹中
```
### 设置模板引擎
设置ejs为模板引擎。
```js
app.set('view engine', 'ejs');
```
### 视图缓存
生产环境中会默认启用view cache设定，防止后续的render()执行磁盘I/O，将模板内容缓存在内存中，提升了性能，但是这样必须要重启服务器才能让模板文件的修改生效，所以在开发环境中禁用。

### 视图渲染数据
首先在routes文件夹中创建photos.js文件用来创建一组数据
```js
var photos = [];
photos.push({
    name: 'node js logo',
    path: 'https://nodejs.org/static/images/logo.svg'
});
photos.push({
    name: 'mongodb logo',
    path: 'http://image.baidu.com/search/index?tn=baiduimage&ps=1&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=mongodb'
});
exports.list = function (req, res) {
    res.render('photos', {
        title: 'Photos',
        photos: photos
    });
};
```

接着在app.js中引入photos模块，访问list函数，然后在Get方法请求 /路径 的时候映射到该函数上。
```js
var photos = require('./routes/photos');
app.use('/', photos.list);
```

## 处理表单和文件上传
在public目录下创建photos目录，要把照片存储在./public/photos目录下。然后在app.js中添加js代码
```js
app.set('photos',__dirname + '/public/photos');
```

### 实现照片模型
用Mongoose模型做照片模型,首先安装Mongoose。
```s
npm install mongoose --save
```
接着在./model/Photo.js下创建照片模型。该Mongoose模型有所有的CRUD方法。
```js
var mongoose = require('mongoose');
//建立到本地mongodb的连接，数据库名字为photo_app
mongoose.connect('mongodb://localhost/photo_app');

var schema = new mongoose.schema({
    name:String,
    path:String
});

module.exports = mongoose.model('Photo',schema);
```

### 创建照片上传表单
1、在app.js中定义get和post路由。
上传我们用到模块 multer,地址为 https://github.com/expressjs/multer/blob/master/README.md
```js
app.get('/upload', photos.form);
app.post('/upload', upload.single('photo'), photos.submit(app.get('photos')));
```
2、创建上传表单 views/photos/upload.ejs

3、./routes/photos.js中导出form函数渲染upload.ejs
```js
exports.form = function (req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};
```
4、处理表单提交
```js
var Photo = require('../model/Photo');//引入Photo Mongoose模型
var path = require('path');
var fs = require('fs');
var join = path.join;

//dir为app.js中定义的photos
exports.submit = function(dir){
    return function(req,res,next){
        var img = req.files.photo.image;
        var name = req.body.photo.name || img.name;
        var path = join(dir,img.name);
        //重命名文件来移动文件
        fs.rename(img.path,path,function(err){
            if(err) return next(err);
            Photo.create({
                name: name,
                path: img.name
            },function(err){
                if(err) return next(err);
                res.redirect('/');//重定向回到首页
            });
        });
    };
};
```

### 显示上传的照片列表
修改之前的export.list，改为从mongoose中读取。
```js
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
```




