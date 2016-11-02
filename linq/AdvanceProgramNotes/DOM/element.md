# Element 类型

> Element 类型用于表现 XML 或 HTML 元素，提供了对元素标签名、子节点及特性的访问。 Element 节点具有以下特征：
+ nodeType 的值为1
+ nodeName的值为元素的标签名
+ nodeValue的值为null
+ parentNode 可能是Element或Document
+ 其子节点可能是Element、Text、Comment、ProcessingInstruction、CDATASection或EntityReference


#### tagName与nodeName

```javascript
var div = document.getElementById("myDiv");
alert(div.tagName); //"DIV"
alert(div.tagName == div.nodeName); //true

```

**在 HTML 中，标签名始终都以全部大写表示；而在 XML（有时候也包括 XHTML）中，标签名则始终会与源代码中的保持一致**


##1.  HTML元素

>  所有 HTML 元素都由 HTMLElement 类型表示，不是直接通过这个类型，也是通过它的子类型来表示。HTMLElement 类型直接继承自 Element 并添加了一些属性，每个HTML标准特性：
+ id      元素在文档中的唯一标识符
+ title   有关元素的附加说明信息
+ dir    语言的方向,ltr和rtl
+ lang 语言代码
+ className 与元素的class属性对应，指定CSS类


```
<div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div>
```


```javascript

var div = document.getElementById("myDiv");
alert(div.id);                                   //"myDiv""
alert(div.className);                   //"bd"
alert(div.title);                                //"Body text"
alert(div.lang);                              //"en"
alert(div.dir);                                 //"ltr"

```

所有的HTMLElement元素表：

|  元素               |  类型                              | 
|------------------|---------------------------- |
|a                        | HTMLAnchorElement  |
|abbr                  | HTMLElement              |
|acronym           | HTMLElement              |
|address            | HTMLElement              |
|erea                   | HTMLAreaElement      |
|b                         | HTMLElement              |
|base                   |  HTMLBaseElement     |
|bdo                     |  HTMLElement              |
|big                      |  HTMLElement             |
|blockquote        |   HTMLQuoteElement  |
|body                  |   HTMLBodyElement    |
|br                       |   HTMLBRElement        |
|button                |   HTMLButtonElement  |
| caption              |    HTMLTableCaptionElement  | 
| cite                     |    HTMLElement            |
| code                  |    HTMLElement              |
| col                      |    HTMLTableColElement  |
| colgroup            |    HTMLTableColElement  |
| dd                       |     HTMLElement                |
| del                      |     HTMLModElement         |
| dfn                      |     HTMLElement                |
| div                      |     HTMLDivElement         |
| dl                         |    HTMLDListElement        |
| dt                          |   HTMLElement                 |
| em                          |   HTMLElement                 |
| fieldset                          |   HTMLFieldSetElement                 |
| form                          |   HTMLFormElement                 |
| frame                          |   HTMLFrameElement                 |
| frameset                          |   HTMLFrameSetElement                 |
| h1                          |   HTMLHeadingElement                 |
| h2                          |   HTMLHeadingElement                 |
| h3                          |   HTMLHeadingElement                 |
| h4                          |   HTMLHeadingElement                 |
| h5                          |   HTMLHeadingElement                 |
| h6                          |   HTMLHeadingElement                 |
| head                          |   HTMLHeadElement                 |
| hr                          |   HTMLHRElement                 |
| html                          |   HTMLHtmlElement                 |
| i                          |   HTMLElement                 |
| iframe                          |   HTMLIFrameElement                 |
| img                          |   HTMLImageElement                 |
| input                          |   HTMLInputElement                 |
| ins                          |   HTMLModElement                 |
| kbd                          |   HTMLElement                 |
| label                          |   HTMLLabelElement                 |
| legend                          |   HTMLLegendElement                 |
| link                          |   HTMLLinkElement                 |
| map                          |   HTMLMapElement                 |
| meta                          |   HTMLMetaElement                 |
| noframes                      |   HTMLElement                 |
| noscript                          |   HTMLElement                 |
| object                             |  HTMLObjectElement                 |
| ol                                    |   HTMLOListElement                 |
| optgroup                         |   HTMLOptGroupElement                 |
| option                             |  HTMLOptionElement                |
| p                                     |   HTMLParagraphElement                |
| param                          |   HTMLParamElement                 |
| pre                              |   HTMLPreElement                 |
| q                                   |   HTMLQuoteElement                 |
| s                                   |   HTMLElement                 |
| samp                          |   HTMLElement                 |
| script                          |   HTMLScriptElement                 |
| select                          |   HTMLSelectElement                 |
| small                          |   HTMLElement                 |
| span                          |   HTMLElement                 |
| strong                          |   HTMLElement                 |
| style                          |   HTMLStyleElement                 |
| sub                          |   HTMLElement                 |
| sup                          |   HTMLElement                 |
| table                          |   HTMLTableElement                 |
| tbody                          |   HTMLTableSectionElement                 |
| td                          |   HTMLTableCellElement                 |
| texterea                          |   HTMLTextAreaElement                 |
| tfoot                          |   HTMLTableSectionElement                 |
| th                          |   HTMLTableCellElement                 |
| thead                          |   HTMLTableSectionElement                 |
| title                          |   HTMLTitleElement                 |
| tr                          |   HTMLTableRowElement                 |
| tt                          |   HTMLElement                 |
| ul                          |   HTMLUListElement                 |
| var                          |   HTMLElement                 |


