## 异步流程控制
js是单线程的语言，不会出现像java一样的多线程锁的问题，一次只能执行一个函数。

## nimble
nimble是一个流程控制库，可以串行、并行执行方法等
项目地址 http://caolan.github.io/nimble/
下面是一个 nimble的demo：并行下载两个文件，最后将两个文件用tar命令集合起来。

```js
var flow = require('nimble');
var exec = require('child_process').exec;

function downlaod(version, destination, callback) {
    var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
    var filePath = destination + '/' + version + '.tgz';
    exec('curl ' + url + ' >' + filePath,callback);
}

flow.series([
    function (callback) {
        flow.parallel([
            function (callback) {
                console.log('Downloading V0.4.6....');
                downlaod('0.4.6', '/tmp',function(res){
                    console.log('Download V0.4.6....');
                    callback();
                });
            },
            function (callback) {
                console.log('Downloading V0.4.7....');
                downlaod('0.4.7', '/tmp',function(res){
                    console.log('Download V0.4.7....');
                    callback();
                });
            }
        ],callback);
    },
    function () {
        console.log('archive downloaded files...');
        exec(
            'tar cvf node_distros.tar /tmp/0.4.6.tgz /tmp/0.4.7.tgz',
            function (error, stdout, stderr) {
                console.log('all done!');
                // callback();
            }
        );
    }
]);
```