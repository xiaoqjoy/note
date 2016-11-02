# response响应

> HTTP响应是由三部分组成：
+ 状态行
+ 协议头（消息报头）
+ 响应正文

## 状态行

> HTTP-Version Status-Code Reason-Phrase CRLF
+ HTTP-Version 表示服务器HTTP协议的版本号
+ Status-Code     表示服务器返回响应的状态码
+ Reason-Phrase 表示状态码的描述


### 状态码
> 状态码是由三位数字组成，第一位数字定义了响应的类别，总共有5中可能取值：
+ 1xx：提示信息，表示请求已接受，继续处理；
+ 2xx：成功，表示请求已被成功接受、理解、处理；
+ 3xx：重定向，要完成请求必须进行更进一步的操作；
+ 4xx：客户端错误，请求语法错误或请求无法实现；
+ 5xx：服务器端错误，服务器未能实现合法的请求；


下面列举HTTP/1.1定义的状态码，和对应的原因短语：

| 状态码                    | 定义                                    |
|------------------------|--------------------------------|
|100                           | Continue 继续                    |
| 101                          |  witching Protocols 交换协议 |
| 200                          |  OK                                           |
| 201                          |  Create 已创建                         |
| 202                          |   Accept 接受                            |
| 204                          |   no Content                              |
| 300                          |   Multiple Choices 多路选择   |
| 301                          |    Moved Permanently 永久转移  |
| 302                          |    Found 暂时转移                          |
| 304                          |    Not Modified 资源未修改            |
| 400                          |    Bad Request 错误请求                |
| 401                          |    Unauthorized 未认证                   |
| 402                          |    Payment Required 需要付费        |
| 403                          |    Forbidden 禁止                             |
| 404                          |     Not Found 未找到                        |
| 405                          |     Method Not Allowed 方法不允许 |
| 408                          |     Request Time-out   请求超时        |
| 500                          |     Internal Server Error 服务器内部错误  |
| 501                          |     Not Implemented 未实现                        |
| 502                          |     Bad Gateway 网关失败                       |
| 503                          |     Service Unavailable  服务未达到       |
| 504                          |     Gateway Time-out 网关超时               |

## 响应头

基本上同请求头内容

|协议头              |含义                      |
|--------------------|--------------------------|
|Accept-Ranges      |允许部分请求               |






