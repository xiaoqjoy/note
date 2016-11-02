# window对象

> BOM的核心对象是window，它表示浏览器的一个实例。在浏览器中，window对象有双重角色：
+ 通过JavaScript访问浏览器窗口的一个接口
+ 又是ECMAScript规定的Global对象。这意味着在网页中定义的任何一个对象、变量和函数，都以window作为其Global对象，因此有权访问parseInt等全局方法。

##1. 全局作用域

> 由于window对象同时扮演的ECMAScript中的Global对象的角色，因此所有在全局作用域中声明的变量、函数都会变成window对象的属性和方法。例如：

```javascript
var age = 29;
function sayAge(){
	console.log(this.age);
}
console.log(window.age);		//29
sayAge();				//29
window.sayAge();			//29

```

我们在全局作用域中定义了一个变量age和一个函数sayAge()，他们都自动归在了window对象的名下，于是我们可以通过window访问变量age和函数sayAge。由于sayAge存在于全局作用域中，因此this.age中this相当于window对象。

> 全局变量与全局属性的最基本区别：全局变量不能通过delete操作符删除，而直接在window中定义的属性可以。

```javascript
var age = 29;
window.color = 'red';

// 在IE<9 时抛出错误，在其它所有的浏览器中都返回了false
delete window.age;

// 在IE<9 时抛出错误，在其它所有的浏览器中都返回了true
delete window.color;

console.log(window.age);	//29
console.log(window.color);	//undefined

```

##2. 窗口关系及框架

> 如果页面中包含框架，则每个框架都拥有自己的window对象，并且保存在frames集合中。在frames集合中，可以通过数值索引（从0开始，从左到右，从上到下）或者框架名称来访问相应的window对象。

```
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<title>无标题</title>
</head>
<frameset rows='160,*' name="topframe">
	<frame src="frame.html"></frame>
	<frameset cols="50%,50%">
		<frame src='anotherframe.html'></frame>
		<frame src='yetanotherframe.html'></frame>
	</frameset>
</frameset>
</html>

```

上述例子中，可以通过window.frames[0]或者window.frames['topframe']来引用上方的框架。不过您最好使用top.frames来访问最外层的框架。

> 对于window框架相关术语，有几个特殊的对象：
+ top 始终指向最外层的window对象
+ seft 始终指向当前的window对象
+ parent 始终指向当前window对象的父window对象。


##3. 窗口位置

> 用来确定和修改window对象位置的属性和方法有很多，IE、Safari、Opera和Chrome都提供了screenLeft和screenTop属性。Firefox则在screenX和screenY属性中提供相同的窗口位置信息。

```javascript
var left = (typeof window.screenX === 'number' )?window.screenX:window.screenLeft;

var top = (typeof window.screenY === 'number')?window.screenY:window.screenTop;

```

常见配合使用的有坐标地点：
+ moveTo(newX, newY)
+ moveBy(offsetX, offsetY)

##4. 窗口大小

> IE9+、FireFox、Safari、Opera和Chrome均提供了4个属性：innerWidth、innerHeight、outerWidth、outerHeigth四个属性，**只是不同浏览器中属性意义不一致**。

常见视口获取方法：
+ document.documentElement.clientHeight/clientWidth （除IE6等不支持）
+ document.body.clientWidth/clientHeight（IE6等特有）

```javascript

var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
if(typeof pageWidth != 'number'){
	if(document.compatMode == 'CSS!Compat'){
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	}else{
		pageWidth = document.body.clientWidth;
		pageHeigth = document.body.clientHeigth;
	}
}

//上面代码获取了视口的高宽值
```

> 调整整个浏览器窗口的大小
+ resizeTo(newWidth, newHeight)
+ resizeBy(offsetWidth, offsetHeigth)

```javascript
window.resizeTo(100,100);			//100,100
window.resizeBy(100,50);			//200,150
window.resizeTo(300,300);			//300,300
```

注意：**这两个方法与移动窗口位置的方法类似，也有可能被浏览器禁用，另外不适合框架**

##5. 导航和打开窗口

> window.open既可以导航到一个特定的URL，也可以打开一个新的浏览器窗口。可以接受四个参数：
+ 要加载的URL
+ 窗口目标
+ 一个特性字符串
+ 新页面是否取代浏览器历史中当前加载页面的布尔值。

