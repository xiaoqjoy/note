# Attr类型

> 元素的特性在 DOM 中以 Attr 类型来表示。在所有浏览器中（包括 IE8），都可以访问 Attr 类型的构造函数和原型。特性节点具有
下列特征：
+ nodeType的值为2
+ nodeName的值为特性的名称
+ nodeValue的值特性的值
+ parentNode的值为null
+ 在HTML中不支持子节点
+ 在XML中子节点可以是Text或EntityReference


***尽管它们也是节点，但特性却不被认为是 DOM 文档树的一部分。开发人员最常使用的是 getAttribute()、 setAttribute()和 remveAttribute()方法，很少直接引用特性节点***


#### 属性
+ name 特性名称
+ value 特性的值
+ specified 是否是用户指定的


#### createAttribute
> 使用 document.createAttribute()并传入特性的名称可以创建新的特性节点

```javascript
var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);

alert(element.attributes["align"].value); //"left"
alert(element.getAttributeNode("align").value); //"left"
alert(element.getAttribute("align")); //"left"
```




