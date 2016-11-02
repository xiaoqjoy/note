# 基本包装类型

> 为了便于操作基本类型值，ECMAScript还提供了3个特殊的引用类型：Boolean、Number、String。不仅具有其他引用类型的特性，同时也具有与各自的基本类型响应的特殊行为。

***实际上，每当读取一个基本类型的值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据***

```javascript
var s1 = "some text";       //基本类型值
var s2 = s1.substring(2);   //自动创建String实例，调用substring方法处理基本类型值
```

*处理基本类型值真实处理过程*
+ 创建String（基本包装类型）的一个实例
+ 在实例上调用指定的方法
+ 销毁这个实例

可以将以上的三个步骤想象成是执行了一段ECMAScript代码。
```javascript
var s1 = "some text";
var tempStr = new String(s1);
var s2 = tempStr.substring(2);
tempStr= null;
```

***以上的三个操作步骤也分别适用于Boolean和Number类型对应的布尔值和数字值***

--------------------------------------------------------------

***引用类型和基本包装类型的最主要区别：对象的生存期***
> 使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即销毁。***这意味的我们不能再运行时为基本类型值添加属性和方法***。

```javascript
var s1 = "some text";
s1.color = "red";
console.log(s1.color);      //undefined
```

> 对于基本包装类型调用typeof会返回"object"，***特殊的Object构造函数传入基本类型值会自动转换为基本包装类型***

```javascript
var obj = new Object('some text');
console.log(obj instanceof String);     //true
var obj2 = new Object(123);
console.log(obj2 instanceof Number);    //true
```

> 注意：***使用new调用基本包装类型的构造函数，与直接调用同名的转型函数是不一样的***

```javascript
var value = "32";
var number = Number(value);
console.log(typeof number);        //"number"

var obj = new Number(value);
console.log(typeof obj);            //"object"
```

**这个例子中,number保存的是基本类型值。而obj保存的是Number的包装类型实例**

## Boolean类型

> Boolean类型是与布尔值对应的引用类型。

```javascript
var falseObject = new Boolean(false);
var falseValue = false;

console.log(typeof falseObject);      //object
console.log(typeof falseValue);       //boolean
console.log(falseObject instanceof Boolean);      //true
console.log(falseValue instanceof Boolean);       //false
```

## Number类型

> Number是与数字值对应的引用类型。

***常见的数值包装类型的实用方法***
+ toFixed(decimalDigit) 会按照指定的小数位返回数值的字符串值表示，能够自动四舍五入处理。
+ toExponential(decimalDigit) 会按照指定的小数位返回以指数表示法的数值字符串值表示。
+ toPrecision(digit) 会按照所有数字的位数返回固定大小或指数的格式，自动截断或进位表示。

```javascript 
var num = 99.32457;

console.log(num.fixed(3));      //"99.325"
console.log(num.toExponential(2));  //"9.93e+1"
console.log(num.toPrecision(1));    //1e+2"
```

## String类型

> String类型是字符串的对象包装类型。

***String对象的方法也可以在所有的基本字符串值中访问到。其中继承的valueOf（）、toLocaleString（）和toString（）方法，都返回对象所表示的基本字符串值***

```javascript
var stringObj = new String('hello World');
console.log(stringObj.toString());
console.log(stringObj.valueOf());
```

> length属性, String类型的每一个实例都有一个length属性，表示字符串中包含多个字符。***即使字符串中包含双字节字符（不是占一个字节的ASCII字符），每个字符也仍然算一个字符***。

```javascript
var s = new  String('sdsd多岁的ff');
console.log(s.length);              //9
```


###1. 字符方法

> 用于访问字符串中特定字符的方法：
+ charAt(index) 以单字符字符串的形式返回给定位置的那个字符
+ charCodeAt(index) 返回给定位置的那个字符的字符编码

```javascript
var stringValue = "teacher";
console.log(stringValue.charAt(1));     //"t",注意是单字符串值
console.log(stringValue.charCodeAt(1)); //"101",字符编码
```

***ECMAScript5中还定义了另一个访问个别字符串的方法。在支持此方法的浏览器中，可以使用括号加数字索引来访问字符串中的特定字符，目前支持的浏览器IE8+以及其他浏览器***

```javascript
var str = "technology";
console.log(str[1]);        // "e"
```

###2. 字符串操作方法

> 常用的字符串操作方法
+ concat(str,...) 将一个字符串或多个字符串拼接起来，返回拼接得到的新字符串。与实用**+**相同。
+ slice(startIdx, endIdx) 传入一个或两个参数, 返回操作字符串的一个子字符串。
+ substr(startIdx, length) 传入一个或两个参数，返回操作字符串的一个子字符串。
+ substring(startIdx, endIdx) 传入一个或两个参数，返回操作字符串的一个子字符串。

```javascript
var str = "hello world";
console.log(str.slice(-3));     // rld
console.log(str.substring(-3)); //hello world
console.log(str.substr(-3));    //rld

console.log(str.slice(3, -4));  //lo w
console.log(str.substring(3, -4));  //hel
console.log(str.substr(3, -4));     //""
```

区别：
+ slice和substr传入第一个参数传入负值，会自动加上length * N + index来使用。而substring传入负值直接转换为0使用。
+ 当第二个参数为负值时，slice方法会自动加上length * N + index; substr和substring都会自动转换为0。而substring会自动从小的位置开始；substr则不会，直接返回空字符串。

###3. 字符串位置方法

