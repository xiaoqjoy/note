# 创建对象

> 虽然Object构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个借口创建很多对象，会产生大量的重复代码。

##1. 工厂模式

> 是一种广为人知的设计模式，这种模式抽象了创建具体对象的过程。

```javascript
function createPerson(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    console.log(this.name);
  };
  return o;
}

var p1 = createPerson('Nick', 32, 'software Engineer');
var p2 = createPerson('reds', 23, 'doctor');

```

***这种创建对象的方法虽然解决了创建多个相似对象的问题，但切没有解决对象识别的问题***

##2. 构造函数模式

> ECMAScript中的构造函数可以用来创建特定类型的对象，例如：Object和Array这样的构造函数，在运行时会自动出现在执行环境中。

```javascript
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName =function(){
    console.log(this.name);
  }
}

var p = new Person('linq', 23, 'Programer');

```

**函数名Person中的P采用大写，按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以小写字母开头**

较之工厂模式创建有一下不同特定：
+ 没有显式的创建对象
+ 直接将属性和方法赋值给了this对象；
+ 没有return语句


***创建Person的新实例，必须使用new操作符。这种方式构造函数实际上会经历一下4个步骤：***
+ 创建一个新对象
+ 将新对象作为构造函数的作用域（因此this就指向了这个新对象）
+ 执行构造函数中的代码（为这个新对象添加属性）
+ 返回新对象

```javascript
console.log(p1.constructor == Person);
console.log(p2.constructor == Person);

console.log(p2 instanceof Object); //true
console.log(p1 instanceof Person); //true

```

***创建自定义构造函数意味着将来可以将它的实例标识为一种特定的类型***


###2.1 将构造函数当做函数

> 构造函数和其它函数的唯一区别，就在于调用它们的方式不同。
+ 任何函数只要通过new操作符来调用，那么它就是作为构造函数
+ 任何函数如果不过通过new操作符来调用，那么它就和普通函数也不会有什么两样。

```javascript
var p2 = new Person('linq', 32, 'Programer');
p2.sayName();   // linq

Person('Greg', 27, 'Doctor');   //当前执行环境this为window
window.sayName();           //"Greg"

//在另一个对象的作用域中调用
var o = new Object();
Person.call(o, 'Kristen', 25, 'Nurse');
o.sayName();

```

###2.2 构造函数的问题

> 构造函数模式虽然好用，但每个实例的方法都要在实例上创建一遍。但创建两个完成同样任务的Function实例的确没有必要

```javascript
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName;
}

function sayName(){
  console.log(this.name);
}

var p1 = new Person('Nicholas', 23, 'Software Engineer');
var p2 = new Person('Greg', 27, 'Doctor');

```

##3. 原型模式

> 创建的每一个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

```javascript
function Person(){}

Person.prototype.name = "jim";
Person.prototype.age = 23;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
  console.log(this.name);
};

var p1 = new Person();
var p2 = new Person();

p1.sayName();
p2.sayName();

console.log(p1.sayName === p2.sayName);         // true
```
***p1和p2共享同一个sayName方法***

###3.1 理解原型对象

> 无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。默认情况下，所有的原型对象都会自动获得一个constructor(构造函数)属性，这个属性包含一个指向prototype属性所在的函数指针。
+ 当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性[[prototype]]）,指向构造函数的原型对象。
+ **最重要的一点，这个连接存在于实例与构造函数的原型对象之间，而不是存在于实例与构造函数之间**
  
如下图：

![](images/prototypeRelation.png)

#### isPrototypeOf 

> 虽然所有的实现中都无法访问到[[prototype]]、但可以通过isPrototypeOf()方法来确定对象之前是否存在这种关系。

```javascript
console.log(Person.prototype.isPrototypeOf(p1));//true
console.log(Person.prototype.isPrototypeOf(p2));//true
```

#### Object.getPrototypeOf()

> ECMAScript5中增加了一个新方法：Object.getPrototypeOf()能够直接返回[[prototype]]的值

