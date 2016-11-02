## javascript 数据类型
> ECMAScript中有5种简单的数据类型（基础数据类型）和一种复杂数据数据类型：
  
  * Undefined
  * Null
  * Boolean
  * Number
  * String 
  * Object

### typeof检测数据类型
> 鉴于ECMAScript 是松散类型的，因此需要一种手段来检测给定变量的数据类型--typeof就是负责提供这方面信息的*操作符*。对一个值使用typeof操作符可能返回下列某个字符串：

  * "undefined"----未定义
  * "boolean"------布尔值
  * "number"-------数值
  * "string"-------字符串
  * "object"-------对象
  * "function"-----函数

例子：
```javascript
var message = 'some string';
alert(typeof message);      //string
alert(typeof(message));		//string
alert(typeof 95);			//number
```
---

### 1. Undefined类型

> Undefined类型只有一个值，即特殊值undefined。在使用var声明变量但未对其加以初始化时，这个变量的值就是undefined。

例如：

```javascript
var message;
console.log(message == undefined);    // true
```

> 对于未初始化的变量执行typeof操作符会返回undefined值，而对于未声明的变量执行typeof操作符同样也会返回undefined值。

例子：
```javascript
var message;
console.log(typeof message);	// "undefined"
console.log(typeof age);		// "undefined"
```
---

### 2. Null类型

> Null类型是第二个只有一个值得数据类型，这个特殊的值是null。从逻辑角度来看，null值表示一个空对象指针，这也正是**typeof操作符检测null值时会返回"object"的原因。

例如：
``` javascript
var car = null;
console.log(typeof car);	// "object"
```
> 实际上，undefined值是派生自null的值，因此ECMA-262规定对它们的相等性测试要返回true。

例如：
``` javascript
console.log(undefined == null);		// true
```
---

### 3. Boolean类型


> 是ECMAScript中使用的最多的一种类型，该类型只有两个字面值：true和false。值得注意的是：区分大小写（True和False不是Boolean类型），然而ECMAScript中所有类型都这两个Boolean等价的值。

例如：
``` javascript
var message = "hello world!";
var msgAsBool = Boolean(message);
```

**各种数据类型与Boolean对应的转换规则**：

|数据类型          |转换为true的值             |转换为false的值        |
| ------------  | :----------------------: | :------------------: |
|Boolean          | true                     | false                |
|String           | 任何非空字符串            | ""（空字符串）        |
|Number           | 任何非零数字值（包括无穷大）|0和NaN                |
|Object           | 任何对象                  |null                  |
|undefined        | 无							|undefined			|

> 这些转换规则对于理解流程控制语句（例如if语句）自动执行相应的Boolean转换非常重要。

例如：
``` javascrip
var msg = "hello world!";
if(msg){
	console.log('value is true');
}
```                             
> *上面这个示例存在自动执行Boolean转换，因此确切地知道流程控制语句中使用的是什么变量只管重要*。

---

### 4. Number类型

> Number类型是EMCAScript最关注的类型；使用IEEE754格式来表示整数和浮点型数值。为了支持各种数值类型，ECMA-262定义了不同的数值字面量格式。

* 十进制字面量。
```javascript
	var intNum = 55;  //整数
```

* 八进制字面量，第一位必须是**0**，然后是八进制数字序列（0~7）。如果字面值数值超出范围，那么前面的零将被忽略，后面数值当成十进制解析。
```javascript
	var actalNum = 070;   //八进制的56
	var actalNum2 = 079;  //十进制79
	var actalNum3 = 08;   //十进制8
```
***八进制字面量在严格模式下是无效的；引擎抛出错误。***

* 十六进制字面量，前两位必须是0x，后面任何十六进制数字（0~9及A~F）。其中字母A~F可以大写，也可以小写。
```javascript
var hexNum1 =0xA;    //十六进制的10
var hexNum2 =0x1f;   //十六进制的31
```
***进行算术计算时，所有八进制和十六进制表示的数值都将转换成十进制数值。***

###只有32位的整数才可以进行位操作，如果不是会转换为32位整数后在进行位运算操作###

#### 4.1 浮点数值

> 所谓浮点数值，就是该数值中必须包含一个小数点，小数点后面必须要有一位数字。但小数点前面可以没有整数___不推荐这种写法___。

例如：
```javascript
	var floatNum1 = 1.1;
	var floatNum2 = 0.1;
	var floatNum3 = .1      //有效，但不推荐
```

> 由于保存浮点数值需要的内存空间是保存整数的*两倍*，因此ECMAScript会不失时机的将浮点数值转换为整数值。
* 小数点后面没有跟任何数字--转换为整数保存
* 如果浮点型表示的就是一个整数，该值也会被转换为整数

