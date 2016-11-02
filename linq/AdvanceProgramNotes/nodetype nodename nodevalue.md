## 浅谈nodeName，nodeValue，nodeType，typeof的区别

### nodeName 属性含有某个节点的名称。
* 元素节点的nodeName 是标签名称
* 属性节点的nodeName 是属性名称
* 文本节点的nodeName 永远是 #text
* 文档节点的nodeName 永远是 #document

### nodeValue 节点值
* 对于文本节点，nodeValue属性包含文本。
* 对于属性节点，nodeValue属性包含属性值。
* nodeValue属性对于**文档节点和元素节点**是***不可用的***。

### nodeType属性可返回节点的类型。
	最重要的的节点类型是：
	元素Element-1，属性attr-2，文本text-3，注释comments-8，文档document-9。

**值-元素类型**
* 1-ELEMENT
* 2-ATTRIBUTE
* 3-TEXT
* 4-CDATA
* 5-ENTITY REFERENCE
* 6-ENTITY
* 7-PI (processing instruction)
* 8-COMMENT
* 9-DOCUMENT
* 10-DOCUMENT TYPE
* 11-DOCUMENT FRAGMENT
* 12-NOTATION

### typeof 
返回一个表示***表达式数据类型的字符串***，可能的字符串：
* "number"
* "string"
* "boolean"
* "object"
* "function"
* "undefined"


