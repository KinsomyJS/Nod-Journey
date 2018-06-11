# node中的数据存储
接下来的几天将要学习node程序中的数据存储
## 数据存储的选择
* 存储数据无需安装和配置DBMS
* 用关系型数据库存储数据，例如MySQL和PostgreSQL
* 用NoSQL数据库存储数据，例如Redis，MongoDB和Mongoose

## 无数据库服务器的数据存储
如果存储数据不需要对DBMS进行维护是很方便的，例如内存存储和文件存储，免去了安装和配置DBMS的操作。
### 内存存储
程序中定义变量存储少量频繁使用的数据。
### 文件存储
经常会用文件存储的方式保存配置信息，做数据持久化，和存储在内存中不同，这些存储在磁盘上的数据不会在程序和服务器重启之后消失。

## 关系型数据库
### MySQL
1、首先安装mysql模块
```s
npm install mysql
```
2、引入数据库模块，创建连接
```js
var mysql = require('mysql');
//连接数据库
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'myuser',
    password: 'mypassword',
    database: 'testdb'
});
```
3、数据操作全部用sql语言。
```js
db.query(sqlString);
```

## NoSQL数据库
### Redis
Redis适合处理存储不需要长期访问的数据，将数据存储在RAM中，并在磁盘上记录数据的变化。因为存储在RAM上，所以存储空间有限，但是因为RAM的读写速度快，所以操作数据的速度会很快，如果Redis服务器崩溃导致RAM中的数据丢失，可以用磁盘中的日志对数据进行恢复。

安装redis参考官方教程：https://redis.io/download

1、安装redis
```s
npm install redis
```
2、连接redis服务器
```js
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
client.on('error', function (err) {
    console.log('Redis Error:' + err);
});
```
3、用key-value操作数据
```js 
//操作redis中的数据
//添加key为username，value为kinsomy
//redis.print打印操作结果
client.set('username', 'kinsomy', redis.print);
client.get('username', function (err, value) {
    if (err) throw err;
    console.log('the value of key username is :' + value);
});
```
4、用哈希表存储和获取数据
```js
//hmset存储数据 kinsomy为key 
client.hmset('kinsomy',{
    'name':'kinsomy',
    'gender':'male',
    'country':'China'
},redis.print);
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
```
5、用链表存储和获取数据
```js
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
```
**需要注意的事push进去的顺序和实际取出来index相反**
链表的缺点在于性能较低下，他是O(n)的随着链表长度的增加，速度会变慢。

6、用集合存储和获取数据
集合的速度取决于集合的大小，它是O(1)的，集合中的元素是唯一的，不可重复，如果重复添加相同的值，第二次及以后的操作会被忽略
```js
//集合操作数据
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '144.102.12.22', redis.print);
//取数据
client.smembers('ip_addresses', function (err, members) {
    if (err) throw err;
    console.log('-------set--------')
    console.log(members);
});
```
7、redis订阅消息功能
redis有类似于订阅者模式的设计，可以创建subscriber订阅一个channel，然后创建publisher在channel上发送消息，则所有订阅该channel的subscriber都能接收到消息。
```js
//信道传递数据
var net = require('net');
var server = net.createServer(function (socket) {
    var subscriber;//消息订阅者
    var publisher;//消息发布者
    //连接后创建订阅和发布客户端
    socket.on('connect', function () {
        subscriber = redis.createClient();
        subscriber.subscribe('main_channel');//订阅channel
        //message事件接受消息
        subscriber.on('message', function (channel, message) {
            socket.write('Channel: ' + channel + ': ' + message);
        });
        publisher = redis.createClient();
    });
    //收到数据后发送消息
    socket.on('data',function(data){
        publisher.publish('main_channel',data);
    });
    //end事件断开订阅
    socket.on('end',function(){
        subscriber.unsubscribe('main_channel');
        subscriber.end();
        publisher.end();
    });
});
server.listen(3000);
```

