# 面向对象的程序设计

> ECMA-262把对象定义为：“无序属性的集合，其属性可以包含基本值、对象或者函数。”严格来讲，这就相当于说对象是一组没有特定顺序的值。（每个属性或方法都一个名字，而每个名字都映射到一个值）


## 理解对象

> 创建对象最简单的方式就是创建一个Object的实例，然后再为它添加属性和方法；也可以使用对象字面量成为创建对象的首选模式。

```javascript
var obj = new Object();
obj.name = "jame";
obj.age = 23;
obj.job = "software Engineer";
obj.sayName =  function(){
  console.log(this.name);
};


//字面量方法
var obj2 = {
  name:'jame',
  age:23,
  job:'software Engineer',
  sayName :function(){
    console.log(this.name);
  }
};

```

###1. 属性类型

>  ECMAScript第5版在定义只有内部采用的特性（attribute）时，描述了属性的各种特征。这些特性值只是为了实现javascript引擎用的，因此在javascript中不能直接访问它们。为了表示特性是内部值，该规范把它们放在**两队方括号**中，例如：[[Enumerable]]。
+ 数据属性
+ 访问器属性

####1.1 数据属性

> 数据属性包含一个数据值的位置。在这个位置可以读取和写入值。主要有4个描述其行为的特性：
+ [[Configurable]]:表示能够通过delete删除属性从而重新定义属性，能否修改属性的特性，能够把属性修改为访问器属性。默认值为true
+ [[Enumerable]]: 表示能否通过for-in循环返回属性。默认值为true
+ [[Writable]]: 表示能否修改属性的值。默认值为true
+ [[Value]]:包含这个属性的数据值。读取属性值从该位置读取，写入新增也保存该位置。默认值undefined

```javascript
// 默认情况下[[Configurable]]、[[Enumerable]]、[[Writable]]的值都为true；而[[Value]]的值'Nicholas'
var person = {
  name:'Nicholas'
};
```

***要修改属性默认的特性，必须使用ECMAScript5的Object.defineProperty()方法。正常接收3个参数：***
+ 属性所在的对象
+ 属性名字
+ 属性描述符对象，描述符对象必须是[[Configurable]]、[[Enumerable]]、[[Writable]]、[[Value]]其中的一个或多个，可以修改对应的特性值

```javascript
var person = {};
Object.defineProperty(person, "name", {
  configurable: false,
  value: 'linq'
});

Object.defineProperty(person, "age", {
  writable: false,
  value : 23
});

console.log(person.name);
delete person.name;       //error

console.log(person.age);
person.age = 11;          //error

```

***为age赋值时,由于age是只读的。如果给它指定新值，在严格模式下，赋值报错；非严格模式下，赋值被忽略***

*在使用了Object.defineProperty()方法修改统一属性，但把configurable设置为false后限制除writable外的其它特性修改了；另外如果不指定其它特性，configurable、enumerable、writable特性的默认值都会变成false。*


####1.2 访问器属性

> 访问器属性不包含数据值；他们包含一对getter和setter函数（这两个函数都不是必须的）。读取访问器属性时，会调用getter函数返回有效的值；在写入访问器属性时，会调用setter函数并传入新值并决定如何处理数据。主要有如下4个特性：
+ [[Configurable]]：能够通过delete删除属性从而重新定义属性，能够修改属性的特性，能够把属性修改为数据属性。直接在对象上定义的属性，默认值为true。
+ [[Enumerable]]：表示能否通过for-in循环返回属性。直接在对象上定义的属性，默认值为true
+ [[Get]]：在读取属性时调用的函数。默认值为undefined
+ [[Set]]: 在写入属性时调用的函数。默认值为undefined

```javascript
var book = {
  _year: 2004,
  edition: 1
};
Object.defineProperty(book, "year", {
  get:function(){
    return this._year;
  },
  set: function(newValue){
    if(newValue <1970){
      this._year = 1970
    }else{
      this._year = newValue;
    }
  }
});
```


***不一定非要同时制定getter和setter。只制定getter以为着属性时不能写，尝试写入属性被忽略。严格模式时，只读只写被访问时，均会报错***

*支持ECMAScript5的这个方法的浏览器有IE9+、FF4+、Safari5+和Chrome等*


###2. 定义多个属性

> 由于对对象定义多个属性的可能性很大，ECMAScript5又定义了一个Object.defineProperties()方法。该方法可以通过描述符一次定义多个属性。
+ 第一个参数：对象要添加和修改其属性的对象
+ 第二个参数：对象的属性和第一个对象对象中要添加或修改的属性一一对应。

```javascript 
var book = {};
Object.defineProperties(book, {
  _year:{
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {
    get : function(){
      return this._year;
    },
    set: function(newValue){
      if(newValue >2004){
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
});
```

*上述代码中定了两个数据属性（_year和edition）和一个访问器属性（year）。唯一的区别就是这些属性都是在同一时间创建的*

***支持Object.defineProperties()方法的浏览器：IE9+、FF4+、Safari5+、Opera12+和Chrome***

###3. 读取属性的特性

> 使用ECMAScript5的Object.getOwnPropertyDescriptor()方法，可以取得给定属性的描述符；（访问器属性集合或数据属性集合）。这个方法接收两个参数：
+ 对象所在的属性
+ 要读取其描述符的属性名称

```javascript
var book = {};
Object.defineProperties(book, {
  _year:{
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {
    get : function(){
      return this._year;
    },
    set: function(newValue){
      if(newValue >2004){
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
});

var descriptor  = Object.getOwnPropertyDescriptor(book, '_year');
console.log(descriptor.value);      //2004
console.log(descriptor.configurable); // false
console.log(descriptor.get);          //"undefined"

descriptor = Object.getOwnPropertyDescriptor(book, 'year');
console.log(descriptor.value);        //undefined
console.log(descriptor.configurable);   //false
console.log(descriptor.get);            //function

```

***在javascript中，可以针对任何对象----包括Dom和Bom对象，使用Object.getOwnPropertyDescriptor()方法。支持这个方法的浏览器：IE9+、FF4+、Safari5+、Opera12+和Chrome***










