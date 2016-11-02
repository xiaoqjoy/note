# Text类型

> 文本节点由 Text 类型表示，包含的是可以照字面解释的纯文本内容。纯文本中可以包含转义后的HTML 字符，但不能包含 HTML 代码。 

Text 节点具有以下特征：
+ nodeType 的值为 3
+ nodeName的值为"#text"
+ nodeValue 的值为节点所包含的文本
+ parentNode 是一个 Element
+ 不支持（没有）子节点


#### 文本值
> 通过 nodeValue 属性或 data 属性访问 Text 节点中包含的文本，二者操作一致，还包含如下操作方法：
+ appendData(text)
+ deleteData(offset, count)
+ insertData(offset, text)
+ replaceData(offset, count, text)
+ splitText(offset) 拆分成两个文本节点
+ substringData(offset, count)提取offset+count为止处的字符串
+ length 属性


在默认情况下，每个可以包含内容的元素最多只能有一个文本节点，而且必须确实有内容存在：

```

<!-- 没有内容，也就没有文本节点 -->
<div></div>
<!-- 有空格，因而有一个文本节点 -->
<div> </div>
<!-- 有内容，因而有一个文本节点 -->
<div>Hello World!</div>

```

##1. 创建文本节点

>  document.createTextNode()创建新文本节点，这个方法接受一个参数——要插入节点中的文本：
+ 作为参数的文本也将按照 HTML 或 XML 的格式进行编码
+ 在创建新文本节点的同时，也会为其设置 ownerDocument 属性

```javascript
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

document.body.appendChild(element);

```

##2. 规范化文本节点

> DOM 文档中存在相邻的同胞文本节点很容易导致混乱，因为分不清哪个文本节点表示哪个字符串，解决之道：
+ normalize方法合并

```javascript
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

var anotherTextNode = document.createTextNode("Yippee!");
element.appendChild(anotherTextNode);
document.body.appendChild(element);

alert(element.childNodes.length); //2

element.normalize();
alert(element.childNodes.length); //1
alert(element.firstChild.nodeValue); // "Hello world!Yippee!"

```

##3. 分隔文本节点

> 文本节点分成两个文本节点，即按照指定的位置分割 nodeValue 值中指定位置分隔成两个文本节点：
+ 有相同的parentNode

```javascript
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);

document.body.appendChild(element);

var newNode = element.firstChild.splitText(5);
alert(element.firstChild.nodeValue); //"Hello"
alert(newNode.nodeValue); //" world!"
alert(element.childNodes.length); //2

```








