const fs = require("fs");
const clc = require('cli-color');

let fileCounter = 0;
let dirCounter = 0;
let nesting = process.argv[3];
if (isNaN(+nesting) || Number(nesting) < 0) {
    throw new Error("Второй аргумент должен быть положительным числом");
}

function showTreeDir(dir, depth = 0) {
    if (depth >= nesting) {
        return;
    }

    let listDir = fs.readdirSync(dir);
    for (let item of listDir) {
        if (fs.statSync(dir + "/" + item).isDirectory()) {
            console.log("  ".repeat(depth) + "|__" + clc.blue(item));
            dirCounter++;
            showTreeDir(dir + "/" + item, depth + 1);
        } else {
            console.log("  ".repeat(depth) + "-> " + item);
            fileCounter++;
        }

    }

}

function start(dir) {
    try {
        console.log(clc.blue(dir));
        showTreeDir(dir);
        console.log(`Directories: ${dirCounter}. Files: ${fileCounter}`);
    } catch {
        console.log("Проверьте правильность аргументов при запуске скрипта))). Первый аргумент должен представлять путь до директории");
    }
}

start(process.argv[2]);
