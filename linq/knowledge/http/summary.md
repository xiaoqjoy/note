# 总结

http是基于TCP/IP协议的应用层协议，它不涉及Packet传输，主要是规定了客户端和服务器端之间的通讯格式，默认的端口是80.

0.9 1991年，只支持Get，不包含header，只能接受html，客户端请求时建立TCP连接，服务器发送完，TCP连接关闭


常见HTTP Request Header：

Accept、Accept-Encoding、Accept-Language----浏览器接受那些媒体类型（html）
content-type、content-length----描述payload内容，请求体媒体类型和字节长度
connection：--TCP连接
cookie:           ---描述浏览器端cookie值
user-agent:   ---浏览器代理
host:              ---请求主机名
referer:          ---表示请求页面来源
x-request-with:   ----使用什么类型发送的请求（xmlhttprequest）

cache-control:------浏览器缓存开关和设置
if-none-match :   ----是否开启etag验证（304请求）
if-modify-since:   ----是否使用时间验证浏览器缓存

range: bytes=rangestart-rangeend     -----表示部分内容区间


常见的HTTP Response Header：
status:----------------响应状态（101、200、204、206、301、302、304、400、401、403、404、500、501）
location:-----返回301或302时，网页重定向url
content-type:----响应body媒体类型
content-encoding:----响应body数据的编码

ETag:-------实体标签标示（时间戳+修改编号），唯一标示文档.---配合if-none-match识别请求资源未修改(304)---直接取缓存

last-modified:-----文件在服务器最后被修改的时间----配合Request中if-modify-since识别请求资源未修改（304）---直接去缓存中的版本

cache-control: ----客户端浏览器缓存开关.(max-age、expires、none)

max-age:----------多久过期，HTTP/1.1新增内容。相比expires来说。max-age优先级较高

expires:------------过期时间，HTTP/1.0就存在，返回服务器的过期时间（最大缺点），一旦重新下载页面就重新被计算一次。

Accept-Ranges：bytes表示服务器端支持部分内容传输，且支持bytes类型

Content-Range：bytes rangestart-rangeend/totallength 当前请求部分内容响应（一般和206响应状态同时出现）

Access-Control-Allow-Origin：*是否支持cors跨域，指定域名或所有域名
Access-Control-Allow-Credentials:boolean 是否支持cookie
Access-Control-Expose-Headers：























