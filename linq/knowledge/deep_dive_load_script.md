# 深入解析脚本加载

参考文献：[Deep dive into the murky waters of script loading](http://www.html5rocks.com/en/tutorials/speed/script-loading/)

#### 介绍

这篇文章将教你在浏览器中下载脚本并加载它，理论上来说，在浏览器上下载并加载脚本应该是一件很简单的事情。但要做到最快、产生最少混乱的方式去加载脚本，就像是WhatWG的一个心灵创伤一样。很难以办到，今天就让我们来讨论下关于这件非常有趣的主题，主要从脚本加载几方面入手：
+ (1)、并行下载js脚本文件
+ (2)、允许顺序加载js文件
+ (3)、不阻塞html解析和页面中其它资源下载


总结：***不阻塞html页面解析，并行下载资源文件且允许控制脚本加载顺序，就是脚本加载性能最好的方案***

## html直接包含<script>

从HTML和JS的历史长流来说，js文件直接采用<script src=''/>引入脚本并加载它是最常见的方式，也是最稳定的方式。

#### Head 引入脚本

```
<head>
	<script src='//other-domain.com/1.js'></script>
	<script src='2.js'></script>
</head>
```

该方案是早期常见方案。在支持IE8+支持并行下载的资源文件的浏览器中，能够**并行下载，顺序执行脚本文件。但会阻塞html页面的解析**。

#### Body结束前引入脚本

```
<body>
	<div></div>
	<div></div>
	<div></div>
	<script src='//other-domain.com/1.js'></script>
	<script src='2.js'></script>
</body>

```

上一种方案改进版本，最常用的方案之一。body标签是html所有内容大容器，结束前引入js文件。既能保证dom元素基本准备完成，又能保证不阻塞页面渲染。

#### IE Defer解决方案

```
<head>
	<script defer src='//other-domain.com/1.js'></script>
	<script defer src='2.js'></script>
</head>

```

对于IE来说，defer是一个很好的解决方案。加上defer="true"，延迟到DomContentLoaded前按照脚本添加顺序执行脚本，并行下载且不阻塞html页面解析。


按照脚本添加顺序执行脚本（理想状态），在IE6-IE10，如果在1.js中操作Dom元素，顺序执行会被打乱。

```javascript
// 1.js文件内容
(function(){
	var newDom = document.createElement('div');
	newDom.setAttribute('class', 'ta');
	newDom.innerHTML = "这是我的脚本内容";
	document.getElement('#id').append(newDom);

	var count = 0;
	console.log(count);
}());

```

***defer虽然很棒，但在IE6-IE10中存在的这个Bug，影响了按照脚本元素添加顺序执行脚本，可以说是个巨坑（可惜了）***


#### H5 async

对于高端浏览器来说，async可谓是如其含义，真正的做到并行下载、异步执行和不阻塞html页面渲染。目前支持的浏览器：
+ IE10+
+ FF3.6+
+ Chrome8+
+ Safari5.1+
+ Opera15+
+ ISO Safari5.1+

```
<head>
	<script src="//other-domain.com/1.js" async></script>
	<script src="2.js" async="async"></script>
</head>
```

这种玩法，不管放置到Head还是Body任何地方，都是并行下载，下载完毕后立即执行且不阻塞html解析

***async是支持H5浏览器中比较完美加载方案，然而这种写法不支持控制脚本加载顺序***

## 动态<script>插入

html中写<script>标签虽然有它的优势，但总有它的不足，况且写<script>标签必须是提前写好，不管它是什么时候使用，当下很多框架都讲究按需加载，例如：Labjs、Requirejs、Seajs等。这样可以优化页面加载载入速度、轻量化页面加载等诸多优势。

```javascript
var script = document.createElement('script');
if(script.readyState){//IE
	script.onreadystatechange = function(){
		if(script.readyState === 'loaded' || script.ready === 'completed'){
			script.onreadystatechange = null;
			//加载完成完毕
		}
	}; 
}else{
	script.onload = function(){
		//加载并执行完毕
	}
}
script.src='1.js';
(document.head || document.getElementsByTagName('head')[0]).appendChild(script);

```

上述Demo是动态插入<script>标签加载js脚本的经典写法，优势如下：
+ 动态加载<script>标签，不在html页面解析流中，***不存在阻塞html页面渲染问题***。
+ 多个动态加载<script>相互之间没有任何关系，平行下载脚本也没有任何问题
+ 脚本下载完成后，立即执行脚本（异步执行脚本）
+ 所有浏览器都兼容


#### 加async="false"动态脚本

上述加载脚本方案很完美，但如果脚本之间存在依赖关系，不能控制脚本的执行顺序。因此，又有了改进方案：

```javascript
var script = document.createElement('script');
script.onload=script.onreadystatechange=function(){
	if(!script.readyState || script.readyState === 'loaded' || script.readyState === 'completed'){
		script.onreadystatechange = null;
		//加载完成
	}
}
script.setAttribute('async', 'false');
script.src='1.js';
(document.head || document.getElementsByTagName('head')[0]).appendChild(script);

```

加上async=false,后具有动态脚本优势，又会按照脚本插入顺序执行脚本。没种不足仅有支持async浏览器有效，但依然是最好的方案之一。

备注：***Firefox 和 Opera 的所有版本都支持该方法，对于不支持 async 属性的版本，它们对于动态添加的脚本会按照添加顺序来执行***。


## 常见Hacks解决方案

#### IE src Hacks

在IE6-IE10中有个有趣的事情，script元素只要设置src属性会自动去下载脚本，**不需要加入到HTML页面**

```javascript
var script = document.createElement('script');
script.onreadystatechange = function(){
	if(script.readyState === 'loaded' || script.readyState === 'completed'){
		script.onreadystatechange = null;
	}
};
script.src = '2.js';	//设置完成后立马开始下载脚本文件，并且不会自动执行脚本
```

#### link subresource 与prefetch预加载


```javascript
<link rel="subresource" href="//other-domain.com/1.js">
<link rel="subresource" href="2.js">
```

## 组合技巧

首先，我们为实现预加载而增加子资源声明：

```
<link rel="subresource" href="//other-domain.com/1.js">
<link rel="subresource" href="2.js">
```

然后，在文档头部中使用行内 JavaScript 来加载脚本，使用 async=false，备选方案是基于 IE 的 readystate脚本加载，或者选择延迟加载。
```
var scripts = [
  '1.js',
  '2.js'
];
var src;
var script;
var pendingScripts = [];
var firstScript = document.scripts[0];


// 监视 IE 中的脚本加载
function stateChange() {
  // 尽可能多的按顺序执行脚本
  var pendingScript;
  while (pendingScripts[0] && pendingScripts[0].readyState == 'loaded') {
    pendingScript = pendingScripts.shift();
    // 避免该脚本的加载事件再次触发(比如修改了 src 属性)
    pendingScript.onreadystatechange = null;
    // 不能使用 appendChild，在低版本 IE 中如果元素没有闭合会有 bug
    firstScript.parentNode.insertBefore(pendingScript, firstScript);
  }
}

// 循环脚本地址
while (src = scripts.shift()) {
  if ('async' in firstScript) { // 现代浏览器
    script = document.createElement('script');
    script.async = false;
    script.src = src;
    document.head.appendChild(script);
  }
  else if (firstScript.readyState) { // IE<10
    // 创建一个脚本并添加进待执行队列中
    script = document.createElement('script');
    pendingScripts.push(script);
    // 监听状态改变
    script.onreadystatechange = stateChange;
    // 必须在添加 onreadystatechange 监听后设置 src
    // 否则会错过缓存脚本的加载事件
    script.src = src;
  }
  else { // 退化使用延迟加载
    document.write('<script src="' + src + '" defer></'+'script>');
  }
}
```

相比普通的加载方式，这么做是否值得？如果你已经使用 JavaScript 来有选择的加载脚本，就像 BBC 那样，你会因为提前触发这些脚本的下载而得到好处。否则的话，还是把脚本放到body 底部吧。
