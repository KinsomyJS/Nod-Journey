# day1 node in action chapter3
## exports 和 module.exports的区别
### exports
``` js
var module = require('module');
```

当require一个module后，require函数会返回这个module中exports对象中的内容，然后通过*module.xxx*便可以使用模块内暴露的内容。

### module.exports
Node中不能用任何其他对象、函数或者变量给exports对象赋值，例如在*learn_module_exports.js*里，直接将Base赋给exports就是错误的。
```js
exports = Base;
```
这个时候就需要用到module.exports,用于对外提供单个变量、函数或者对象。
###注意
如果一个module中同时有exports和module.exports，那么将会返回module.exports，而exports将会失效。
那么为什么导出的对象会是module.exports呢？
###原因
在module中，exports对象只是module.exports的一个全局引用，是一个控对象，可以往里面添加属性
```js
var exports = {};
```
所以exports.add()其实是module.exports.add(),如果这个时候将exports指向其他，就断开了exports和module.exports之间的引用关系，exports就会失效，如果想要再次连接，就写成
```js
module.exports = exports = Base
```

## 继承
继承有两种简洁的写法：
```js
var util = require('util');
util.inherits(child,parent);
```

```js
child.prototype = new parent();
```
## 匿名函数解决异步时序混乱问题
```js
var color = 'blue';
setTimeout(() => {
    console.log('the color is :' + color);
}, 200);
var color = 'green';
```
在上面这个代码里，最后输出的颜色是green，因为输出是异步执行的，延迟了200ms，这个时候color已经改变，这样就会导致时序混乱，要解决可以用闭包匿名函数，color变成了函数内部的本地变量，不受外部影响。
```js
var color = 'blue';
(function (color) {
    setTimeout(() => {
        console.log('the color is :' + color);
    }, 200)
})(color);
var color = 'green';
```