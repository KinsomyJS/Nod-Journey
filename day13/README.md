# Express进阶（二）
## 注册新用户
主要完成以下任务实现注册功能：
* 将注册和登录路由映射到url路径上
* 添加显示注册表单的注册路由逻辑
* 添加逻辑存储从表单提交上来的用户数据
用户访问/regist会显示注册表单。

### 添加注册路由
```js
var register = require('./routes/register');
//添加路由
app.get('/register',register.form);
app.post('/register',register.submit);
```

### 创建注册表单html
在views文件夹下创建register.ejs。

### 回话存放临时消息
```js
var express = require('express');
var res = express.response;

res.message = function (msg, type) {
    type = type || 'info';
    var sess = this.req.session;
    sess.message = sess.message || [];
    sess.message.push({ type: type, string: msg });
};

res.error = function (msg) {
    return this.message(msg, 'error');
};

module.exports = function(req,res,next){
    res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = function(){
        req.session.messages = [];
    };
    next();
};
```
