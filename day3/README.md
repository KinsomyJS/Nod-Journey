# 学习内容
## Node Http 底层api
下图是Node Web陈程序的内部结构，核心是底层api。
![](https://github.com/KinsomyJS/Node-Journey/blob/master/day3/internal_%20structure.png?raw=true)

node的http请求会返回request 和response的回调函数，服务器没收到一个新的请求，都会用新的req和res对象触发回调函数，node会解析htt头并放到req中返回，但是默认不会解析body。

需要收到调用**res.end()**去结束响应，否则会超时或一直处于打开状态。

### 修改http header
1. res.setHeader(field,value)
2. res.getHeader(field)
3. res.removeHeader(field)

### 设置http code
res.statusCode = 200/404 ....
