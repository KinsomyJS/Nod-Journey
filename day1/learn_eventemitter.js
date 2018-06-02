var net = require('net');
var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();
//自定义eventemitter
channel.on('join', function () {
    //获取正在监听的数量
    var num = this.listeners('join').length;
    console.log('welcome' + num);
});
var server = net.createServer(function (socket) {
    //on用于接收事件data,连续相应
    socket.on('data', function (data) {
        socket.write(data);
        console.log(data.toString());
        //每接收到一次数据，发送一个自定义event
        channel.emit('join');
    });

    //once单次响应data事件
    socket.once('data', function (data) {
        socket.write(data);
        console.log(data.toString());
    });
});
server.listen(8888);

//node learn_eventemitter.js
//telnet 127.0.0.1 8888
var color = 'blue';
(function (color) {
    setTimeout(() => {
        console.log('the color is :' + color);
    }, 200)
})(color);
var color = 'green';