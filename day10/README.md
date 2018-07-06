# Express (一)
Express是nodejs中的一个web框架，它构建在Connect智商。Express提供了统一的视图系统，可以用各种数据格式返回响应、实现传送文件以及路由URL等。
下面都是基于Express4开发。
## 安装 Express
首先安装全局Express和Express cli
```s
npm install -g express
sudo npm install -g express-generator
```
## 生成程序架构
这里使用EJS模板，它类似于java中的jsp，JavaScript代码嵌入在了HTML里面。使用命令生成EJS模板。
```s
express -e photo
```
这样在当前目录下会生成一个photo文件夹，里面有完整的程序结构。其中就有package.json 和 app.js两个文件。安装package.json。
```s
npm install
```
接着就可以指定node app.js启动程序。

需要注意的是在Express 4中，很多模块都已经被单独拆分出来，所以要想使用，必须要单独安装和引入它们。


Express 3 |	Express 4
----------|-----------
express.bodyParser |	body-parser + multer
express.compress |	compression
express.cookieSession |	cookie-session
express.cookieParser |	cookie-parser
express.logger |	morgan
express.session |	express-session
express.favicon |	serve-favicon
express.responseTime |	response-time
express.errorHandler |	errorhandler
express.methodOverride |	method-override
express.timeout |	connect-timeout
express.vhost |	vhost
express.csrf |	csurf
express.directory |	serve-index
express.static |	serve-static

```js 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

## 配置Express
process.env.NODE_ENV 或 app.get('env')使用来判断node程序所处的环境的，环境的名字可以任意起。在启动node程序的时候，输入以下命令：
```s
NODE_ENV=development node app.js
```
有些中间件只会在开发环境中使用，如详细日志等，而在开发环境中就不用，这个时候就需要对环境进行判断。
```js
if ('development' == app.get('env')) {
    console.log('development env');
  }
```