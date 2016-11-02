# DocumentType 类型

> DocumentType 类型在 Web 浏览器中并不常用，仅有 Firefox、 Safari 和 Opera 支持它。Type 包含着与文档的 doctype 有关的所有信息，它具有下列特征：
+ nodeType的值10
+ nodeName的值为doctype的名称
+ nodeValue的值为null
+ parentNode是Document
+ 不支持子节点


DOM1对DocumentType的描述：
+ 不能动态创建，只能通过解析文档代码的方式创建
+ name 类型名称
+ entities 文档描述实体的NamedNodeMap的对象
+ notations 文档类型描述的符号的NamedNodeMap 对象


```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
```

```javascript
alert(document.doctype.name); //"HTML"

```