##2. 取得特性

> 每个元素都有一或多个特性，这些特性的用途是给出相应元素或其内容的附加信息，操作特性的DOM方法：
+ getAttribute
+ setAttribute
+ removeAttribute

```javascript

var div = document.getElementById("myDiv");
alert(div.getAttribute("id")); //"myDiv"
alert(div.getAttribute("class")); //"bd"
alert(div.getAttribute("title")); //"Body text"
alert(div.getAttribute("lang")); //"en"
alert(div.getAttribute("dir")); //"ltr"

```

***不过，特性的名称是不区分大小写的，即"ID"和"id"代表的都是同一个特性。另外也要注意，根据 HTML5 规范，自定义特性应该加上 data-前缀以便验证***


> HTMLElement 也会有 5个属性与相应的特性一一对应，只有工人的特性才会以属性的形式添加到DOM对象中：

```
<div id="myDiv" align="left" my_special_attribute="hello!"></div>
```

```javascript

alert(div.id); //"myDiv"
alert(div.my_special_attribute); //undefined（ IE 除外）
alert(div.align);
```

### 特殊特性

> 虽然有对应的属性名，但属性的值与通过 getAttribute()返回的值并不
相同：
+ style 样式特性
+ onclick事件处理程序属性


#### style

+ 通过getAttribute访问，返回style特性值中包含的是CSS文本
+ 通过属性访问，返回一个对象


#### onclick

+ 如果通过 getAttribute()访问，则会返回相应代码的字符串
+ 访问onclick 属性时，则会返回一个 JavaScript 函数，未指定返回null。



***由于存在这些差别，在通过 JavaScript 以编程方式操作 DOM 时，开发人员经常不使用 getAttribute()，而是只使用对象的属性。只有在取得自定义特性值的情况下，才会使用 getAttribute()方法***


##3. setAttribute

> 接受两个参数：设置的特性名和值，设置完毕后，特性名都会转换为小写。
+ 如果特性已经存在，setAttribute()会以指定的值替换现有的值；
+ 如果特性不存在，setAttribute()则创建该属性并设置相应的值

```javascript
div.setAttribute('id', 'mylinq');			//替换特性id值为mylinq
div.setAttribute('data-row','test');		//自动创建data-row特性
```

### removeAttribute

> 用于彻底删除元素的特性。调用这个方法不仅会清除特性的值，而且也会从元素中完全删除特性。

