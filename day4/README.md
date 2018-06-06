# 构建restful web 服务
* 通过检查req.method可以查看请求的http方法
* req.on('data')可以监听到请求，返回一个Buffer对象，Buffer是node里面的字节数组，如果只需要文本可是的返回，可以通过**req.setEncoding('utf8')**将流编码设定为utf8，这样data事件将返回字符串。