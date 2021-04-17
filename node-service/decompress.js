var fs = require("fs");
var zlib = require('zlib');

// 解压 compress.txt.gz 文件为 compress.txt
fs.createReadStream('compress.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('compress.txt'));
  
console.log("文件解压完成。");