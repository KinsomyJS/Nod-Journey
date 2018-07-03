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