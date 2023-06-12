const fs = require("fs");
const clc = require('cli-color');
const directoryName = "1";
let fileCounter = 0;
let dirCounter = 0;


function showTreeDir(dir, depth = 0) {
    let listDir = fs.readdirSync(dir);
    for (let item of listDir) {

        if (fs.statSync(dir + "/" + item).isDirectory()) {
            console.log("  ".repeat(depth) + "|__" + clc.blue(item));
            dirCounter++;
            showTreeDir(dir + "/" + item, depth + 1);
        } else {
            console.log("  ".repeat(depth) +"-> "+ item);
            fileCounter++;
        }
    }
}
function start(dir){
    console.log(clc.blue(dir));
    showTreeDir(dir);
    console.log(`Directories: ${dirCounter}. Files: ${fileCounter}`);
}

start(directoryName);
