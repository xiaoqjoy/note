var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('txt.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

readerStream.pipe(writerStream);

console.log("程序执行完毕");



//读取一个文件内容并将内容写入到另外一个文件中			管道流