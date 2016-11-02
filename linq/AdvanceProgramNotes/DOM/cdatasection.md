# CDATASection类型

> CDATASection 类型只针对基于 XML 的文档，表示的是 CDATA 区域，CDATASection 类型继承自 Text 类型，因此拥有除 splitText()之外的所有字符串操作方法。
CDATASection 节点具有下列特征：
+ nodeType的值为4
+ nodeName的值"#cdata-section"
+ nodeValue的值CDATA区域中的内容
+ parentNode可能是Document或Element
+ 不支持子节点

 
CDATA 区域只会出现在 XML 文档中，因此多数浏览器都会把 CDATA 区域错误地解析为 Comment或 Element：

```
<div id="myDiv"><![CDATA[This is some content.]]></div>

```

#### document.createCDataSection

