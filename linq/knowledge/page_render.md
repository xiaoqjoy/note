# 深入学习页面优化之页面渲染原理

##1. 原理

渲染引擎在这里就不展开了，可自行搜索解决。下面说说渲染流程，大致是这样的：

+ 浏览器在接收到服务器返回的html页面后

+ 浏览器开始构建DOM TREE，遇到CSS样式会构建CSS RULER TREE

+ 遇到javascript会通过DOM API和CSSOM API来操作DOM Tree和CSS Rule Tree，解析完成后

+ 浏览器引擎会通过DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree（渲染树）

+ 最后，渲染树构建完成后就是” 布局“处理，也就是确定每个节点在屏幕上的确切显示位置。 

+ 下一个步骤是  绘制 —— 遍历渲染树并用ＵＩ后端层将每一个节点绘制出来。

用一张图来表示:

![webkit html渲染图](images/webkitflow.png)

