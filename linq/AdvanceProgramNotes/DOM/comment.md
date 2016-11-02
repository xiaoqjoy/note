# Comment类型

> 注释在 DOM 中是通过 Comment 类型来表示的。 Comment 类型与 Text 类型继承自相同的基类，具有除splitText外所有的字符串操作方法。Comment节点具有下列特征：
+ nodeType的值为8
+ nodeName的值"#comment"
+ nodeValue的值时注释内容
+ parentNode可能是Document或Element
+ 不支持子节点

```
<div id="myDiv"><!--A comment --></div>
```

```javascript
var div = document.getElementById("myDiv");
var comment = div.firstChild;
alert(comment.data); //"A comment"
```

#### 创建注释节点

document.createComment()创建注释节点

```javascript
var comment = document.createComment("A comment ");

```

