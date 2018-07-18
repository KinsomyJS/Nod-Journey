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