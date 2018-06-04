var flow = require('nimble');
var exec = require('child_process').exec;

function downlaod(version, destination, callback) {
    var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
    var filePath = destination + '/' + version + '.tgz';
    exec('curl ' + url + ' >' + filePath, callback);
}

flow.series([
    function (callback) {
        flow.parallel([
            function (callback) {
                console.log('Downloading V0.4.6....');
                downlaod('0.4.6', '/tmp', callback);
            },
            function (callback) {
                console.log('Downloading V0.4.7....');
                downlaod('0.4.7', '/tmp', callback);
            }
        ], callback);
    },
    function (callback) {
        console.log('archive downloaded files...');
        exec(
            'tar cvf node_distros.tar /tmp/0.4.6.tgz /tmp/0.4.7.tgz',
            function (error, stdout, stderr) {
                console.log('all done!');
                callback('all done callback1');
            }
        );
    }
]);


