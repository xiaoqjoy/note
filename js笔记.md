﻿# js小笔记

//图片自适应css代码

```javascript
background: url(../images/consult.jpg) no-repeat center center;
    width: 100%;
    height: 70%;
    background-size: cover;
```

//想要消除ul li  里面前面的margin  需要在ul上面写margin:0px;padding:0px;

//css向上样式
```javascript
.box{
    position:relative;
}
.box:after, .box:before {
    border: 10px solid transparent;
    border-bottom: 10px solid #f2f2f2;
    width: 0px;
    height: 1px;
    position: absolute;
    top: -21px;
    right: 10px;
    content: ' ';
}
.box:before {
    border-bottom-color: #c1c1c1;
    right: 10px;
    top: -22px;
}
```


location：子对象            
document.location.hash          // #号后的部分       
document.location.host          // 域名+端口号           
document.location.hostname      // 域名       
document.location.href          // 完整URL        
document.location.pathname      // 目录部分         
document.location.port          // 端口号          
document.location.protocol      // 网络协议(http:)      
document.location.search        // ?号后的部分       


encodeURIComponent()     编码(中文，用户名(数字，英文不是编码))

decodeURIComponent()     解码
                
/* 设置滚动条的样式 */
::-webkit-scrollbar{width: 6px;}        
/* 滚动槽 */           
::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);border-radius: 10px;}         
/* 滚动条滑块 */         
::-webkit-scrollbar-thumb{border-radius:10px;background: rgba(0,0,0,0.3);-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.5);}    
/*滚动条hover样式*/          
/*::-webkit-scrollbar-thumb:window-inactive{background: rgba(255,0,0,0.4);}*/       
                


为表格设置合并边框模型：

table{border-collapse:collapse;}
            
<input type="file" accept=".txt">    只 接受TXT文件的上传
            
enctype="multipart/form-data"    form表单提交

                
设置select样式
<!DOCTYPE html>
<html>
  <head>
    <title>Title of the document</title>
    <style>
      select:required:invalid {
      color: #666;
      }
      option[value=""][disabled] {
      display: none;
      }
      option {
      color: #000;
      }
    </style>
  </head>
  <body>
    <h2>Select box with a placeholder</h2>
    <select name="drinks" required>
      <option value="" disabled selected>Choose a drink</option>
      <option value="coffee">Coffee</option>
      <option value="tea">Tea</option>
      <option value="milk">Milk</option>
    </select>
  </body>
</html>


----------------------------------------


relative是不会使元素脱离文档流的，absolute和fixed则会！也就是说，
relative会占据着移动之前的位置，但是absolute和fixed就不会


----------------------------------------


css清除浮动4种方法


因为浮动会使当前标签产生向上浮的效果，同时会影响到前后标签、父级标签的位置及 width height 属性。
而且同样的代码，在各种浏览器中显示效果也有可能不相同


1、父级div定义 height              //只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题

2、结尾处加空div标签 clear:both			//利用css提高的clear:both清除浮动，让父级div能自动获取到高度

3、父级div定义 伪类:after 和 zoom			//IE8以上和非IE浏览器才支持:after，原理和方法2有点类似，zoom(IE转有属性)可解决ie6,ie7浮动问题,建议定义公共类，以减少CSS代码

4、父级div定义 overflow:hidden			//必须定义width或zoom:1，同时不能定义height，使用overflow:hidden时，浏览器会自动检查浮动区域的高度



css zoom	设置或检索对象的缩放比例

-------------------------------------------------

1px边框问题的解决方案

//不同的手机有着不同的像素密度，即window.devicePixelRatio属性，它反应的是物理像素与逻辑像素的比值，IPhone6的dpr是2，也就是说，对于IPhone6来说，CSS的1px显示时会显示为2px的像素


1、伪元素 + tranform: scaleY		//兼容性也比较好的，利用高度为1px的伪元素来模拟边框，在媒体查询中利用tranform: scaleY来进行缩放，
									//需要设置transform: origin(0, 0)保证缩放时伪元素距离父元素的距离



-------------------------------------------------------


```javascript
h1 {
  position: relative;
}

h1:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: red;
  transform: scaleY(1);
  transform-origin: 0 0;
}

@media screen and (min-device-pixel-ratio: 2),  (-webkit-min-device-pixel-ratio: 2) {
  h1:after {
    transform: scaleY(0.5);
  }
}

```									
									
									
2、伪元素 + liner-gradient + sacle      推荐css写法


```javascript
h1:after {
  display: block;
  content: '';
  height: 1px;
  background: linear-gradient(0, #fff, #000);
}

@media screen and (min-device-pixel-ratio: 2),  (-webkit-min-device-pixel-ratio: 2) {
  h1:after {
    transform: scaleY(0.5);
  }
}
```


3、通过viewport实现

