# Express进阶（一）
创建支持ejs和会话的程序骨架。
```s
express -e bbs
```
进入bbs文件夹，npm install安装依赖项。
## 认证用户
因为需要用到redis存储用户数据，同时还要用到bcrypt处理密码，所以要额外安装这两个第三方模块。
```s
npm install redis bcrypt --save
```

### 创建用户模型
在/bbs/lib/ 下创建一个用户数据模型文件user.js。
```js
var redis = require('redis');
var bcrypt = require('bcrypt');
//创建到redis的连接
var db = redis.createClient();

module.exports = User;

function User(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}

//保存用户到redis
User.prototype.save = function (fn) {
    //如果id存在，说明用户已经存在,否则认为是新用户
    if (this.id) {
        this.update(fn);
    } else {
        var user = this;
        //id自增
        db.incr('user:ids', function (err, id) {
            if (err) return fn(err);
            user.id = id;
            user.hashPassword(function (err) {
                if (err) return fn(err);
                user.update(fn);
            });
        });
    }
};

//更新用户数据
User.prototype.update = function (fn) {
    var user = this;
    var id = user.id;
    db.set('user:id:' + user.name, id, function (err) {
        if (err) return fn(err);
        db.hmset('user:' + id, user, function (err) {
            fn(err);
        });
    });
};

//密码hash加密
User.prototype.hashPassword = function (fn) {
    var user = this;
    bcrypt.genSalt(12, function (err, salt) {
        if (err) return fn(err);
        user.salt = salt;
        bcrypt.hash(user.pass, salt, function (err, hash) {
            if (err) return fn(err);
            user.pass = hash;
            fn();
        });
    });
};
```
### 测试用户保存
在user.js下创建测试用例
```js
/**
 * 测试用例
 */
var kinsomy = new User({
    name: 'kinsomy',
    pass: '123',
    age: '18'
});

kinsomy.save(function (err) {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('user id %d', kinsomy.id);
});
```
在命令行启动redis服务器，然后运行user.js，查看redis是否存储成功。
```s
redis-server
redis-cli
GET user:ids //获得最近创建的数据
HGETALL user:1 //获得数据
```

### 根据用户名获取用户信息
在web界面上，用户会输入用户名和密码来进行登录操作，这个时候就需要根据用户名来获取用户信息，首先根据用户名获取用户id，接着根据用户id来获取user对象。
```js
//根据用户名获取用户
User.getByName = function (name, fn) {
    User.getId(name, function (err, id) {
        if (err) return fn(err);
        User.get(id, fn);
    });
};

User.getId = function (name, fn) {
    db.get('user:id:' + name, fn);
}

User.get = function (id, fn) {
    db.hgetall('user:' + id, function (err, user) {
        if (err) return fn(err);
        fn(null, new User(user));
    });
};
```

### 认证用户登录
```js
//认证
User.authenticatie = function(name,pass,fn){
    User.getByName(name,function(err,user){
        if(err) return fn(err);
        if(!user.id) return fn();//用户不存在
        bcrypt.hash(pass,user.salt,function(err,hash){
            if(err) return fn(err);
            if(hash == user.pass) return fn(null,user);
            fn();
        });
    });
};
```