# CSS 零碎知识总结

## Float 和Clear

[CSS浮动(float,clear)通俗讲解](http://www.cnblogs.com/iyangyuan/archive/2013/03/27/2983813.html)
[对CSS中的Position、Float属性的一些深入探讨](http://www.cnblogs.com/coffeedeveloper/p/3145790.html)

文档标准流：块级元素独占一行，即使宽度很小

浮动：让某个块级元素脱离标准流，漂浮在标准流之上和标准流不在同一层次，浮动元素总是在标准元素之上。（类似于z-index默认更大一样）

#### 浮动规则
假如某个DIV元素A是浮动的
+ 如果A元素的上一个元素也是浮动的，那么A元素会紧跟上一个浮动元素后面-----【如果一行放不下这两个元素，那么A元素会被挤到下一行】

+ 如果A元素的上一个元素是标准流中的块级元素，那么A的垂直位置不会改变，也就说A元素的顶部总是和上一个元素底部对齐

+ DIV的顺序是HTML代码中的DIV顺序决定的

+ 如果该元素的下一个兄弟元素中有内联元素（通常是文字），则会围绕该元素显示，形成类似于【文字环绕图片】的效果
+ 如果下一个兄弟元素设置同一方向的float，则会紧随其后
+ 该元素变成了块级元素，相当于给该元素设置了display:inline-block(display:absolute一样)



####  清除浮动

  清除浮动可以理解为打破横向排列

  语法：

       clear : none | left | right | both
取值：

       none  :  默认值。允许两边都可以有浮动对象

       left   :  不允许左边有浮动对象

       right  :  不允许右边有浮动对象

       both  :  不允许有浮动对象


 clear规则：对于CSS的清除浮动（clear），一定要牢记，这个规则只能影响使用清除元素的本身，不能影响其他元素

## 盒子模型

  [CSS几个最核心的概念](http://geekplux.com/2014/04/25/several_core_concepts_of_css.html)

低于IE9，最终宽度为：

	宽度 = width(200px) + margin(20px * 2) = 240px;

W3C标准，真实宽度只计算Content的宽度，最终宽度计算：
	
	宽度 = width(200px) + padding(10px * 2) + border(5px * 2) + margin(20px * 2) = 270px;


W3C最终为了解决宽度不好理解，非人类思维。在CSS3中添加了box-sizing这个属性。若设置box-sizing：border-box时，就包好了padding和border的宽度：

```
*,*:before, *:after{
	-moz-box-sizing:border-box;
	-webkit-box-sizing:border-box;
	box-sizing:border-box;
}

```


**无宽度的两种特殊情况**：
+ 无宽度--绝对定位（position：absolute）
+ 无宽度--浮动（float）元素

它们在页面上的表现均不占据空间（脱离标准流，感觉像在页面上层一样，移动也不影响其它元素的定位）

## Position

> 当position设置为relative的时候，元素依然 在普通留中，位置是正常为相对于left、top、bottom、right的偏移，会影响到其它的元素位置（**发生重排和重绘**）。

当一个元素的position值为obsolute或fixed的时候，会发生三件事情：

+ 把该元素往Z轴方向移了一层，元素脱离了普通流，所以不再占据原来的那层空间，还会覆盖下层的元素
+ 该元素将变成块级元素，相当于给该元素设置了display:block;(例如：span元素，设置为position:absolute，发现它可以设置高宽了)
+ 如果该元素是块级元素，元素的宽度由原来的width：100%（占据一行）变成auto


由此观之，***当 position 设置为 absolute 或 fixed，就没必要设置 display 为 block 了。而且如果你不想覆盖下层的元素，可以设置 z-index 值 达到效果***。












