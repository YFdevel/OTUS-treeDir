const fs = require('fs');
const clc = require('cli-color');

let nesting = process.argv[3];
const dirName = process.argv[2];


function showTreeDir(dir, nesting, obj, depth = 0) {
    if (depth >= nesting) {
        return obj;
    }
    let listDir = fs.readdirSync(dir);
    for (let item of listDir) {
        if (fs.statSync(dir + "/" + item).isDirectory()) {
            console.log("  ".repeat(depth) + "|__" + clc.blue(item));
            obj.dirCounter += 1;
            showTreeDir(dir + "/" + item, nesting, obj, depth + 1);
        } else {
            console.log("  ".repeat(depth) + "-> " + item);
            obj.fileCounter += 1;
        }

    }
    return obj;
}

function start(dir, nesting) {
        if (!dir) {
            console.log("Введите название директории");
            return null;
        }
        if (isNaN(+nesting) || Number(nesting) < 0) {
            console.log("Второй аргумент должен быть положительным числом");
            return null;
        }
        const obj = {
            dirCounter: 0,
            fileCounter: 0

        };
        console.log(clc.blue(dir.split(/[\\\/]+/).slice(-1).toString()));
        const result = showTreeDir(dir, nesting, obj);
        console.log(`Directories: ${result.dirCounter}. Files: ${result.fileCounter}`);
        return obj;

}

start(dirName, nesting);
module.exports =start;
