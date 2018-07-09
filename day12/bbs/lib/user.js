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

/**
 * 测试用例

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
*/

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

//认证
User.authenticatie = function(name,pass,fn){
    User.getByName(name,function(err,user){
        if(err) return fn(err);
        if(!user.id) return fn();//用户不存在
        bcrypt.hash(pass,user.salt,function(err,hash){
            if(err) return fn(err);
            if(hash == user.pass) return fn(null,user);
            fn();//密码错误
        });
    });
};
