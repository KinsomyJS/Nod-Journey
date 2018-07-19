var express = require('express');
var User = require('../lib/user');
var basicAuth = require('basic-auth-connect');

exports.auth = basicAuth(User.authenticatie);

exports.user = function (req, res, next) {
    User.get(req, params.id, function (err, user) {
        if (err) return next(err);
        if (!user.id) return res.send(404);
        res.json(user);
    });
};