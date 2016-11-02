# HTTP Cookie

参考：

<http://www.webryan.net/2011/08/wiki-of-http-cookie/>

<http://bubkoo.com/2014/04/21/http-cookies-explained/>

> Cookie通常也叫做网站cookie，浏览器cookie或者Http Cookie。就是浏览器存储在用户电脑的上的一段文本文件。并在发送Http请求时会默认携带的一段文本片段。它可以用来做用户认证，服务器校验等。

## Cookie的类别

#### Session Cookie

生命周期：会话期间内有效，即:当关闭浏览器时候，它会被浏览器删除。

创建方法：在创建Cookie不设置Expire即可。

#### Presistent Cookie

生命周期： 会长期在用户会话中生效。

创建方法：通过设置Max-Age或Expire的值

#### Secure Cookie 
> 安全cookie是在https访问状态下的cookie形态，确保cookie从客户端传递到服务器端中始终加密的。

#### HttpOnly Cookie
> 只允许http传递cookie，即：不支持javascript客户端读取cookie。

#### 3rd-party cookie
> 第三方cookie是指种植在不同于浏览器地址的域名下的cookie。

	例如：用户访问a.com时，访问在ad.google.com设置了个cookie，在访问b.com的时候，也在ad.google.com设置了一个cookie

#### Super Cookie
> 超级Cookie是设置公共域名前缀上的Cookie。

	例如：
	域名：a.b.com下设置cookie，可以是a.b.com/b.com下。但由于一些老版本却支持.com下设置cookie。

#### Zombie Cookie
> 僵尸Cookie是指那些删不掉的，删掉后会自动重建的Cookie。一般是依赖于本地存储方法。

	例如：flash的share Object
		  html5的local storage等

**当Cookie删除后，自动从其他本地存储读取Cookie的备份，并重新种植**

## Cookie编码

> Cookie编码一直比较迷惑，原始规范明确指出：

+ 三个字符必须进行编码：逗号，分号，空格
+ 规范中还提到可以用URL编码，但并不是必须。

几乎所有的实现都对Cookie的值进行了一系列的URL编码。对于name=value格式，**对name和value进行编码，而不对等号进行编码**


## 创建Cookie
> 通常创建Cookie的方式有两种：
+ Web Server通过Http Respone 消息头设置Set-Cookie头创建，允许有多个Set-Cookie设置。
+ 在客户端允许执行脚本的情况下，Cookie是允许被JavaScript等脚本设置的。

##### Web Server创建Cookie

Set-Cookie格式如下：

	Set-Cookie: name=value[;expires=date][;domain=domain][;path=path][;secure][;HttpOnly]
	[]内表示是可选设置项

紧跟cookie值后面的每个选项都是以**逗号和空格**分开。*每个选项都指定了应该在什么时候发送至服务器*。


当存在一个Cookie，并允许设置可选项，该Cookie的值会在每次请求中发送到服务器。Cookie的值被存在Request的Http消息头：Cookie中，多个用逗号分隔。

	Cookie: value1; value2; name=value1; name2=value2

http方式:以访问http://www.webryan.net/index.php为例

Step1.客户端发起http请求到Server

	GET /index.php HTTP/1.1
	Host: www.webryan.net
	(这里是省去了User-Agent,Accept等字段)

Step2. 服务器返回http response,其中可以包含Cookie设置

	HTTP/1.1 200 OK
	Content-type: text/html
	Set-Cookie: name=value
	Set-Cookie: name2=value2; Expires=Wed, 09 Jun 2021 10:18:14 GMT
	(content of page)