```javascript
console.log(Object.getPrototypeOf(p1) === Person.prototype);      //true
console.log(Object.getPrototypeOf(p2).name);                      //linq
```

#### 多实例共享原型所保存的属性和方法基本原理

> 当代码执行某个对象的属性时，从实例本身开始搜索具有给定名字的属性。如果存在，返回该属性值；如果不存在，则继续搜索指针指向的原型对象是否具有给定名字的属性；如果存在，返回属性值；不存在则继续搜索指针指向的原型对象直到找返回或到Object.prototype为止。

```javascript 
function Person(){}
Person.prototype.name = 'linq';

var p1 = new Person();
var p2 = new Person();
p1.name = 'wangs';

console.log(p1.name);     //来自实例本身
console.log(p2.name);     //来自于原型

//通过delete实例属性可以让实例继续访问原型属性
delete p1.name;
console.log(p1.name);     //来自原型

```

***实例属性、方法优先于原型共享属性方法，当实例添加新属性时，自动屏蔽原型属性；若删除（delete）实例属性时，又能重新访问原型属性***

#### hasOwnProperty()方法

> 检测一个属性是否存在于实例中，还是存在于原型中（该方法是从Object中继承而来）。若是来自实例，返回true；否则返回false。

```javascript
var p1 = new Person();
p1.name = 'test';
console.log(p1.hasOwnProperty('name'));       // true
console.log(p1.hasOwnProperty('age'));        // false

```

***ECMAScript5中的Object.getOwnPropertyDescriptor()方法只能适用实例属性；要取得原型属性的描述符，必须在原型对象上调用Object.getOwnPropertyDescriptor()方法***

###3.2 原型与in操作符

> 有两种方式使用in操作符:
+ 单独使用,通过对象能够访问给定的属性时返回true，无论是实例还是原型中
+ 在for-in循环中使用。

```javascript
function Person(){}

Person.prototype.name = "Nicholas";
Person.prototype.age  = 23;

var p1 = new Person();
p1.name = "linq";

console.log("name" in p1);      //true
console.log("age" in p1);       //true

// 是否为原型属性
function hasPrototypeProperty(obj, name){
  return !obj.hasOwnProperty(name) && (name in obj);
}

console.log(hasPrototypeProperty(p1, "name"));      // false
console.log(hasPrototypeProperty(p1, "age"));      // age
```

#### for-in循环使用时

> 循环使用时，返回的是所有能够通过对象访问的、可枚举的属性。屏蔽了原型中不可枚举属性（即：[[Enumerable]]标记为false的属性）

```javascript
var o = {
  toString: function(){
    return "my Object";
  }
}

for(var prop in o){
  if(prop == "toString"){
    console.log("Found toString");        //IE中存在Bug，其它的均会显示
  }
}

```

#### Object.keys()

> ECMAScript5规定的Object.keys()方法取可枚举的实例属性名称，返回一个包含所有可枚举属性的字符串数组

```javascript
function Person(){}

Person.prototype.name="linq";
Person.prototype.age = 45;
Person.prototype.job = "testaa";
Person.prototype.sayName = function(){
    console.log(this.name);
};

var keys = Object.keys(Person.prototype);
console.log(keys);    //"name,age,job,sayName"

var p1 = new Person();
p1.name = "linq2";
p1.age = 64;
var plKeys = Object.keys(p1);
console.log(plKeys);  //"name,age"

```

***只能获取对象上所有可枚举的实例属性***

#### Object.getOwnPropertyNames()

> ECMAScript5中增加该方法，得到所有的实例属性，**无论它是否可枚举**

```javascript
var keys = Object.getOwnPropertyNames(Person.prototype);
console.log(keys);    // "constructor,name, age, job, sayName"
```

###3.3 更简单的原型写法

> 为了减少不必要的输入，从视觉上更好的封装原型的功能。从字面量来重写整个原型对象。

```javascript
Person.prototype = {
  name: 'yeah',
  age : 35,
  job : 'Engineer',
  sayName: function(){
    console.log(this.name);
  }
}

var f = new Person();

console.log(f.constructor == Person);     //false
console.log(f.constructor == Object);     //true


//如果constructor确实很重要，可以考虑使用ECMAScript5中的Object.defineProperty重设置constructor
Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person
});
```

