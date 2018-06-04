var fs = require('fs');
var completeTasks = 0;
var tasks = [];
var wordCounts = {};
var fileDir = './text';

function checkCompletement() {
    completeTasks++;
    if (completeTasks == tasks.length) {
        for (var index in wordCounts) {
            console.log(index + ': ' + wordCounts[index]);
        }
    }
}

function countWordsInText(text) {
    var words = text.toString()
        .toLowerCase()
        .split(/\W+/)
        .sort();
    for (var index in words) {
        var word = words[index];
        wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
    }
}

fs.readdir(fileDir, function (err, files) {
    if (err) throw err;
    for (var index in files) {
        var task = (function (file) {
            return function () {
                fs.readFile(file, function (err, text) {
                    if (err) throw err;
                    countWordsInText(text);
                    checkCompletement();
                });
            };
        })(fileDir + '/' + files[index]);
        tasks.push(task);
    }
    for (var index in tasks) {
        (tasks[index])();
    }
});