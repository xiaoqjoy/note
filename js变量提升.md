#   js变量提升

//JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部：

```javascript 'use strict';   
   function foo() {   
     var x = 'Hello, ' + y; 
     alert(x);
     var y = 'Bob';
   } 
   foo(); 
//虽然是strict模式，但语句var x = 'Hello, ' + y;并不报错，原因是变量y在稍后申明了。
//但是alert显示Hello, undefined，说明变量y的值为undefined。
//这正是因为JavaScript引擎自动提升了变量y的声明，但不会提升变量y的赋值。

//对于上述foo()函数，JavaScript引擎看到的代码相当于：

 function foo() {   
   var y; // 提升变量y的申明   
   var x = 'Hello, ' + y;
   alert(x);
   y = 'Bob';
 } 
//由于JavaScript的这一怪异的“特性”，我们在函数内部定义变量时，请严格遵守“在函数内部首先申明所有变量”这一规则。
//最常见的做法是用一个var申明函数内部用到的所有变量：

 function foo() {   
   var    x = 1, // x初始化为1     
   y = x + 1, // y初始化为2     
   z, i; // z和i为undefined   
   // 其他语句:   
   for (i=0; i<100; i++) { ... } 
  } 
