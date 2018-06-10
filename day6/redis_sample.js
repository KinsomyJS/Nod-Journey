var redis = require('redis');
//连接redis服务器
var client = redis.createClient(6379, '127.0.0.1');
client.on('error', function (err) {
    console.log('Redis Error:' + err);
});
//操作redis中的数据
//添加key为username，value为kinsomy
//redis.print打印操作结果
client.set('username', 'kinsomy', redis.print);
client.get('username', function (err, value) {
    if (err) throw err;
    console.log('the value of key username is :' + value);
});

//哈希表操作数据
//hmset存储数据 kinsomy为key 
client.hmset('kinsomy', {
    'name': 'kinsomy',
    'gender': 'male',
    'country': 'China'
}, redis.print);
//获取kinsomy中gender的值
client.hget('kinsomy', 'gender', function (err, value) {
    if (err) throw err;
    console.log('kinsomy is :' + value);
});
//获取哈希表的所有的键
client.hkeys('kinsomy', function (err, keys) {
    if (err) throw err;
    console.log('hashtable keys')
    keys.forEach(function (key) {
        console.log(' ' + key);
    });
});

//链表操作数据
//lpush方法添加值
client.lpush('tasks', 'play basketball', redis.print);// index 2
client.lpush('tasks', 'eat dinner', redis.print);// index 1
client.lpush('tasks', 'go to sleep', redis.print);// index 0
//lrange取数据，范围为start-end 如果end为-1就是到最后一个item
client.lrange('tasks', 0, 2, function (err, items) {
    if (err) throw err;
    console.log('lrange:')
    items.forEach(function (item, i) {
        console.log(' ' + item);
    });
});