***代码上来看与Person.property.属性没有什么区别，但依然有两个区别：***
+ *constructor属性不在指向Person*
+ *在重设原型prototype对象之前已经实例化的对象内部[[prototype]]指向之前原型对象*

###3.4 原型的动态性

> 由于在原型中查找值得过程是一次搜索，因此任何修改都可以从实例中提现出来，但如果重写原型对象，那么情况就不一样了
+ 最初构造函数会为实例添加一个指向最初原型的[[prototype]]的指针
+ 原型对象修改为另一个对象等于切断了构造函数与最初原型之间的联系

```javascript
function Person(){}

var friend = new Person();

Person.prototype = {
  constructor: Person,
  name : 'Nicholas',
  age :35,
  job: 'Software Engineer',
  sayName : function(){
    console.log(this.name);
  }
};

friend.sayName();       //error
```

如下图展示这个过程的内幕：


![](images/rewriteprototype.png)

###3.5 原型对象的问题

> 原型模式也不是没有缺点，主要缺点有两个：
+ 它省略了为构造函数传递参数初始化参数这一环节，所有实例在默认情况下都取相同的默认原型值
+ 引用类型的共享特性问题。尤其是Array等类型容易导致原型引用属性发生变化，造成对其它实例共享的问题。

```javascript
function Person(){}

Person.prototype={
  constructor: Person,
  name : 'sss',
  age :33,
  friends: ["Shelby", "Court"],
  sayName: function(){
    console.log(this.name);
  }
}

var p1 = new Person();
var p2 = new Person();

p1.friends.push("linq");

console.log(p2.friends);  //"Shelby,"Court","linq"
```

***实例一般都是要有属于自己的全部属性的，因此很少看到有人单独使用原型模式的原因所在***

##4. 组合使用构造函数模式和原型模式

> 创建自定义类型的最常见的方式，就是组合使用构造函数模式与原型模式。兼顾两种模式之长：
+ 支持构造函数传递参数
+ 支持属性方法共享

```javascript
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Shelby", "Court"];
}

Person.prototype = {
  constructor: Person,
  sayName : function(){
    console.log(this.name);
  }
}

var p1 = new Person('linq',32, "Software Engineer");
var p2 = new Person('Greg', 25, "Doctor");
p1.friends.push("Van");

console.log(p1.friends == p2.friends);
console.log(p2.sayName == p2.sayName);
```

***目前在ECMAScript中使用最广泛、认同度最高的一个种创建自定义类型的方法***

##5. 寄生构造函数模式

> 可以使用寄生（parasitic）构造函数模式。这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后在返回新建的对象。

```javascript
function Person(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    console.log(this.name);
  };
  return o;
}

var friend = new Person('Nicholas', 33, 'Software Engineer');
friend.sayName();

```

***这种除了使用new操作符并把使用的包装函数叫做构造函数之外，跟工厂模式其实是一模一样的***

#### 实用场景

> 这种模式可以在特殊情况下用来为对象创建构造函数。例如：特殊的数组对象

```javascript
function SpecialArray(){
  var values = new Array();
  values.push.apply(values, arguments);
  values.toPipedString = function(){
    return this.join("|");
  };
  return values;
}

var colors = new SpecialArray('red', 'blue', 'green');
console.log(colors.toPipedString());

```

***返回的对象与构造函数或者构造函数的原型属性对象之间没有关系；一般情况下不建议使用这种模式***

##6. 稳妥构造函数模式

> 稳妥对象指没有公共属性，其方法也不引用this的对象。适合在一些安全的环境中使用（禁用this和new）或者防止数据被其它应用程序改动时使用。

```javascript
function Person(name,age,job){
  var o = new Object();
  o.sayName = function(){
    console.log(name);
  };
  return o;
}
```
***适合在安全的执行环境中，例如：ADsafe、Caja环境***




