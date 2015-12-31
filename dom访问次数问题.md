#Dom编程优化

1. DOM访问与修改

>>访问DOM元素是有代价的（“过桥费”你懂的），修改元素代价更是昂贵，因为它会导致浏览器重新计算页面的几何变化（重排和重绘）。
当然最坏的情况是在循环中访问或者修改元素，看下面两段代码：
```javascript
var times = 15000;

// code1
console.time(1);
for(var i = 0; i < times; i++) {
  document.getElementById('myDiv1').innerHTML += 'a';
}
console.timeEnd(1);

// code2
console.time(2);
var str = '';
for(var i = 0; i < times; i++) {
  str += 'a';
}
document.getElementById('myDiv2').innerHTML = str;
console.timeEnd(2);   
```
结果第一次运行的时间居然是第二次的千倍！(chrome 版本 44.0.2403.130 m)

1: 2846.700ms 2: 1.046ms

解析：

第一段代码的问题在于，每次循环迭代，该元素都会被访问两次：一次读取innerHTML的值，另一次重写它，也就是说，每次循环都在过桥（重排和重绘将在下一篇讲解）！结果充分表明，访问DOM的次数越多，代码的运行速度越慢。

总结：

能减少DOM访问的次数则尽量减少，尽量留在ECMAScript这端处理。
