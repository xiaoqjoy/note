# CDN

>全称是Content Delivery Network，即内容分发网络。
+ 基本思路：避开互联网有可能影响数据传输速度、稳定性的瓶颈和环节，使内容传输的更快、更稳定。依据综合因素将用户请求重新导向离用户最近的服务器节点上，常见综合因素如下：
    - 网络流量
    - 各节点连接数
    - 负载状况
    - 用户距离
    - 响应时间
+ 目的：用户可就近取的所需内容，解决Internet网络拥挤的状况，提供用户访问网的响应速度。
+ 基本原理：广泛采用各种缓存服务器，将缓存服务器分布在用户相对集中的地区或网络，在用户访问站点时，利用全局负载技术将用户的访问指向距离最近、响应速度最快的正常缓存服务器中，有缓存服务器直接响应用户请求。

## 是否开启CDN服务

#### Windows

在CMD中输入：

```
nsloopup www.baidu.com
```

响应结果：
```shell
# dns服务器域名解析
服务器:  dns-cahe3.fnetlink.com
Address:  121.14.136.214    

非权威应答:
名称:    www.a.shifen.com
# 多个IP代表的是具有cdn加速,一般具有Aliases映射都是代表有cdn
Addresses:  14.215.177.37
          14.215.177.38
Aliases:  www.baidu.com
```

#### 站长工具：Ping检测

> 借助在线工具测试网站是否开启CDN，并且可以测试出全国不同地区，访问该网站的速度与访问IP地址

+ [多个地点Ping服务器,网站测速 - 站长工具](http://ping.chinaz.com/)
+ [齐云测](http://ce.cloud.360.cn/)


#### URL是否命中CDN缓存

>给网站使用CDN后，查看访问网站是否命中CDN缓存，用浏览器简单访问测试就可以看到。

+ 使用Chrome或火狐浏览器，按**F12**打开调试界面，选择网络或Network
+ 然后查看一个网站链接，在浏览器中进行访问，查看显示的http请求信息
    - 查看Response Header（响应头）信息中的***X-Cache***字段
    - MISS 说明没有命中CDN缓存
    - HIT  是命中CDN缓存

## 玩过的CDN

```
https://su.baidu.com
qiulinkjycom   qiulinkjycom
```