Step3. 后续访问webryan.net的相关页面

	GET /spec.html HTTP/1.1
	Host: www.webryan.net
	Cookie: name=value; name2=value2
	Accept: */*

需要修改cookie的值的话，只需要Set-Cookie: name=newvalue即可，浏览器会用新的值将旧的替换掉。


##### 脚本方式种植Cookie：

> JavaScript或类似的寄宿在浏览器中的脚本语言也可以设置Cookie。在JavaScript里，可以通过document.cookie对象实现

	document.cookie = "key=newvalue";


### expires And Max-Age

> 指定Cookie何时不再发送至服务器，随后浏览器将删除Cookie，选项值是个Wdy, DD-Mon-YYYY HH:MM:SS GMT 日期格式的值；
在RFC 2965中规范提供了一个替代方案：Max-Age:seconds,来设置cookie在设置后多长秒后失效。

	Set-Cookie: name=Nicholas; expires=Sat, 02 May 2009 23:38:25 GMT

**没有设置expires时，表示仅限于当前会话，浏览器关闭删除cookie**

Demo:

	复选框是否记住登陆信息：勾选了，那么会加一个expires到登陆的Cookie上。

### domain And path

> domain是指定cookie要将被发送到哪个或那些域名中；path是指cookie在请求的资源URL中必须存在指定的路径是，才发送Cookie消息头。
+ 默认情况下domain会设置为创建该Cookie的页面所在的域名
+ domain选项与请求域名做一个尾部比较（即从字符串的尾部开始比较）
+ path选项只有在domain选项核实完毕后才进行。


	Set-Cookie: name=Nicholas; domain=nczonline.net
	Set-Cookie:name=Nicholas;path=/blog
	Set-Cookie:name=Nicholas;domain=nczonline.net;path=/blog

### secure and HttpOnly

> 当请求通过SSL或HTTPS创建时，包含secure选项的cookie才发送到服务器。

	Set-Cookie: name=Nicholas; secure

**默认情况下，在 HTTPS 链接上传输的 cookie 都会被自动添加上 secure 选项**

HttpOnly字段告诉浏览器，只有在HTTP协议下使用，对浏览器的脚本不可见。

	Google和Facebook都在使用HttpOnly的Cookie。

**跨站脚本攻击时也不会被窃取**。 

## Cookie的维护和生命周期

在一个 cookie 中可以指定任意数量的选项，并且这些选项可以是任意顺序，例如：

	Set-Cookie:name=Nicholas; domain=nczonline.net; path=/blog

这个 cookie 有四个标识符：cookie 的 name，domain，path，secure 标记。要想改变这个 cookie 的值，需要发送另一个具有相同 cookie name，domain，path 的 Set-Cookie 消息头。例如：

	Set-Cookie: name=Greg; domain=nczonline.net; path=/blog

这将覆盖原来 cookie 的值。但是，修改 cookie 选项的任意一项都将创建一个完全不同的新 cookie，例如：

	Set-Cookie: name=Nicholas; domain=nczonline.net; path=/

这个消息头返回之后，会同时存在两个名为 “name” 的不同的 cookie。如果你访问 www.nczonline.net/blog 下的一个页面，以下的消息头将被包含进来：

	Cookie: name=Greg; name=Nicholas

在这个消息头中存在了两个名为 “name” 的 cookie，path 值越详细则 cookie 越靠前。 按照 domain-path-secure 的顺序，设置越详细的 cookie 在字符串中越靠前。假设我在 ww.nczonline.net/blog 下用默认选项创建了另一个 cookie：

	Set-Cookie: name=Mike

那么返回的消息头现在则变为：

	Cookie: name=Mike; name=Greg; name=Nicholas

以 “Mike” 作为值的 cookie 使用了域名（www.nczonline.net）作为其 domain 值并且以全路径（/blog）作为其 path 值，则它较其它两个 cookie 更加详细。


## 浏览器限制Cookie

> Cookie存在许多限制条件，来阻止Cookie滥用并保护浏览器和服务器收到一些负面影响，主要有两种：
+ cookie的个数
+ cookie的总大小

	原始规范中指出：每个域名cookie指出不能超过20个；每个域名最大数量（空间）不能超过4KB，超出的都会被覆盖或截掉不发给服务器。


+ 浏览器都支持删除和禁用cookie
+ Cookie规范规定浏览器最少支持300个cookie，每个cookie最大4KB；















