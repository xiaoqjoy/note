# 关于instanceof 与 typeof 类型检测

## typeof 一元操作符

> typeof是一元运算符，用来返回操作数类型的字符串.

|val类型          | 结果                 |
|-----------------|----------------------|
|Undefined        |"undefined"           |
|Boolean          |"boolean"             |
|Number           |"number"              |
|String           |"string"              |
|Null             |"object"              |
|Array            |"object"              |
|Date             |"object"              |
|RegExp           |"object"              |
|Object           |"object"              |
|Function         |"function"            |

从上述结果可看出：typeof检测类型值选项：
+ "undefined"
+ "boolean"
+ "number"
+ "string"
+ "object"
+ "function" 存在兼容性问题（IE11）

而对于Object类型[原生对象、函数、null]是无法区分开来的，因此它并不能用来识别对象类型***

## instanceof 

> 用来测试一个对象在其构造函数原型链中是否具有prototype属性



#### 语法 

```
object instanceof Constructor
```

### 描述

instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上

```javascript
// 定义构造函数
function C(){} 
function D(){} 

var o = new C();

// true，因为 Object.getPrototypeOf(o) === C.prototype
o instanceof C; 

//false 因为null对象的构造函数为Null,并不存在Object.prototype
null instanceof Object ;

```

### 基本类型包装

> 为了方便操作基本类型值，ECMAScript还提供了3个特殊的引用类型：
> + Boolean
> + String
> + Number

特点：
+ 创建上述3中引用类型实例
+ 在实例上调用指定的方法
+ 销毁这个实例

它与其它引用类型最大区别：***实例的生存期（立即销毁和保留）***

```javascript
var str = 'test linq';
var strObj = new String('this is hospital');

//false,它属于基本类型，虽然在调用方法时,
//会自动创建一个对应的基本包装类型的对象。但立马就会自动销毁
//所以类型判断是，依然是基本类型
str instanceof Object

//true，它是属于引用类型对象
strObj instanceof Object
```


### 特殊情况

在正常环境中，通常都具有global提供的**单体内置对象**，一般来说原始类型的
Construct.prototype不会轻易发生变化。

但有两点需要注意：
+ Object.__proto__黑魔法 
+ 不同iframe之间的单体对象也不一致

因此：采用instanceof判断是否为一个对象也不是特别合适，
毕竟强依赖于构造函数，遇到上述2中特殊情况就不灵了

## Object.prototype.toString.call 

当调用toString方法，采用如下步骤：
+ 如果this值是undefined，返回"[object Undefined]"
+ 如果this值是null，返回"[object Null]"
+ 其它情况按照如下规则玩耍
  - 令this所属[[class]]内部属性的值
  - 返回"[object Constructor]"

```javascript
//"[object Array]"
Object.prototype.toString.call(Array);

//"[object Null]"
Object.prototype.toString.call(null);
```

### jQuery.type实现

```javascript
var class2type = {};

"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function (e, i) {
    class2type["[object " + e + "]"] = e.toLowerCase();
});

//当然为了兼容IE低版本，forEach需要一个polyfill，不作细谈了。
function _typeof(obj) {

    if (obj == null) {
        return String(obj);
    }

    return typeof obj === "object" || typeof obj === "function" ?
    class2type[class2type.toString.call(obj)] || "object" : typeof obj;
}
```

总结：***利用Object.prototype.toString.call识别已知构造函数对象，利用typeof识别基础数据类型***










