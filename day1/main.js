var learn_exports = require('./learn_exports');
var Base = require('./learn_module_exports');

var base = new Base(2);
console.log('learn exports add : ' + learn_exports.add(1, 1));
console.log('learn_module_exports add :' + base.add(1, 2));
console.log(learn_exports.a);