> 查找子字符串的两个常用方法：
+ indexOf(str, srchIdx) 获取str字符串值在整个字符串中的第一个位置。从srchIdx向后进行查找，直到找到返回索引。
+ lastIndexOf(str, srchIdx)获取str字符串值在整个字符串中的第一个位置。从srchIdx向前进行查找，直到找到返回索引。

```javascript
var str = "hello world";
console.log(str.indexOf('o', 6));       //7
console.log(str.lastIndexOf('o', 6));   //4
```


###4. trim()方法

> ECMAScript5为所有字符串定义了trim()方法。这个方法会创建一个字符串副本，删除前置以及后缀的所有空格，然后返回结果。
+ trim()      删除前置以及后置空格
+ trimLeft()  删除前置空格
+ trimRight() 删除后缀的空格

```javascript
var str = "  clock  ";
console.log(str.trim());      //clock
console.log(str.trimLeft());  //clock   
console.log(str.trimRight()); //   clock
```

***目前支持该特性的浏览器IE9+、FF3.5+、Safari5+、Opera10.5+等***

###5. 字符串大小写转换方法

> 字符串大小写转换有关的方法
+ toLowerCase()
+ toLocaleLowerCase()
+ toUpperCase()
+ toLocaleUpperCase()

###6. 字符串的模式匹配方法

> match() 在字符串上调用这个方法，本质上与调用Regex的exec()方法相同。match()方法只接受一个参数，要么是一个正则表达式，要么是一个RegExp对象。

```javascript
var text = "cat, bat, sat, fat";
var pattern = /.at/;

var matches = text.match(pattern);
console.log(matches.index);
console.log(matches[0]);
console.log(matches.lastIndex);

```

> search() 方法与match()方法的参数一致；返回字符串中第一个匹配项的索引

```javascript
var text = "cat, bat, sat, fat";
var pattern = /.at/;

var pos = text.search(pattern);
console.log(pos);               //1
```

> replace() 接收两个参数：第一个参数可以是RegExp对象或字符串，第二个参数可以是一个字符串或函数。
+ 正则替换，第一个参数时正则表达式字面量或对象，按照正则匹配替换
+ 字符串替换，直接替换匹配到的第一个匹配项替换字符

```javascript
var text = "cat, bat, sat, fat";
var result = text.replace("a", "on");
console.log(result);                    //"cont, bat, sat, fat"

result = text.replace(/a/g, "on");
console.log(result);                    //"cont, bont, sont, font"
```

***若第一个参数时RegExp，第二个参数字符串，那么还可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中。下表列出了ECMAScript提供的这些特殊的字符序列***

|字符序列           | 替换文本          |
|-------------------|-------------------|
|$$                 |$                  |
|$&                 |匹配整个模式的子字符串。与RegExp.lastMatch的值相同|
|&'                 |匹配的子字符串之前的子字符串。与RegExp.leftContext的值相同|
|&`                 |匹配的子字符串之后的子字符串。与RegExp.rightContext的值相同|
|&n                 |捕获组专有，匹配第n个捕获组的子字符串。没有捕获组则使用空字符串|
|&nn                |捕获组专有，匹配第nn个捕获组的子字符串。没有捕获组则使用空字符串|

```javascript
var text = "cat, bat, sat, fat";
var result = text.replace(/(.at)/g, "word($1)");
console.log(result);    //"word(cat), word(bat), word(sat), word(fat)"
```

***replace()方法的第二个参数也允许是函数。在只有一个匹配项的情况下，会向函数传递3个参数***
+ 模式的匹配项
+ 模式匹配项在字符串中的位置
+ 原始字符串

```javascript
function htmlEscape(text){
  return text.replace(/[<>"&]/g, function(match, pos, originalText){
    switch(match){
      case '<':
        return "&lt;";
      case '>':
        return "&gt;";
      case '&':
        return "&amp;";
      case '\"':
        return "&quot;";
    }
  });
}

console.log(htmlEscape("<p clas=\"myClass\"> hello my world </p>"));   
//&lt;p clas=&quot;myClass&quot;&gt; hello my world &lt;/p&gt;

```

> split() 这个方法可以基于指定的分隔符将一个字符串分隔成多个子字符串，并将结果放到一个数组中
+ 分隔参数为字符串
+ 分隔参数为RegExp对象

```javascript
var colorText = "red, blue, green, yellow";
var c1 = colorText.split(",");          //["red", "blue", "green", "yellow"]
var c2 = colorText.split(",", 2);       //["red", "blue"]
var c3 = colorText.split(/[^\,]+/);     //["", ",", ",", ",", ""]
```

***split()方法可以接受可选的第二个参数， 第二个参数用于指定数组的大小，以便确保返回的数组不会超过既定的大小***

###7. localeCompare()方法

> 该方法比较两个字符串，并返回整数值
+ 1 表示字符串在字母表中应该排在字符串参数之后
+ 0 表示字符串在字母表中与字符串参数相等
+ -1 表示字符串在字母表中排在字符串参数之前

```javascript
var str = "yellow";
console.log(str.localeCompare("brick"));    //1
console.log(str.localeCompare("yellow"));   //0
console.log(str.localeCompare("zoom"));     //-1
```

***该方法优势在于实现所支持的地区（国家和语言）决定了这个方法的行为***

###8. fromCharCode()方法

> String构造函数本身的一个静态方法，处理一或多个字符编码，然后将他们转换为一个字符串。从本质上来看，这个方法与实例方法charCodeAt执行的是相反的操作。

```javascript
console.log(String.fromCharCode(104,101,108,108,111));    //"hello"
```

###9. HTML方法 （已废弃）















