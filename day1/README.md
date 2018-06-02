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