例如：
```javascript
	var f1 = 1.;	//整数1
	var f2 = 1.0;	//整数1
```

> 极大或极小的数值，可以采用e表示法(*科学计数法*)表示浮点数值。等于e前面数值乘以10的指数次幂。

* e前面可以使整数、浮点数；中间可以是大小写字母E/e;后面是10的幂指数
例如：
```javascript
	var floatNum = 3.125e7;		// 等于312500000
```

* 可以表示极小的数值；如0.0000000000000000003（3e-17）。默认情况下,ECMAScript会将那些小数点后面带有6个0以上的浮点数值转换为以e表示法的数值。

* 浮点计算精度极低，最高精度是***17位小数***。
```javascript
	if(a+b == 0.3){				
		//请不要做这样的测试！结果通常是0.3000000000000004
		console.log('You got 0.3.');
	}
```

#### 4.2 数值范围

> Number能表示出的数值位于Number.MIN_VALUE和Number.MAX_VALUE之间。也包括负值和0。超出部分使用Infinity（正无穷）与-Infinity（负无穷）来表示。Infinity无法参与数值计算。可用isFinite()函数判断操作。

```javascript
	var result = Number.MIN_VALUE + Number.MAX_VALUE;
	console.log(reuslt);		//false
```

> 对于整数，根据ECMAScript标准的要求（<http://ecma262-5.com/ELS5_HTML.htm#Section_8.5>）Javascript能表示并进行精确算术运算的整数范围为：正负2的53次方，##也即从最小值-9007199254740992到最大值+9007199254740992之间的范围##；对于超过此范围数值，JavaScript依然可以运算，但不保证运算结果精度。

###值得注意的是，对于整数的位运算（比如移位等操作），JavaScript仅支持32位的整型数。即：-2147483648到+2147483647之间的整数###


#### 4.3 NaN

> NaN，即非数值（是一个特殊的数值），这个数值用于表示一个本来要返回数值的操作数未返回数值的情况（**避免不抛出错误**）。

* 涉及任何NaN的操作都会返回NaN
* NaN与任何值都不想等，包括NaN本身。
例如：
```javascript
	console.log(NaN == NaN);  //false
```

> 针对NaN的特点，ECMAScript定义了isNaN函数。接收一个参数，判断参数是否**不是数值**。任何不能转换为数值的尝试都会返回true。

例如：
```javascrip
	console.log(isNaN(NaN));					//true
	console.log(isNaN(10));						//false
	console.log(isNaN("10");					//false
	console.log(isNaN("green"));				//true
	console.log(isNaN(true));					//false;会转换为1
```
***isNaN同样也适用于对象，基于对象调用会先调用对象的valueOf()方法，然后确定该返回的值是否可以转换为数值。不能就基于返回的值在调用toString()方法在测试返回值***。

#### 4.4 数值转换

> 有三个函数可以把非数值转换为数值：Number()、parseInt()和parseFloat()。
* Number适合任何数据类型。
* 另外两个专门把字符串转换成数值类型。

Number函数转换规则：
* Boolean值，true和false将分别转换为1和0
* 数值，简单传入和返回
* null值，返回0
* undefined，返回NaN
* 如果是字符串，遵循以下规则：
	- 只包含数字（前面带正号和负号），转换为十进制数值(忽略前导0)。
	- 包含有效浮点型格式，转换为浮点数值（忽略前导0）。
	- 包含有效十六进制格式，转换为十进制数值。
	- 如果是空字符串，转换为0。
	- 除上以外都转换为NaN。
* 如果是对象，调用ValueOf取值并转换，如果是NaN。则调用对象的toString()，然后再按照上面字符串的规则转换。

```javascript
	console.log(Number(true));			//1
	console.log(Number(11));			//11
	console.log(Number(null));			//0
	console.log(Number(undefined)); 	//NaN
	console.log(Number("Hello World"));	//NaN
	console.log(Number(""));			//0
	console.log(Number("oxF"));			//15

```

parseInt函数只针对字符串转换数值，转换规则如下：
* 顺序解析，忽略前面的字符前面空格。如果第一个字符不是**数值**或**负号**，返回NaN
* 如果第一个是数值字符，继续解析第二个。直到解析完所有后续字符或遇到非数值符号停止。
* 能自动识别出所有整数。***建议加上第二个参数表示进制数值***

```javascript 
	var num1 = parseInt("1234blue");		//1234
	var num2 = parseInt("");				//NaN
	var num3 = parseInt("0xA")；				//10
	var num4 = parseInt("22.5");			//22
	var num5 = parseInt("070");				//56
	var num6 = parseInt("70");				//70
	var num7 = parseInt("70", 8);			//56
```

