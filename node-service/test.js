console.log("Hello World");


//阻塞代码实例

var fs = require("fs");

var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("程序执行结束!");




//非阻塞代码实例
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {    //回调函数
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");

//程序执行结束!
//菜鸟教程官网地址：www.runoob.com


//Node.js 几乎每一个 API 都是支持回调函数的


// 框架选择   

//xpress  

//koa   hapi















