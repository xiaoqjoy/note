# Document

> JavaScript通过Document类型表示文档。在浏览器中，document对象是HTMLDocument的一个实例，表示整个HTML页面。
+ document对象是window对象的一个属性
+ nodeType的值为9
+ nodeName的值为"#document"
+ nodeValue的值为null
+ parentNode的值为null
+ ownerDocument的值为null
+ 其子节点DocumentType、Element（最多一个）、ProcessingInstruction、Comment。


##1. 文档的子节点

> DOM 标准规定 Document 节点的子节点可以是 DocumentType、 Element、 ProcessingInstruction 或Comment，但还有两个内置的访问其子节点的快捷方式

+ documentElement  直接取元素节点：html节点

+ childNodes  子节点

```javascript
var html = document.documentElement;
console.log(html === document.childNodes[0]);		//true
console.log(html === document.firstChild);			//true,不同浏览器存在兼容性问题

```

+ document.body 直接取body元素

+ document.doctype  直接取文档类型节点：<!DOCTYPE>

#### 浏览器对 document.doctype 的支持差别很大，可以给出如下总结：

+ IE8 及之前版本：如果存在文档类型声明，会将其错误地解释为一个注释并把它当作 Comment节点；而 document.doctype 的值始终为 null。

+ IE9+及 Firefox：如果存在文档类型声明，则将其作为文档的第一个子节点； document.doctype是一个 DocumentType 节点，也可以通过 document.firstChild 或 document.childNodes[0]访问同一个节点。

+ Safari、 Chrome 和 Opera：如果存在文档类型声明，则将其解析，但不作为文档的子节点。 document.doctype 是一个 DocumentType 节点，但该节点不会出现在 document.childNodes 中。


### 注释节点浏览器处理差异

> 不同的浏览器在是否解析注释以及能否正确处理它们等方面，也存在很大差异。

```
<!--第一条注释 -->
<html>
	<body>
	</body>
</html>
<!--第二条注释 -->

```

看起来这个页面应该有 3 个子节点：注释、 <html>元素、注释。实中的浏览器在处理位于<html>外部的注释方面存在如下差异：
+ IE8 及之前版本、 Safari 3.1 及更高版本、 Opera 和 Chrome 只为第一条注释创建节点，不为第二条注释创建节点。结果，第一条注释就会成为 document.childNodes 中的第一个子节点。
+ IE9 及更高版本会将第一条注释创建为 document.childNodes 中的一个注释节点，也会将第二条注释创建为 document.childNodes 中的注释子节点。
+ Firefox 以及 Safari 3.1 之前的版本会完全忽略这两条注释。


##2. 文档信息

> 作为 HTMLDocument 的一个实例， document 对象还有一些标准的 Document 对象所没有的属性：
+ title 标题
+ URL  当前文档的ulr
+ referrer  链接到当前页面的那个URL
+ domain  当前文档的域名

```javascript
console.log(document.URL === location.href);		//true
console.log(document.domain === location.hostname);	//正常情况下是true，如果人为的修改就不一定了。

document.title = '当前文档页的title';		//修改它不会影响到titile标签值
```

### document.domain 

> domain 是可以设置的。但由于安全方面的限制，也并非可以给 domain 设置任何值，设置规则：
+ 只能设置更外层域名，例如：p2p.wrox.com，那么就只能将 domain 设置为"wrox.com"
+ 如果域名一开始是“松散的”（loose），那么不能将它再设置为“紧绷的”（tight），例如：设置为wrox.com后不能再设置为p2p.wrox.com

```javascript

//假设页面来自于 p2p.wrox.com 域
document.domain = "wrox.com"; //松散的（成功）

document.domain = "p2p.wrox.com"; //紧绷的（出错！）
```

**所有浏览器中都存在这个限制，但 IE8 是实现这一限制的最早的 IE 版本。**


##3. 查找元素

> document对象中取得特定的某个或某组元素的引用方法：
+ getElementById(id)	只取第一个，没去到返回null
+ getElementsByTagName(tagName)，返回HTMLCollection集合，没去到返回[]
+ getElementsByName 返回HTMLCollection集合，没去到返回[]




### HTMLCollection集合

类似于NodeList集合，都是基于DOM结构实时动态查询的结果。具有与NodeList一样的特性：
+ 实时动态性
+ 可以使用Item函数取集合元素
+ 可以使用方括号（[index]）取元素
+ length属性
+ namedItem(name)取元素，也可以使用[name]取元素。**HTMLCollection**特有。

```javascript
var images= document.getElementsByTagName('img');
console.log(images[0]);
console.log(images.length);
console.log(images.item[0]);

console.log(images.namedItem["imgName"]);
console.log(images["imgName"]);
```


**使用getElementsByName取出的集合，使用namedItem取值，永远只取到第一个值**


##1.4 特殊集合

> 除了属性和方法， document 对象还有一些特殊的集合。这些集合都是 HTMLCollection 对象，为访问文档常用的部分提供了快捷方式：
+ document.anchors 带name的a标签
+ document.applets  文档中所有的<applet>元素
+ document.forms     文档中所有form表单元素
+ document.images  文档中所有<img>表单元素
+ document.links       文档中所有带href特性的<a>标签元素

这个特殊集合始终都可以通过HTMLDocument对象访问到，而且，与HTMLCollection对象类似，集合中的项也会随的当前文档内容的更新而更新。


##1.5 DOM一致性检测

> 由于 DOM 分为多个级别，也包含多个部分，document.implementation 属性就是为此提供相应信息和功能的对象，与浏览器对 DOM 的实现
直接对应。

```javascript

var hasXmlDom = document.implementation.hasFeature("XML", "1.0");

```

##1.6 文档写入

> document 可以将输出流写入到网页中：
+ document.write  写入，页面加载的过程中单独使用可以动态加入内容
+ document.writeln 写入，最后加上\n换行，页面加载的过程中单独使用可以动态加入内容
+ document.open    关闭文档流
+ document.close    关闭文档流

```
<html>
	<head>
		<title>document.write() Example</title>
	</head>
	<body>
		<p>The current date and time is:
		<script type="text/javascript">
			document.write("<strong>" + (new Date()).toString() + "</strong>");
		</script>
		</p>
	</body>
</html>

```

#### write可以动态加载外部资源，需要转义

```
<html>
	<head>
		<title>document.write() Example 3</title>
	</head>
	<body>
		<script type="text/javascript">
		document.write("<script type=\"text/javascript\" src=\"file.js\">" +
		"<\/script>");
	</script>
	</body>
</html>

```

#### 页面加载完成后，会重写整个页面内容
> 页面加载完成后，需要使用方法 open()和 close()分别用于打开和关闭网页的输出流，然后才可以使用write重写整个页面。

```javascript
<html>
<head>
	<title>document.write() Example 4</title>
</head>
<body>
	<p>This is some content that you won't get to see because it will be overwritten.</p>
	<script type="text/javascript">
		window.onload = function(){
		document.write("Hello world!");
		};
	</script>
</body>
</html>
```