```javascript
//等同于<a href="http://www.wrox.com" target="topFrame"></a>
window.open("http://www.wrox.com", "topFrame");
```

第二个参数也可以是下列任何一个特殊的窗口名称：**_top、_self、_parent、_blank**

第三个参数：


|                             设 置                 |                                    值                                      |                         说 明                  |
|---------------------------------------|--------------------------------------------------------|---------------------------------------------|
| fullscreen                                              |                     yes或no                |表示浏览器窗口是否最大化。仅限IE              |
| height                                                    |数值                              |  表示新窗口的高度。不能小于100             |
| left                                                          |数值                             |  表示新窗口的左坐标。不能是负值             |
|location                                                  | yes或no                      |  表示是否在浏览器窗口中显示地址栏。不同浏览器的默认值不同。如果设置为no，地址栏可能会隐藏，也可能会被禁用（取决于浏览器）             |
| menubar                                               |yes或no                      |  表示是否在浏览器窗口中显示菜单栏。默认值为no             |
| resizable                                               | yes或no                      |  表示是否可以通过拖动浏览器窗口的边框改变其大小。默认值为no             |
| scrollbars                                              |yes或no                      |  表示如果内容在视口中显示不下，是否允许滚动。默认值为no             |
| status                                                    |yes或no                      |  表示是否在浏览器窗口中显示状态栏。默认值为no             |
| toolbar                                                  | yes或no                      |  表示是否在浏览器窗口中显示工具栏。默认值为no             |
|  top                                                       | 数值                            |  表示新窗口的上坐标。不能是负值             |
|  width                                                    |数值                            | 表示新窗口的宽度。不能小于100             |


> window.open() 方法会返回一个指向新窗口的引用。引用的对象与其他window对象大致相似，但我们可以对其做更多的控制。
+ 窗口大小和位置移动
+ 关闭窗口


### 安全限制

> 广告商利用弹窗引发安全问题或带来无限弹窗的不良体验。

**因此，现在大部分的浏览器都对window.open或多或少有安全限制，建议少用**

```javascript
// 用来检验是否已限制弹窗
function isBlockPopup(){
	var blocked = false;
	try{
		var win = window.open('http://www.baidu.com', '_blank');
		if(!win){
			blocked = true;
		}
	}catch(ex){
		blocked = true;
	}
	return blocked;
}
```

##6. 间歇调用和超时调用

> JavaScript是单线程语言，但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行。
+ setTimeout 超时调用, 第一个参数handler；第二个参数时delay
+ setInterval   间歇调用，第一个参数handler；第二个参数时delay


说明：**JavaScript 是一个单线程序的解释器，因此一定时间内只能执行一段代码。为了控制要执行的代码，就有一个JavaScript任务队列。这些任务会按照将它们添加到队列的顺序执行**。 setTimeout()的第二个参数告诉 JavaScript 再过多长时间把当前任务添加到队列中。如果队列是空的，那么添加的代码会立即执行；如果队列不是空的，那么它就要等前面的代码执行完了以后再执行。

```javascript
var timeoutid = setTimeout(function(){
	console.log('hello world！');
}, 1000);
//注意：把它取消
clearTimeout(timeoutid);
```

 setInterval()方法同样也会返回一个间歇调用ID，该ID可用于在将来某个时刻取消间歇调用。要取消尚未执行的间歇调用，可以使用 clearInterval()方法并传入相应的间歇调用 ID。取消间歇调用的重要性要远远高于取消超时调用


```javascript
var num = 0;
var max = 10;
var intervalId = null;
function incrementNumber() {
	num++;
	//如果执行次数达到了 max 设定的值，则取消后续尚未执行的调用
	if (num == max) {
		clearInterval(intervalId);
		alert("Done");
	}
}
intervalId = setInterval(incrementNumber, 500);

```

***一般认为，使用超时来模拟间歇调用的是一种最佳的模式。在开发环境中很少真正的间歇调用，原因是后一个间歇调用可能会在前一个间歇调用结束前启动。建议最好不要使用间歇调用***

##7. 系统对话框

+ alert()
+ confirm()
+ prompt()
+ print()
+ find()


**浏览器对这些对话框也有一些用户自定义限制，一般真正的项目中很少使用**










