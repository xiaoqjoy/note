## Function类型

> 每个函数都是Function类型的对象，而且都与其他引用类型一样具有属性和方法。由于函数函数是对象。因此函数名称实际上也是一个指向函数的对象的指针而已，不会与某个函数绑定。

***通常函数申明语法有三种***
```javascript
function sum(num1, num2){
  return num1 + num2;
}

var sum = function(num1, num2){
  return num1 + num2;
}

var sum = new Function('num1', 'num2', "return num1 + num2;");    //不推荐，可能导致解析两次代码
```

###1. 没有重载

> 函数名称即为指针，也有助于理解为什么ECMAScript中没有函数重载的概念。

###2. 函数申明和函数表达式

> 解析器在向执行环境中加载数据时，对函数申明和函数表达式并非一视同仁。函数表达式会率先读取函数申明，并使其在执行任何代码之前可用（可用访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正的被解释执行。

***即使申明函数的代码在调用它的代码后面，Javascript引擎也能把函数申明提升到顶部；并且率先读取将函数申明添添加到执行环境中***

```javascript
var result = sum(1,2);

function sum(num1 + num2){
return num1 + num2;
}
```

###3. 作为值的函数

> 因为ECMAScript中的函数名称本身就是变量（Function的实例对象），所以函数也可以作为值来使用。
* 作为参数一样把一个函数传递给另外一个函数
* 可以将一个函数作为另一个函数的结果返回

```javascript
var createComparisonFunction = function(propertyName){
  return function(obj1, obj2){
    var v1 = obj1[propertyName];
    var v2 = obj2[propertyName];
    if(v1 > v2){
      return -1;
    }else if(v2 >v1){
      return 1;
    }else{
      return 0;
    }
  };
};

var data = [{name:'dkks',age =23}, {name:'adfd', age:11}, {name:'adwg', age:32}];
data.sort(createComparisonFunction('name'));
console.log(data);
data.sort(createComparisonFunction('age'));
console.log(data);
```

###4. 函数内部属性

> 在函数的内部，有两个特殊的对象：arguments和this。
* arguments 类数组对象，包含传入函数中的参数，还有一个叫做callee的属性。指向拥有arguments对象的函数。
* this引用的是函数据以执行的环境对象。全局执行时this就是window对象。

```javascript
window.color = 'red';

var o = {color: 'blue'};

function sayColor(){
  console.log(this.color);
}
sayColor();       //'red'

o.sayColor = sayColor;
o.sayColor();       // 'blue'

```

#### caller对象

> ECMAScript5 规范了该函数对象的属性。这个属性保存的调用当前函数的引用，如果在全局作用域中调用当前函数，它的值为null。

```javascript
function outer{
  inner():
}

function inner(){
  console.log(inner.caller);      //arguments.callee.caller松散耦合
}

outer();
```

***当函数在严格模式下运行时，访问arguments.callee/arugments.caller都会报错***

***函数的严格模式还有一个限制，不能为函数的caller属性赋值，否则会导致错误***


###5. 函数属性和方法

> ECMAScript中的函数是对象，因此函数也有自己的属性和方法。每个函数都包含两个属性length 和prototype
* length 表示函数希望接受的命名参数的个数
* prototype 是保存它们所有实例方法的真正所在。例如：valueOf和toString都是保存在函数prototype下

```javascript
function sum(num1, num2){
  return num1 + num2;
}

console.log(sum.length);

```

***在ECMAScript5中，prototype是不可枚举的，因此使用for-in是无法发现的***

> 每个函数都包含两个非继承而来的方法：apply和call
* apply 传入第一个参数改变运行函数的作用域，第二个为函数形参数组
* call  传入第一个参数改变运行函数的作用域，后续参数为函数形参

```javascript
window.color = 'red';
var o = {color: 'blue'};

function sayColor(){
  console.log(this.color);
}

sayColor();
sayColor.call(this);
sayColor.call(window);
sayColor.call(o);

```

***ECMAScript5中还定义了一个方法：bind()，这个方法会创建一个函数的实例，其this值会被绑定到传给bind（）函数的值***

```javascript
var o = {data: 12323};
var test = function(){
  console.log(this.data);
}
var objTest = test.bind(o);
objTest();                       //12323

```

***目前支持bind函数的浏览器IE9+、FF4+等现代浏览器***


















