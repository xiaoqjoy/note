# 高性能JavaScript DOM编程以及重排与重绘

本篇主要源自于：<http://developer.51cto.com/art/201508/488053.htm>

附加html页面的渲染过程：<http://www.cnblogs.com/yuezk/archive/2013/01/11/2855698.html>

> 我们知道，DOM是用于操作XML 和HTML文档的应用程序接口，用脚本进行DOM操作的代价很昂贵。有个贴切的比喻，把DOM和JavaScript（这里指ECMScript）各自想 象为一个岛屿，它们之间用收费桥梁连接，ECMAScript每次访问DOM，都要途径这座桥，并交纳“过桥费”,访问DOM的次数越多，费用也就越高。 因此，推荐的做法是尽量减少过桥的次数，努力待在ECMAScript岛上。我们不可能不用DOM的接口，那么，怎样才能提高程序的效率？

## Dom编程优化

###1. DOM访问与修改

> 访问DOM元素是有代价的（“过桥费”你懂的），修改元素代价更是昂贵，因为它会导致浏览器重新计算页面的几何变化（重排和重绘）。

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

***结果第一次运行的时间居然是第二次的千倍！(chrome 版本 44.0.2403.130 m)***

1: 2846.700ms
2: 1.046ms

解析：

  第一段代码的问题在于，每次循环迭代，该元素都会被访问两次：一次读取innerHTML的值，另一次重写它，也就是说，每次循环都在过桥（重排和重绘将在下一篇讲解）！结果充分表明，访问DOM的次数越多，代码的运行速度越慢。

总结：

***能减少DOM访问的次数则尽量减少，尽量留在ECMAScript这端处理。***

###2. HTML集合 & 遍历DOM

> 操作DOM另一个耗能点就是遍历DOM，一般我们会收集一个HTML集合，比如用getElementsByTagName()，或者用document.links等，我想大家对此都不陌生。收集的结果是一个类似数组的集合，它处于一种**“实时状态”**实时存在。
+ 当底层文档对象更新时，它也会自动更新
+ 遍历、访问属性方法操作是实时查询Dom结构
+ 集合使用时自动变化


```
<body>
  <ul id='fruit'>
    <li> apple </li>
    <li> orange </li>
    <li> banana </li>
  </ul>
</body>
```

```javascript
var lis = document.getElementsByTagName('li'); 
var peach = document.createElement('li'); 
peach.innerHTML = 'peach'; 
document.getElementById('fruit').appendChild(peach); 
console.log(lis.length); // 4
```

而这正是低效之源！

很简单，跟数组的优化操作一样，缓存个length变量就ok了（***读取一个集合的length比读取一个普通数组的lengh要慢很多，因为每次都要查询***）：

```javascript

console.time(0);
var lis0 = document.getElementsByTagName('li');
var str0 = '';
for(var i = 0; i < lis0.length; i++) {
  str0 += lis0[i].innerHTML;
}
console.timeEnd(0);


console.time(1);
var lis1 = document.getElementsByTagName('li');
var str1 = '';
for(var i = 0, len = lis1.length; i < len; i++) {
  str1 += lis1[i].innerHTML;
}
console.timeEnd(1);

```

我们看看性能提升能有多少？

0: 0.974ms

1: 0.664ms

而《高性能JavaScript》提出了另一个优化策略，它指出，“由于遍历数组比遍历集合快，因此如果先将集合元素拷贝到数组中，那么访问它的属性会更快”


###3. querySelector()和querySelectorAll()

> 前者返回一个第一个元素（注意，**它们的返回值不像HTML集合一样会动态变化**），后者返回匹配的数组。

其实并不是所有时候它的性能都优于前者的HTML集合遍历：

```javascript
console.time(1);
var lis1 = document.getElementsByTagName('li');
console.timeEnd(1);

console.time(2);
var lis2 = document.querySelectorAll('li');
console.timeEnd(2);

// 1: 0.038ms
// 2: 3.957ms
```

***它是类似CSS的选择方法，所以在做组合选择的时候，效率会提升，又方便***。比如做如下的组合查询：

```javascript

var elements = document.querySelectorAll('#menu a');
var elements = document.querySelectorAll('div.warning, div.notice');

```



## 重排和重绘

