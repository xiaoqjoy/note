# 撑开父元素的几种方法

参考文献：
+ [How To Clear Floats Without Structural Markup ](http://www.positioniseverything.net/easyclearing.html)
+ [子div撑不开父div的几种解决方法](http://blog.csdn.net/piazini/article/details/8625935)

## 最后一个子元素clear:both

```
<div style="width:200px;border:1px solid red;">
	<div style="float:left;width:80px;height:80px;border:1px solid blue;">TEST DIV</div>
	<div style="clear:both;"></div>
</div>

```

进阶：使用伪元素::after

```
.container::after{
	content:'.',
	display:block;
	clear:both;
	visibility:hidden;
	height:0;
}

```

Windows IE并不支持这样做。所以要让IE也完美显示，则必须在clearfix这个CSS定义的后面加上一些专门为IE设定的HACK。CSS如下

```
.container::after{
	content:'.',
	display:block;
	clear:both;
	visibility:hidden;
	height:0;
}

/* Hides from IE-mac \*/

* html .container {height: 1%;}

/* End hide from IE-mac */

```

## 父容器设置overflow:hidden

解决的方法其实比较简单，那就是给父容器增加一个属性，overflow:hidden。


## 设置display:table

给父容器增加属性：display：table，个人常用的方法