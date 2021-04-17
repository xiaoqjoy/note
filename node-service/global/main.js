// 输出全局变量 __filename 的值
//__filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，
//且和命令行参数所指定的文件名不一定相同。

如果在模块中，返回的值是模块文件的路径。
console.log( __filename );



// 输出全局变量 __dirname 的值
//__dirname 表示当前执行脚本所在的目录
console.log( __dirname );



function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
setTimeout(printHello, 2000);