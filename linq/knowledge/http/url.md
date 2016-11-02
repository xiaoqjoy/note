# URL

> HTTP URL是一种特殊类型的URI，包含了用于查找某个资源的足够的信息。

## URI

> URI（Uniform Resource Identifiers，统一资源定位符）根据RFC 1808的官方定义，一个完整URI的组成如下：

```
http://myname:mypass@www.vimer.cn:80/mydir/myfile.html?myvar=myvalue#myfrag
```

| URI部分   |意义               |
|-----------|-------------------|
|http       |协议名称           |
|myname     |认证用户名（可选）         |
|mypass     |认证密码（可选）           |
|www.wimer.cn|主机名称          |
|80         |主机端口（可选）           |
|/mydir/myfile.html|资源路径    |
|myvar=myvalue|查询字符串（可选）       |
|myfrag       |锚点（可选）             |

分析：
+ 协议名称用“://”结束
+ 用户名和密码以“:”分割,以“@”结束
+ 端口号与主机网络地址以":"分割
+ 资源路径和查询字符串以"?"分割
+ 锚点以#开头


**只有协议名称、主机和资源路径是必须的包含在URI中**

```html
http://www.qq.com/		
<!-- 端口默认为80，可不写 -->
<!-- 资源路径为 "/",加上服务器默认资源配置 -->
www.qq.com
<!-- 协议名称http://以及/(资源路径)均可以默认浏览器补全 -->

```

## URL

> 特殊的URI。遵循URI规范

**一般不使用认证用户名和认证密码**

