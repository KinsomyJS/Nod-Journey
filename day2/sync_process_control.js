//串行流程控制
var flow = require('nimble');

//一个写法比较ugly的例子
setTimeout(() => {
    console.log('excute first');
    setTimeout(() => {
        console.log('execute second');
        setTimeout(() => {
            console.log('execute third');
        }, 100);
    }, 500);
}, 1000);


//用Nimble写的串行流程控制,可读性和维护性更强
flow.series([
    execFirst,
    execSecond,
    execThird
]);

function execFirst(callback) {
    setTimeout(() => {
        console.log('execute first');
        callback();
    }, 1000);
}
function execSecond(callback) {
    setTimeout(() => {
        console.log('execute second');
        callback();
    }, 500);
}
function execThird() {
    setTimeout(() => {
        console.log('execute third');
    }, 100);
}
