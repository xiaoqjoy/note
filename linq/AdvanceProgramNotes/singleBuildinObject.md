# 单体内置对象

> EMCA-262对内置对象的定义是：由ECMAScript实现提供的、不依赖于宿主环境的对象，这些对象在ECMAScript程序执行之前就已经存在了。***开发人员不必显式地实例化内置对象，因为他们在执行前就已经存在了***。

主要的内置对象有：
+ Object
+ Array
+ String
+ Boolean
+ Number
+ Date
+ RegExp
+ Global
+ Math

##1. Global对象

> Global对象是ECMAScript中最特别的一个对象，不管从任何角度来说都是不存在这个对象的。ECMAScript
中把Global对象在某种意义上市作为一个终极的“兜底儿对象”来定义的。换句话说，***不属于任何其他对象
的属性和方法，最终都是属于它的属性和方法***

诸如之前所见函数：
+ isNaN
+ isFinite
+ parseInt
+ parseFloat

###1.1 URI编码方法

> 对URI（Uniform Resource Identifiers，通用资源标识符）进行编码，以便发送给浏览器。有效的URI中不能包含某些特殊字符（空格等），它们用特殊的UTF-8编码替换所有无效的字符，从而让浏览器能够接受和理解。

常见4个URI编码方法：
+ encodeURI 用于整个URI进行编码，不会对本身属于URI的特殊字符进行编码（例如：**冒号、正斜杠、问号和井字号**等），,返回新的编码字符串。
+ encodeURIComponent 主要是用于对URI中的某一段进行编码，它会对发现的任何非标准（**所有非字母、数字字符**）的字符进行编码，返回新的编码字符串。
+ decodeURI 用于对整个URI字符进行解码，与encodeURI相应对，解码要求规则一致,返回新的解码字符串。
+ decodeURIComponent 用于对URI中的某一部分字符进行解码，与encodeURIComponent相对应，解码要求规则一致，返回新的解码字符串。

```javascript
var uri = "http://mg.yitb.com/orders/index order#setting?ordertype=0";
// "http://mg.yitb.com/orders/index%20order#setting?ordertype=0"
var encodeuri = encodeURI(uri);
console.log(encodeuri); 

// "http%3A%2F%2Fmg.yitb.com%2Forders%2Findex%20order%23setting%3Fordertype%3D0"
var encodeComponentUri = encodeURIComponent(uri);
console.log(encodeURIComponent(uri))

// 解码
console.log(decodeURIComponent(encodeComponentUri));
console.log(dencodeURI(encodeuri));
```

###1.2 eval()方法

> ECMAScript语言中最强大的一个方法：eval()，它就像一个完整的ECMAScript解析器，它只接受一个参数，即要执行的ECMAScript（javascipt）字符串。

```javascript 
eval("console.log('hi')");

var msg = "hello world";
eval("console.log(msg)");

eval("function sayHi(){console.log("hello");}");
sayHi();
```

***当解析器发现代码中调用eval()方法时，它会将传入的参数当做实际的ECMAScript语句来解析，然后把执行结果插入到原位置。通过eval（）执行的代码被认为是包含该次调用的执行环境的一部分，具有与该执行环境相同的作用域链。即：可以引用执行环境中定义的变量***

> 在eval()中创建的任何变量或函数都不会被提升，因为在解析代码的时候，他们被包含在一个字符串中；他们只在eval()执行的时候创建。

```javascript
eval("var msg = 'hello world'");
console.log(msg);
```

***严格模式下，在外部访问不到eval()中创建的任何变量或函数，因此前面两个例子都会导致错误；同样，在严格模式下，为eval赋值也会导致错误：***

```javascript
'use strict'
eval = "hi";        // causes error
```

###1.3 Global对象的属性

> Global 对象还包含一些属性：

|属性       |说明         |
|-----------|-------------|
|undefined  |特殊值undefined   |
|NaN        |特殊值NaN         |
|Infinity   |特殊值Infintiy    |
|Object     |构造函数Object          |
|Array      |构造函数Array          |
|Function   |构造函数Function          |
|Boolean    |构造函数Boolean          |
|String     |构造函数String          |
|Number     |构造函数Number          |
|Date       |构造函数Date          |
|RegExp     |构造函数RegExp          |
|Error      |构造函数Error          |
|EvalError  |构造函数EvalError          |
|RangeError |构造函数RangeError          |
|ReferenceError   |构造函数ReferenceError          |
|SyntaxError      |构造函数SyntaxError          |
|TypeError        |构造函数TypeError          |
|URIError         |构造函数URIError          |

