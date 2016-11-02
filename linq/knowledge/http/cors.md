# Cross Origin Resource Share 

[跨域资源共享CORS-阮一峰](http://www.ruanyifeng.com/blog/2016/04/cors.html)

CORS是一个W3C标准，全称是“跨域资源共享”，它允许浏览器向跨源服务器，发出XMLHttpReqest请求，从而克服了AJAX只能同源使用的限制。

## 一、简介

CORS需要浏览器和服务器同时支持。目前，所有的浏览器均支持该功能，IE浏览器不能低于IE10.

特点：
1.  整个CORS通讯过程，都是浏览器自动完成，不需要用户参与
2.  与正常AJAX通讯没有差别，浏览器一旦发现AJAX请求跨域，自动附加一些头信息【有时会自动发一次OPTIONS请求】
3.   只要服务器端响应Response实现CORS，附加acess-control-allow-origin头回来，当前domain、method在允许范围内就认为请求Success

***实现CORS通讯关键是服务器，只要服务器实现CORS接口，就可以跨源通讯***

原生1：

```javascript
var xtr = new XMLHttpRequest();
xtr.open('post', 'http://192.168.2.151:8010/restapi/accounts/api/letters/count', true);
xtr.onreadystatechange=function(){
	if(this.readyState ===4){
		if(this.status===200){
			console.log(this, 'game over successed');
		}else{
			console.log(this, 'game over failed');
		}
	}
};
xtr.onerror=function(){console.log(this);};
xtr.send(JSON.stringify({test:'aaa'}));

```

jquery：

```javascript
$.ajax({
type:'post',
url:'http://192.168.2.151:8010/restapi/accounts/api/letters/count',
crossDomain:true,		//此参数在不跨浏览器情况下，jquery自动识别
headers:{'auth':'aaaaaa'},
data:{test:'aaa'}
});
```

如果跨域，只要http://192.168.2.151:8010/restapi/accounts/api/letters/count实现CORS即可直接访问。

## 二、两种请求

浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-no-simple Request）

只要同时满足一下两大条件，就属于简单请求：

+ (1)、请求方法是一下三种方法之一
	- HEAD
	- GET 
	- POST
+ (2)、HTTP的头信息不超过一下几种字段：
	- Accept
	- Accept-language
	- content-Language
	- Last-Event-ID
	- content-type：只限于appliction/x-www-form-urlencoded、multipart/form-data、text/plain

凡是不能同时满足以上两个条件，就属于非简单请求，两种请求浏览器处理方式是不一样的。

## 三、简单请求

浏览器直接发送CORS请求，具体来说，就是浏览器头信息中，增加一个Origin头。


```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

```

上面的头信息中，**Origin**字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

识别跨域规则：
+ 如果Origin指定的源，在允许范围内，服务器会返回一个正常且不带**Access-control-**相关头，浏览器识别后，知道报错了。就会从XMLHttpRequest的onerror回调函数捕获。**注意：response.status依然可能是200**

+ 如果Origin指定的域名在许可范围内，返回返回响应，会多出几个字段信息：

```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
```

关于服务器端[ Response Header]下发跨域头解释：

```
Access-Control-Allow-Credentials
Access-Control-Expose-Headers 
Access-Control-Max-Age 
Access-Control-Allow-Methods 
Access-Control-Allow-Headers 

```

#### (1)Access-Control-Allow-Origin

该字段是必须的。它的值要么是请求时**Origin**字段的值，要么是一个*，表示接受任意域名的请求（**必须是完整URI**）。

#### (2)Access-Control-Allow-Credentials

该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。

两个作用：
+ 限制服务器是否下发Cookie
+ 限制客户端是否允许发送Cookie头

####(3) Access-Control-Allow-Headers
该字段可选。它是一个字符串，以逗号分隔支持多个头。默认情况下与**Access-Control-Request-Headers**成对出现。

####(4) Access-Control-Expose-Headers

在正常只有6个简单头部是允许返回，并且允许js脚本访问：
+ Cache-Control
+ Content-Language
+ Content-Type
+ Expires
+ Last-Modified
+ Pragma

如果需要访问content-length之类的头，需要在response中指定Access-Control-Expose-Headers头。

```
Access-Control-Expose-Headers: content-length
```

该字段可选，它是一个字符串与Access-Control-Allow-Headers类似，都与逗号风格多个暴露头，即：脚本可以访问的头。


####(5) Access-Control-Allow-Method

该字段是必须的，它是有一个字符串组成，采用逗号分隔。每个值是HTTP请求Method值，是否允许同源访问时，浏览器会判断Server端支持的请求方式，识别出是否成功CORS请求。


### withCredentials属性

上面说到，CORS请求默认不发送Cookie和HTTP认真信息。如果需要把Cookie发送到服务器，一方面需要服务器同意，指定**Access-Control-Allow-Credentails**字段

```
Access-Control-Allow-Credentials: true
```

另外一方面，开发者必须在AJAX请求中打开withCredentials属性


```
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

//或者
$.ajax({
	xhrFields:{
		withCredentials: true
	}
});

```

如果省略该参数，也会当成withCredentials为true是处理，自动带上Cookie

但可以显示的关闭：withCredentials

```
xhr.withCredentials = false;
```

***注意：如果要发送Cookie，Access-Control-Allow-Origin必须指定明确的、与请求网页一致的域名，而不能是* ***


另外：
+ 混合应用，是本地文件，只允许使用Access-Control-Allow-Origin为*，因此混合应用中不允许Cookie作为身份认证方式
+ 下发的Cookie依然遵循浏览器**同源策略**，跨域Cookie不能使用Document.Cookie读取


## 四、非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。


非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

#### 预检请求

```javascript
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```

上面代码中，HTTP请求的方法是PUT，并且发送一个自定义头信息X-Custom-Header。

浏览器发现，这是一个非简单请求，就自动发出一个"预检"请求，要求服务器确认可以这样请求。下面是这个"预检"请求的HTTP头信息。

```javascript
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

```

"预检"请求用的请求方法是**OPTIONS**，表示这个请求是用来询问的。头信息里面，关键字段是**Origin**，表示请求来自哪个源。


除了**Origin**字段，"预检"请求的头信息包括两个特殊字段：

######（1）Access-Control-Request-Method
该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。

######（2）Access-Control-Request-Headers
该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。


#### 预检请求的回应

服务器收到"预检"请求以后，检查了**Origin**、**Access-Control-Request-Method**和**Access-Control-Request-Headers**字段以后，确认允许跨源请求，就可以做出回应

```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```


上面的HTTP回应中，关键的是**Access-Control-Allow-Origin**字段，表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

```
Access-Control-Allow-Origin: *
```


如果浏览器否定了"预检"请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。**浏览器就会决定，服务器不同意预检请求。因此触发onerror回调函数捕获**

```
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.

```

#### 浏览器的正常请求和回应

一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个**Origin**头信息字段。服务器的回应，也都会有一个**Access-Control-Allow-Origin**头信息字段。

```
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...

```
上面头信息的**Origin**字段是浏览器自动添加的。


下面是服务器正常的回应。

```
Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8

```


**上面头信息中，Access-Control-Allow-Origin字段是每次回应都必定包含的。**