parseFloat函数只针对字符串转换为浮点型，转换规则如下：
* 忽略空格字符，从第一个字符开始解析每个字符。遇到非浮点数字字符结束。
* 字符中的第一个小数点是有效的，第二个小数点就无效。因此后面的字符串也会被忽略。

```javascript
	var num1 = parseFloat("123blue");
	var num2 = parseFloat("0xA");
	var num3 = parseFloat("22.5");
	var num4 = parseFloat("22.32.4");
	var num5 = parseFloat("090824.5");
	var num6 = parseFloat("3.123e7");			//31230000
```
---------------------------------------------------------

### 5. String

> String类型是用于表示由零个或多个16位Unicode字符组成的字符串序列，即字符串。字符串可以用**双引号**或**单引号**表示（必须成对出现，否则报错）。

```javascript
	var str1 = "gest";
	var str2 = "teacher";
	var str3 = 'hello world";				//错误写法
```

#### 5.1 字符字面量

> String数据类型包含一些特殊的字符字面量，也叫转义序列，用于表示非打印字符或具有其他用途的字符。常用字符如下表

|字面量			|含义							|
|---------------|-------------------------------|
|\n             |换行							|
|\t				|制表							|
|\b				|空格							|
|\r				|回车							|
|\f				|进纸							|
|\\				|斜杠							|
|\'				|单引号(')						|
|\"				|双引号（"）						|
|\xnn			|以十六进制代码nn表示的一个字符（其中n为0-F）。例如,\x41表示"A" |
|\unnnn			|以十六进制代码nnnn表示的一个Unicode字符（其中n为0-F）。例如，\u03a3表示希腊字符Σ |							 

***任何字符串长度都可以通过访问length属性取得，属性取得字符数包括16位字符的数目。如果字符是双字节。length可能不会精准的返回字符串中的字符数目***。

#### 5.2 字符串的特点

> ECMAScript中的字符串是不可变的，也就是说，一个字符串一旦创建，他们的值就不能改变。改变某个*变量保存的字符串*，首先要销毁原来的字符串，然后再用另一个包含新值得字符串填充该变量。

例如：
```javascript
	var lang = "Java";
	lang = lang + "Script";
```

**实现这个操作的过程如下**：
- 首先创建一个能容纳10个字符的新字符串，
- 然后再这个字符串中填充"Java"和"Script"。
- 最后一步是销毁原来的字符串"Java"和字符串"Script"，因为两个字符串没用了。


#### 5.3 转换为字符串

* 几乎每个值都有toString()方法。但undefined和null没有。
```javascript
	var age = 11;
	var ageAsString = age.toString();		//字符串"11"
	var found = true;
	var foundAsString = found.toString();	//字符串"true"
	var test;
	test.toString();						//error
	var obj = null;
	obj.toString();							//error
```
**toString()有一个参数，可以定义输出数值基数。即：可以输出二进制、八进制、十进制、十六进制**。
```javascript
	var num =10;
	console.log(num.toString(10));		//10
	console.log(num.toString(2));		//1010
	console.log(num.toString(8));		//12
	console.log(num.toString(16));		//a
	console.log(num.toString());		//10
```

* String()函数，这个函数能将任何类型的值转换为字符串。遵循如下规则：
	* 如果有toString()方法，调用方法转换结果
	* 如果值是null，则返回null
	* 如果值是undefined，则返回"undefined"
```javascript
	var v1 = 10;
	var v2 = true;
	var v3 = null;
	var v4;
	console.log(String(v1));		//"10"
	console.log(String(v2));		//"true"
	console.log(String(v3));		//"null"
	console.log(String(v4));		//"undefined"
```

--------------------------------------------------------------

### 6. object类型

> ECMAScript中的对象其实就是一组数据和功能的集合。对象可以通过执行new操作符后跟创建的对象类型名称来创建。而创建Object类型的类型的实例并未其添加属性和方法，就可以创建自定义的对象。

```javascript
	var o = new Object();
	var o1 = new Object;				//有效但不推荐如此创建
```

任何Object的每个实例都具有以下属性和方法。
* constructor:保存着用于创建当前对象的函数，即：构造函数（constructor）---Object()

* hasOwnProperty(propertyName):用于检查给定的属性在当前对象实例中（而不是在其原型中）

* isPrototypeOf(object):用于检查传入的对象是否是传入的对象的原型。

* propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用for-in语句来枚举。

* toLocaleString():返回对象的字符串表示，与执行环境的地区对应。

* toString():返回对象的字符串表示。

* valueOf():返回对象的字符串、数值或布尔值表示。

















