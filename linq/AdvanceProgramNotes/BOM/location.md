# location 对象

> location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档相关信息，还提供了一些导航功能。
+ window.location === document.location
+ location 将URL解析成多个独立的片段
+ 能够导航到不同的URL中

| 属性名		|	例子			|说明			|
|-------------------------- |------------------------------------|---------------------------|
|hash			|"#content"			|返回URL中的hash（#号后跟零或多个字符），如果URL
中不包含散列，则返回空字符串			|
|host			|"www.baidu.com:80"		|返回服务器名称和端口号（如果有）			|
|hostname		|"www.baidu.com"		|返回不带端口号的服务器名称			|
|href			|"http://www.baidu.com"	|返回不带端口号的服务器名称			|
|pathname		|"/orders/"			|返回URL中的目录和（或）文件名			|
|port			|"8080"				|返回URL中指定的端口号。如果URL中不包含端口号，则
这个属性返回空字符串			|
|protocol		|"http:"				|返回页面使用的协议。通常是http:或https:			|
|search		|"?id=12&q=123"		|返回URL的查询字符串。这个字符串以问号开头			|


##1. 查询字符串参数

>  虽然通过上面的属性可以访问到 location 对象的大多数信息，但其中访问 URL 包含的查询字符串的属性并不方便。尽管 location.search 返回从问号到 URL 末尾的所有内容，但却没有办法逐个访问其中的每个查询字符串参数。


```javascript
function getQueryStringArgs(){
	//取得查询字符串并去掉开头的问号
	var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
	//保存数据的对象
	args = {},
	//取得每一项
	items = qs.length ? qs.split("&") : [],
	item = null,
	name = null,
	value = null,
	//在 for 循环中使用
	i = 0,
	len = items.length;
	//逐个将每一项添加到 args 对象中
	for (i=0; i < len; i++){
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		if (name.length) {
			value = decodeURIComponent(item.length >0 ? items[i].substr(item[0].length +1): '');
			args[name] = value;
		}
	}
	return args;
}

```


##2. 位置操作

> 使用 location 对象可以通过很多方式来改变浏览器的位置
+ assign(url)
+ location 赋值，最终都是调用了assign
+ location.href 赋值，最终都是调用了assign


另外，修改location对象的其他属性也可以改变当前加载的页面。下面的例子展示了通过将hash、search、 hostname、 pathname 和 port 属性设置为新值来改变 URL。

```javascript
//假设初始 URL 为 http://www.wrox.com/WileyCDA/
//将 URL 修改为"http://www.wrox.com/WileyCDA/#section1"
location.hash = "#section1";
//将 URL 修改为"http://www.wrox.com/WileyCDA/?q=javascript"
location.search = "?q=javascript";
//将 URL 修改为"http://www.yahoo.com/WileyCDA/"
location.hostname = "www.yahoo.com";
//将 URL 修改为"http://www.yahoo.com/mydir/"
location.pathname = "mydir";
//将 URL 修改为"http://www.yahoo.com:8080/WileyCDA/"
location.port = 8080;

```

**每次修改 location 的属性（hash 除外），页面都会以新 URL 重新加载。**


### replace

> 当通过上述任何一种方式修改 URL 之后，浏览器的历史记录中就会生成一条新记录，因此用户通过单击“后退”按钮都会导航到前一个页面。要禁用这种行为，可以使用 replace()方法

```javascript
<!DOCTYPE html>
<html>
<head>
<title>You won't be able to get back here</title>
</head>
<body>
<p>Enjoy this page for a second, because you won't be coming back here.</p>
<script type="text/javascript">
	setTimeout(function () {
	location.replace("http://www.wrox.com/");
	}, 1000);
</script>
</body>
</html>
```


### reload

> 如果调用 reload()时不传递任何参数，页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载，则需要像下面这样为该方法传递参数 true。

```javascript
location.reload(); //重新加载（有可能从缓存中加载）
location.reload(true); //重新加载（从服务器重新加载）
```

**位于 reload()调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素。为此，最好将 reload()放在代码的最后一行。**