> 浏览器下载完页面中的所有组件——HTML标记、JavaScript、CSS、图片之后会解析生成两个内部数据结构——DOM树和渲染树。
+ DOM树表示页面结构，渲染树表示DOM节点如何显示。DOM树中的每一个需要显示的节点在渲染树种至少存在一个对应的节点（隐藏的DOM元素disply值为none 在渲染树中没有对应的节点）。
+ 渲染树中的节点被称为“帧”或“盒",符合CSS模型的定义，理解页面元素为一个具有填充，边距，边框和位置的盒子。一旦DOM和渲染树构建完成，浏览器就开始显示（绘制）页面元素。


###1. 什么是重排和重绘

> 当DOM的变化影响了元素的几何属性（宽或高），浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。**这个过程称为重排***。完成重排后，浏览器会重新绘制受影响的部分到屏幕，**该过程称为重绘**。

  由于浏览器的流布局，对渲染树的计算通常只需要遍历一次就可以完成。***但table及其内部元素除外，它可能需要多次计算才能确定好其在渲染树中节点的属性，通常要花3倍于同等元素的时间。这也是为什么我们要避免使用table做布局的一个原因***
  
***并不是所有的DOM变化都会影响几何属性，比如改变一个元素的背景色并不会影响元素的宽和高，这种情况下只会发生重绘***

###2. 重排和重绘的代价究竟多大

> 重排和重绘的代价有多大？我们再回到前文那个过桥的例子上，细心的你可能会发现了，千倍的时间差并不是由于“过桥”一手造成的，每次“过桥”其实都伴随着重排和重绘，而耗能的绝大部分也正是在这里!

```javascript
var times = 15000;

// code1 每次过桥+重排+重绘
console.time(1);
for(var i = 0; i < times; i++) {
  document.getElementById('myDiv1').innerHTML += 'a';
}
console.timeEnd(1);

// code2 只过桥
console.time(2);
var str = '';
for(var i = 0; i < times; i++) {
  var tmp = document.getElementById('myDiv2').innerHTML;
  str += 'a';
}
document.getElementById('myDiv2').innerHTML = str;
console.timeEnd(2);

// code3 
console.time(3);
var _str = '';
for(var i = 0; i < times; i++) {
  _str += 'a';
}
document.getElementById('myDiv3').innerHTML = _str;
console.timeEnd(3);


// 1: 2874.619ms
// 2: 11.154ms
// 3: 1.282ms

```

###3. 重排何时发生

> 很显然，每次重排，必然会导致重绘，那么，重排会在哪些情况下发生？
+ 添加或者删除可见的DOM元素
+ 元素位置改变
+ 元素尺寸改变
+ 元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
+ 页面渲染初始化（这个无法避免）
+ 浏览器窗口尺寸改变

这些都是显而易见的，或许你已经有过这样的体会，***不间断地改变浏览器窗口大小，导致UI反应迟钝***（某些低版本IE下甚至直接挂掉），现在你可能恍然大悟，没错，正是一次次的重排重绘导致的！
  
  
###4. 渲染树变化的排队和刷新

思考下面代码：

```javascript

var ele = document.getElementById('myDiv');
ele.style.borderLeft = '1px';
ele.style.borderRight = '2px';
ele.style.padding = '5px';

```

  乍一想，元素的样式改变了三次，每次改变都会引起重排和重绘，所以总共有三次重排重绘过程，但是浏览器并不会这么笨，它会把三次修改“保存”起来，**即：操作会缓存在渲染队列中待处理***（大多数浏览器通过队列化修改并批量执行来优化重排过程），一次完成！

> 但是，有些时候你可能会（经常是不知不觉）强制刷新队列并要求计划任务立即执行。获 取布局信息的操作会导致队列刷新，比如：
+ offsetTop, offsetLeft, offsetWidth, offsetHeight
+ scrollTop, scrollLeft, scrollWidth, scrollHeight
+ clientTop, clientLeft, clientWidth, clientHeight
+ getComputedStyle() (currentStyle in IE)

```javascript

var ele = document.getElementById('myDiv');
ele.style.borderLeft = '1px';
ele.style.borderRight = '2px';

// here use offsetHeight,会自动强制刷新重绘重排队列执行
// ...
ele.style.padding = '5px';

```

  因为offsetHeight属性需要返回最新的布局信息，因此浏览器不得不执行渲染队列中的“待处理变化”并触发重排以返回正确的值（即使队列中改变的样式属性和想要获取的属性值并没有什么关系）。