***ECMAScript5明确禁止给undifined、NaN和Infinity赋值，这样做即使在非严格模式下也会导致错误***

###1.4 window对象

> ECMAScript虽然没有指出如何直接访问Global对象，但**Web浏览器都是将这个全局对象作为window对象的一部分加以实现**。因此，在全局作用域中声明的所有变量和函数，都变成了window对象的属性。

```javascript
var color = 'red';
function sayColor(){
  console.log(window.color);
}
window.sayColor();

```

> JavaScript中window对象除了扮演ECMAScript规定的Global对象的角色外，还承担了很多别的任务。

```javascript
var global = function(){
  return this;
}();
```

一个立即调用的函数表达式，返回this值。

***如前所述，在没有给函数明确指定this值得情况下（无论是通过将函数添加为对象的方法，还是通过调用call()或apply()）,this值等于Global对象。而通过这种简单地返回this来取得Global对象，在任何环境下都是可以执行的***


##2. Math对象

> ECMAScript还为保存数学公式和信息提供了一个公共位置，即Math对象。与我们在javaScript直接编写的计算功能相比，Math对象提供的计算功能执行起来要快得多。

###2.1 Math对象的属性

Math对象包含的属性大都是数学计算中可能会用到一些特殊值，如下：

|属性             |说明                          |
|-----------------|------------------------------|
|Math.E           |自然对数的底数，即常量e的值   |
|Math.LN10        |10的自然对数                  |
|Math.LN2         |2的自然对数                   |
|Math.LOG2E       |以2为底e的对数                |
|Math.LOG10E      |以10为底e的对数               |
|Math.PI          |∏的值                           |
|Math.SQRT1_2     |1/2的平方根（即2的平方根的倒数）|
|Math.SQRT2       |2的平方根                       |

###2.2 min()和max()方法

> min()和max()方法用于确定一组数值中的最小值和最大值

```javascript
var max = Math.max(3,74,32,2,43);
console.log(max);

var min = Math.min(5,3,6,2,676,233);
console.log(min);

var arr = [23,35,3,2,4,63,5,45,67];
console.log(Math.min.apply(Math, arr));
console.log(Math.max.apply(Math, arr));
```

***实用技巧：把Math对象作为apply()的第一个参数，从而正确的设置this值，可以将任何数组作为第二个参数传入***

###2.3 舍入方法

> 小数值舍入为整数的几个方法:
+ Math.ceil() 执行向上舍入，即它总是将数值向上舍入为最接近的整数；
+ Math.floor() 执行向下舍入，即它总是将数值向下舍入为最接近的整数；
+ Math.round() 执行标准舍入，即它总是将数值四舍五入为最接近的整数（常见舍入规则）；

```javascript
console.log(Math.ceil(23.9));
console.log(Math.ceil(23.5));
console.log(Math.ceil(23.1));

console.log(Math.floor(23.9));
console.log(Math.floor(23.5));
console.log(Math.floor(23.1));

console.log(Math.round(23.9));
console.log(Math.round(23.5));
console.log(Math.round(23.1));
```

###2.4 random方法

> 用于返回大于等于0小于1的一个随机数。

```javascript
var num = Math.floor(Math.random() * 9 + 2);      //取2到10之间的随机整数

var selectFrom = function(lowValue, upperValue){
  var range = upperValue - lowValue + 1;
  return Math.floor(Math.random() * range + lowValue);
};
var arr = ['red', 'green', 'blue', 'white', 'yellow'];
arr[selectFrom(0, arr.length -1)];

```

***上面selectFrom函数是通用的取随机数规则，具有很强的实用价值***

###2.5 其它方法

> Math对象中还包含其它一些与完成各种简单或复杂计算的有关方法

|方法                   |说明                                     |
|-----------------------|-----------------------------------------|
|Math.abs(num)          |返回num的绝对值                          |
|Math.exp(num)          |返回Math.E的num次幂                      |
|Math.log(num)          |返回num的自然对数                        |
|Math.pow(num, power)   |返回num的power次幂                       |
|Math.sqrt(num)         |返回num的平方根                          |
|Math.acos(x)           |返回x的反余弦值                          |
|Math.asin(x)           |返回x的反正弦值                          |
|Math.atan(x)           |返回x的反正切值                          |
|Math.atan2(y,x)        |返回y/x的反正弦值                        |
|Math.cos(x)            |返回x的余弦值                            |
|Math.sin(x)            |返回x的正弦值                            |
|Math.tan(x)            |返回x的正切值                            |





