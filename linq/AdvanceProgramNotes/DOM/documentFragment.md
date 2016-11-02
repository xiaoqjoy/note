# DocumentFragment类型

> 所有节点类型中，只有 DocumentFragment 在文档中没有对应的标记。 DOM 规定文档片段（document fragment）是一种“轻量级”的文档。具有如下特征：
+ nodetype的值为11
+ nodeName的值为"#document-fragment"
+ nodeValue的值为null
+ parentNode的值为null
+ 子节点可以是Element、ProcessingInstruction、Comment、Text、CDATASection或EntityReference

***虽然不能把文档片段直接添加到文档中，但可以将它作为一个"仓库"来使用。***


#### createDocumentFragment
> 文档片段继承了Node节点所有方法

```javascript
var fragment = document.createDocumentFragment();
```

#### 批量操作优化渲染
> 我们想为这个<ul>元素添加 3 个列表项。如果逐个地添加列表项，将会导致浏览器反复渲染（呈现）新信息。为避免这个问题，可以像下面这样使用一个文档片段来保存创建的列表项，然后再一次性将它们添加到文档中。

```javascript
var fragment = document.createDocumentFragment();
var ul = document.getElementById("myList");
var li = null;
for (var i=0; i < 3; i++){
	li = document.createElement("li");
	li.appendChild(document.createTextNode("Item " + (i+1)));
	fragment.appendChild(li);
}
ul.appendChild(fragment);

```