```javascript
div.removeAttribute("class");
```

##4. attributes属性

> Element 类型是使用 attributes 属性的唯一一个 DOM 节点类型。attributes 属性中包含一个NamedNodeMap，与 NodeList 类似，元素的每一个特性都由一个 Attr 节点表示，每个节点都保存在 NamedNodeMap 对象：
+ getNamedItem(name)
+ removeNamedItem(name)
+ setNamedItem(node)
+ item(pos)

```javascript
var id = element.attributes.getNamedItem("id").nodeValue;
var id = element.attributes["id"].nodeValue;
element.attributes["id"].nodeValue = "someOtherId";
```

### specified属性

> IE7及更早的版本会返回HTML元素中所有可能的特性，包括没有指定的特性，每个特性节点都有一个名为 specified 的属性：
+ true表示为HTML指定特性
+ false 非指定

```javascript
function outputAttributes(element){
	var pairs = new Array(),
	attrName,
	attrValue,
	i,
	len;
	for (i=0, len=element.attributes.length; i < len; i++){
		attrName = element.attributes[i].nodeName;
		attrValue = element.attributes[i].nodeValue;
		if (element.attributes[i].specified) {
			pairs.push(attrName + "=\"" + attrValue + "\"");
		}
	}
	return pairs.join(" ");
}

```

##5. 创建元素

>  document.createElement()方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名：
+ 这个标签名在 HTML 文档中不区分大小写，而在 XML（包括 XHTML）文档中，则是区分大小写的
+ 创建新元素的同时，也为新元素设置了 ownerDocuemnt 属性

```javascript
var div = document.createElement("div");
div.id = "myNewDiv";
div.className = "box";
document.body.appendChild(div);
```

**一旦将元素添加到文档树中，浏览器就会立即呈现该元素。此后，对这个元素所作的任何修改都会实时反映在浏览器中**



### IE中createElement特殊用法

> 在 IE 中可以以另一种方式使用 createElement()，即为这个方法传入完整的元素标签，也可以包含属性

```javascript
if (client.browser.ie && client.browser.ie <=7){
	//创建一个带 name 特性的 iframe 元素
	var iframe = document.createElement("<iframe name=\"myframe\"></iframe>");

	//创建 input 元素
	var input = document.createElement("<input type=\"checkbox\">");

	//创建 button 元素
	var button = document.createElement("<button type=\"reset\"></button>");

	//创建单选按钮
	var radio1 = document.createElement("<input type=\"radio\" name=\"choice\" "＋"value=\"1\">");
	var radio2 = document.createElement("<input type=\"radio\" name=\"choice\" "＋ "value=\"2\">");
}
```

这种方式有助于避开在 IE7 及更早版本中动态创建元素的某些问题。下面是已知的一些这类问题：


+ 不能设置动态创建的iframe元素的 name 特性
+ 不能通过表单的 reset()方法重设动态创建的&lt;input&gt;元素
+ 动态创建的 type 特性值为"reset"的button元素重设不了表单
+ 动态创建的一批 name 相同的单选按钮彼此毫无关系。 name 值相同的一组单选按钮本来应该用于表示同一选项的不同值，但动态创建的一批这种单选按钮之间却没有这种关系

***由于这样的用法要求使用浏览器检测，因此我们建议只在需要避开 IE 及更早版本中上述某个问题的情况下使用。其他浏览器都不支持这种用法***

##6.  元素的子节点

> 元素可以有任意数目的子节点或后代节点，因为元素可以是其他元素的子节点，子节点包含：
+ 元素
+ 文本节点
+ 注释
+ 处理指令


```
<ul id="myList">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>

```

+ 如果是IE来解析这些代码那么&lt;ul&gt;元素会有 3 个子节点，分别是 3 个&lt;li&gt;元素
+ 如果是在其他浏览器中，&lt;ul&gt;元素都会有 7 个元素，包括 3 个&lt;li&gt;元素和 4 个文本节点