+ 一旦offsetHeight属性被请 求了，队列就会立即执行一次重排与重绘。
+ padding重新改变时，会被缓存到最后又会又一次重排与重绘。

***总结：尽量不要在布局信息改变时做查询。***

###5. 最小化重排和重绘

  我们还是看上面的这段代码：

```
var ele = document.getElementById('myDiv');
ele.style.borderLeft = '1px';
ele.style.borderRight = '2px';
ele.style.padding = '5px';

```

  三个样式属性被改变，每一个都会影响元素的几何结构，虽然大部分现代浏览器都做了优化，只会引起一次重排。***但是像上文一样，如果一个及时的属性被请求，那么就会强制刷新队列，而且这段代码四次访问DOM***。
  
  一个很显然的优化策略就是把它们的操作合成一次，这样只会修改DOM一次：
  
```javascript
var ele = document.getElementById('myDiv');

// 1. 重写style
ele.style.cssText = 'border-left: 1px; border-right: 2px; padding: 5px;';

// 2. add style
ele.style.cssText += 'border-;eft: 1px;'

// 3. use class
ele.className = 'active';

```

###6. fragment元素的应用

看如下代码，考虑一个问题：

```
<ul id='fruit'>
  <li> apple </li>
  <li> orange </li>
</ul>

```

如果代码中要添加内容为peach、watermelon两个选项，你会怎么做？

```javascript

var lis = document.getElementById('fruit');
var li = document.createElement('li');
li.innerHTML = 'apple';
lis.appendChild(li);

var li = document.createElement('li');
li.innerHTML = 'watermelon';
lis.appendChild(li);

```

  很容易想到如上代码，但是很显然，重排了两次，怎么破？前面我们说了，**隐藏的元素不在渲染树中，太棒了，我们可以先把id为fruit的ul元素隐藏（display=none)，然后添加li元素，最后再显示，但是实际操作中可能会出现闪动，原因这也很容易理解**。
  
  fragment元素就专门用来解决此问题：
  
```javascript
var fragment = document.createDocumentFragment();

var li = document.createElement('li');
li.innerHTML = 'apple';
fragment.appendChild(li);

var li = document.createElement('li');
li.innerHTML = 'watermelon';
fragment.appendChild(li);

document.getElementById('fruit').appendChild(fragment);

```


***文档片段是个轻量级的document对象，它的设计初衷就是为了完成这类任务——更新和移动节点***

  文档片段的一个便利的语法特性是当你附加一个片断到节点时，**实际上被添加的是该片断的子节点，而不是片断本身**。只触发了一次重排，而且只访问了一次实时的DOM。


###7. 让元素脱离动画流

  用展开/折叠的方式来显示和隐藏部分页面是一种常见的交互模式。它通常包括展开区域的几何动画，并将页面其他部分推向下方。

  一般来说，重排只影响渲染树中的一小部分，但也可能影响很大的部分，甚至整个渲染树。浏览器所需要重排的次数越少，应用程序的响应速度就越快。因此 当页面顶部的一个动画推移页面整个余下的部分时，会导致一次代价昂贵的大规模重排，让用户感到页面一顿一顿的。渲染树中需要重新计算的节点越多，情况就会 越糟。
  
***使用以下步骤可以避免页面中的大部分重排***：
+ 使用绝对位置定位页面上的动画元素，将其脱离文档流
+ 让元素动起来。当它扩大时，会临时覆盖部分页面。但这只是页面一个小区域的重绘过程，不会产生重排并重绘页面的大部分内容。
+ 当动画结束时恢复定位，从而只会下移一次文档的其他元素



###8. 总结

> 重排和重绘是DOM编程中耗能的主要原因之一，平时涉及DOM编程时可以参考以下几点：

+ 尽量不要在布局信息改变时做查询（会导致渲染队列强制刷新）
+ 同一个DOM的多个属性改变可以写在一起（减少DOM访问，同时把强制渲染队列刷新的风险降为0）
+ 如果要批量添加DOM，可以先让元素脱离文档流，操作完后再带入文档流，这样只会触发一次重排（fragment元素的应用）
+ 将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位。
