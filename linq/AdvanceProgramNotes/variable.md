# Variable Attention

## 全局变量

> 由于Javascript有两个特征，不自觉的创建出全局变量出乎意料的容易。

***1. 你可不需要申明的使用变量，这样创建出来的变量就是全局变量***

```javascript
function sum(a,b){
  result = a + b;       //自动创建全局变量result----window.result可以访问
  return result;
}
```

***2. 使用任务链进行部分var声明变量，根本原因一般是由于任务链赋值是由右向左导致的***

```javascript
function test(){
  var a = b = 11;     //此时b为全局变量
  //由于任务链赋值是由右向左，等同于下面代码
  var a = (b= 11);
  
  //推荐使用下面的定义方法：
  var a,b;
  a = b = 11;
}

```

***3. 忘记Var创建全局变量的副作用***
> 隐式全局变量和明确定义的全局变量还是有些微小的区别的，可以通过delete操作符来识别
+ 隐式全局变量可以用delete删除
+ 显式全局变狼不能用delete删除

```javascript
var global_var = 11;
global_novar = 12;

delete global_var ; //删除失效

delete global_novar ;//删除成功

```

***4. 访问全局变量***
> 在不同的全局环境中执行，不使用硬编码访问全局对象，适用于任何函数层级时访问。

```javascript
var gloabl = (function(){
  return this;
})();
```

## var声明预解析

> 在Javascript中，你可以在函数的任何部位声明多个变量，并且他们就好像在函数顶部声明一样的发挥作用。这种行为称为Hosting（置顶解析/预解析）。**对于Javascript中，你的变量只要在同一作用域（同一函数）中声明，不管先后顺序，都是认为被声明。

```javascript
var name = "outer";
function getName(){
  console.log(name);      //undefined
  var name = "inner";
  console.log(name);      //inner
}
getName();
```

在执行环境中执行函数，代码处理分两个阶段：
+ 第一阶段：形参、函数声明、变量声明。这是一个进入解析和上下文的阶段。
+ 第二阶段：执行具体代码阶段，函数表达式和不合格表示符被创建



