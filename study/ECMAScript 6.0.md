##      ECMAScript 6.0

ECMAScript 6.0（以下简称 ES6）是 JavaScript(ES5) 语言的下一代标准.

1.部署进度

Node是JavaScript的服务器运行环境(runtime).

```javascript
    node --v8-option
```

访问<a>ruanyf.github.io/es-checker</a>，可以看到您的浏览器支持 ES6 的程度

运行下面的命令，可以查看你正在使用的 Node 环境对 ES6 的支持程度

```javascript
npm install -g es-checker
es-checker
```

2.Babel转码器

Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行。
这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持

```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
  return item + 1;
});


function ff(item){
    return item + 1
}

var aa = (index => index + 1)

ff(1) == aa(1)

```

上面的原始代码用了箭头函数，Babel 将其转为普通函数，
就能在不支持箭头函数的 JavaScript 环境执行了。

3.for…of循环

一个数据结构只要部署了<b>Symbol.iterator</b>属性，就被视为具有iterator接口，
就可以用for…of循环遍历它的成员

for…of循环可以使用的范围包括数组、Set和Map结构、
某些类似数组的对象（比如arguments对象、DOM NodeList对象）、
后文的Generator对象，以及字符串。

数组

数组原生具备iterator接口，for…of循环本质上就是调用这个接口产生的遍历器。

for…of循环可以代替数组实例的forEach方法。

JavaScript原有的for…in循环，只能获得对象的键名，不能直接获取键值。
ES6提供for…of循环，允许遍历获得键值。

[关于forEach方法说明](http://www.jb51.net/article/67441.htm)       

```javascript
var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
  console.log(a); // 0 1 2 3
}

for (let a of arr) {
  console.log(a); // a b c d
}

```

for…of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。
这一点跟for…in循环也不一样。

```javascript
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
```

Set和Map结构

Set和Map结构也原生具有Iterator接口，可以直接使用for…of循环

```javascript
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262
```

//注: Set 和 Array 循环结果，Set不会重复循环相同的数据出来

上面代码演示了如何遍历Set结构和Map结构。
值得注意的地方有两个，首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。
其次，Set结构遍历时，返回的是一个值，而Map结构遍历时，返回的是一个数组，
该数组的两个成员分别为当前Map成员的键名和键值。


<span style='color:red'>
var 和 let的区别:   
使用let时，不能重新let一个变量名    
eg:  let a = 1; let a = 2;  
//Identifier 'ii' has already been declared;    
但是var不同，会重新覆盖
</span>


entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于Set，键名与键值相同。Map结构的iterator接口，默认就是调用entries方法。
keys() 返回一个遍历器对象，用来遍历所有的键名。
values() 返回一个遍历器对象，用来遍历所有的键值。

```javascript
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```


















