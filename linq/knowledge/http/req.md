# request请求

> http请求由三部分组成：
+ 请求行
+ 消息报头（协议头）
+ 请求正文


## 请求行

> 请求行以一个方法符号开头，以空格分开，后面紧跟的请求的URI和协议版本，格式如下：Method Request-URI HTTP-Version CRLF
+ Method 表示请求方法；
+ Request-URI表示一个统一资源定位标识符，简称资源路径；
+ HTTP-Version表示请求的HTTP协议版本；
+ CRLF表示回车和换行


### Method请求方法

请求方法有多种，各个方法的解释如下：

+ GET   请求获取Request-URI所标识的资源；
+ POST  向指定资源提交数据进行处理请求。数据包含在请求正文中；
+ HEAD 与Get请求一致，响应体不会被返回；
+ PUT  向指定资源上传最新内容；
+ DELETE 删除指定资源
+ TRACE   回显服务器收到的请求
+ CONNECT HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器
+ OPTIONS  返回服务器针对特定资源所支持的HTTP请求方法。也可以利用Web服务器发送"*"的请求来测试服务器的功能性。

### Request-URI

URI一般是由三部分组成：协议 + host + 资源路径；此处一般指资源路径。默认情况下为"/"+服务器默认指定资源

### HTTP-Version

目前HTTP历史及版本分为0.9、1.0、1.1三个版本。现代浏览器只兼容1.1和1.0版本。默认都为1.1版本


## 协议包头

> 协议包头在HTTP1.0以上才得以支持。

重要的协议头：

|头字段              |定义                                                         |
|------------------ |----------------------------------------------|
|Accept              |客户端可以处理的媒体类型（MIME-Type），按优先级排序；在一个以逗号为分隔的列表中，可以定义多种类型和使用通配符|
|Accept-Language|客户端支持的自然语言列表|
|Accept-Encoding  |客户端支持的编码列表        |
|User-Agent           | 客户端环境类型                       |
|HOST                    |服务器端的主机地址                 |
|Connection           |链接类型                                     |
|Content-type         |请求正文类型                             |
|Referer                   |记录访问的来源                           |
|content-type          |请求正文的内容类型                   |
|content-length       |请求正文的长度                           |
|cookies                   |cookie缓存                                   |
|Connection             |长连接Keep-Alive,表示TCP连接时间                                          |
|Cache-Control        |缓存机制                                      |


**HTTP1.1版本中，HOST包头必须填写**

媒体类型的格式为：大类/小类 比如图5中的html是小类，而text是大类。

IANA(The Internet Assigned Numbers Authority，互联网数字分配机构)定义了8个大类的媒体类型，分别是：

+ application(比如: application/vnd.ms-excel.)
+ image (比如: image/png.)
+ audio(比如: audio/mpeg.)
+ video(比如:model/vrml.)
+ text(比如:text/html.)
+ multipart(比如:multipart/form-data.)
+ model(比如:model/vrml.)
+ message (比如,:message/http.)