```javascript
const dpr = window.devicePixelRatio;

// 创建meta视口标签
const meta = document.createElement('meta') 

// 设置name为viewport
meta.setAttribute('name', 'viewport');

// 动态初始缩放、最大缩放、最小缩放比例
meta.setAttribute(
  'content', 
  `width=device-width, user-scalable=no, initial-scale=${1/dpr-}, maximum-scale=${1/dpr}, minimum-scale=${1/dpr}`
) 
```							
//不单单针对边框了，而是针对所有了，需要整体考虑



--------------------------------------------------


javascript实现一个简单的5秒倒计时

var a = 5; 
function time(){
	a--;
	console.log(a)
   if(a == 0){
      clearInterval(clear)
   } 
}

var clear = setInterval(time, 1000)

-------------------------------------------------------

回调函数的使用场景： 函数里面还需要再执行一层函数，有先后顺序

function c(callback){
	console.log(6666)
	callback();
}

function b(){
	console.log(444)
}

c(b)


function fn(par){
	console.log(par)
}

function aaa(callback, data){
	callback(data)
}

aaa(fn, '我是回调函数')


/*
* 结论：回调函数就是： 外函数调用内函数的过程。
* 首先，studyEnglish应作为study的参数
* 最后，study方法 调用了 studyEnglish方法
* */



let B = (b) => {
	console.log(arguments)
}

B(56)


function A(a){
	console.log(arguments)
}

A(56,78,45)


//JS传的是形参，可以传也可以不传，若方法里没有写参数却传入了参数，该如何拿到参数呢，答案就是arguments了

-------------------------------------------------------

var a = 10;
let f = (n) => n + this.a;

let m = {
  a: 20
}

f.call(m,1)            //11

//箭头函数通过 call() 或 apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响



https://www.cnblogs.com/wangtong111/p/11307231.html



-------------------------------------------------

异步promise的用法示例：

function test(){
	this.query().then(res => {    //这里的res就是2，resolve传过来的 
	  alert(res)			
	}).then(function(){           //用链式调用的方式执行回调函数 then方法可以接受两个回调
	  console.log(res)
	}).then(res => {
	  alert(res)
	},function(reason,res){     //针对reject失败的回调处理
	  console.log(reason)    //fail
	}).catch(function(reason,res){
	  console.log(reason)    //把错误原因传到了reason参数中
	})
},

function query(){     //返回一个Promise对象，在原型链上then、catch方法
	return new Promise(function(resolve, reject){
	  var num = Math.ceil(Math.random()*20);
	  if(num <= 10){
		resolve(num)
	  }else{
		reject('fail')
	  }
	})
}

	  
Promise对象代表一个异步操作，
  
有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
	
	
	
-------------------------------------------


split() 方法用于把一个字符串分割成字符串数组


"2:3:4:5".split(":")	//将返回["2", "3", "4", "5"]
"|a|b|c".split("|")	//将返回["", "a", "b", "c"]


----------------------------------------------


js浅拷贝与深拷贝


js浅拷贝    

1、for···in只循环第一层   
2、Object.assign方法
3、直接用=赋值



深拷贝的方法

1、采用递归去拷贝所有层级属性
2、通过JSON对象来实现深拷贝 缺点： 无法实现对对象中方法的深拷贝，会显示为undefined
3、通过jQuery的extend方法实现深拷贝
4、使用扩展运算符实现深拷贝


--------------------------------------------------



多维数组的去重

var temp = []
function uniq(array){
  var result = []
  recursion(array) // 调用递归将多维数组变为一维数组再去重
  for (var i = 0, len = temp.length;i < len;i ++){
    for(var j = i + 1; j < len;j ++){
      if (temp[i] === temp[j]) {
        i ++
        j = i
      }
    }
    result.push(temp[i])
  }
  return result
}
 
// 新增递归函数
function recursion(array){
  var len = array.length
  for (var i = 0; i < len ;i ++) {
    if (typeof array[i] == 'object') { // 如若数组元素类型是object，则递归
      recursion(array[i])
    } else {
      temp.push(array[i]) // 否则添加到temp数组中
    }
  }
}
var arr = [1,[2,3],[3,2,[1,6,[3,5,'3']]]]
console.log(uniq(arr))

//[2, 1, 6, 3, 5, "3"]


--------------------------------------------------


异步任务又可以分为微任务和宏任务


微任务一般包括：原生Promise(有些实现的promise将then方法放到了宏任务中)、process.nextTick、Object.observe(已废弃)、 MutationObserver   先


宏任务一般包括：整体代码script，setTimeout，setInterval、setImmediate   后




--------------------------------------------------


JS查询一个对象的所有属性

var p = '';
for(var i in obj){
     p += "属性：" + i + ";"
 }



---------------------------------------------------


for in总是得到对像的key或数组,字符串的下标,

而for of和forEach一样,是直接得到值 

结果for of不能对象用


-------------------------------------

https://www.lodashjs.com/docs/lodash.find

_.js   

_.filter(users, function(o) { return !o.active; });     //找出所有的数组集合































