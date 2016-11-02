# 引用类型 

## Object类型

> Object类型是日常引用类型中最常用的类型。创建Object对象的方法有两种
+ 使用new对象创建对象
+ 直接使用字面量表示法创建

```javascript
var obj = new Object();
var obj2={aa:test};
```

> Object常用的访问属性方法
+ 使用.号直接访问，访问的字符串不能包括空格
+ 使用[]加字符串访问，允许属性名称加空格


```javascript
var obj = {};
obj.name = "linq";
obj["i q"] = 11;
```

## Array类型

> ECMAScript中常用的类型，存储有序列表数据的数组，但与一般面向对象数组不同：
+ 每一项数据类型动态化，即：每一项的数据类型因存储数据的类型而定。
+ 数组的大小动态变化，即：随的数据的增加而自动增长

```javascript
var arr = Array(1);
arr.push("tt");
arr.push("test");
arr.push(true);       //测试arr的length为3
```

> 实例化数据Array对象常见的有两种方式：
* new实例化，允许传入多个参数依次作为数组项存入数组。若传入一个参数且为数字，会当成数组初始长度参数。
* 字面量实例化（[]）。

```javascript
var arr1 = new Array();
var arr2 = new Array(3);
var arr3 = new Array("tt","qqq", "ddd");
var arr4 = ["addddd"];
var arr5 = Array(10);
var arr6 = Array(10, 23,35,3);
```

***注意：数组实例化也可以省略new。和带New用法含义一模一样***

> 数组的访问特点和length妙用
* 数组使用[]访问，一般与正常语言访问一致。但若index超出length时，会自动扩充数组大小并返回undefined值
* length属性可读写。修改length的值可以扩充/缩减数组长度。

```javascript
var arr = new Array("red", "green", "blue");  
arr[5]="ttt";             //自动扩充长度为6,第4、5项内容为undefined
arr.length = 3;           //删除数组第三项后的内容，并将长度变为3
arr[arr.length] = "test"; //自动增加下一项，相当于push
```

### 1. 检测类型

> ECMAScript3中确定某个对象是不是一个数组就成为经典问题。对于一个网页或全局对象而言，直接使用instanceOf操作符即可。但如果存在两个不同的全局环境时，会存在两个不同的Array构造函数，判断会失效。
为了解决此问题，ECMASCript5中新增了Array.isArray方法。但也只对IE9+、FF4+有效。

```javascript
    // detection Array,default Array.isArray
    window.isArray = Array.isArray || function(obj){
        Object.prototype.toString.call(obj) === '[object Array]';
    };

    console.log(isArray([]));
```

### 2. 转换方法

+ toString  默认会直接返回数组采用逗号分隔字符串
+ valueOf   默认返回数组本身
+ toLocaleString 

###3. 栈操作

> 数组可以当成栈的基本操作：后进先出

* push 进栈（推入）
* pop  出栈（推出）

###4. 队列操作

> 数组也可以当成队列的基本操作：先进先出

* push 入队列
* shift 出队列


###5. 排序方法

> 数组中已经存在两个可以直接用来重排序的方法：sort()、reverse()方法，排序时会调用toString()方法将每一项都转换为字符串，按照字符串ASCII进行排序。

* sort 允许传入一个function作为predicate回调函数，返回值大于0为前一项大于后一项。
* reserve 允许传入一个function作为predicate回调函数，返回值大于0为前一项大于后一项。

```javascript
var arr = [1,3,5,6,3,4,7,345];
arr.sort();             //1,3,3,345,4,5,6,7
aa.sort(function(item1, item2){return item1-item2;}); //1,3,3,4,5,6,7,345
```
###6. 常用数组操作方法

* arr1.concat(arr2) 数组拼接返回新数组，新数组为arr1和arr2元素的总和
* arr1.slice(startidx, endidx) 获取数组部分元素返回新数组。新数组为arr1数组startidx至endidx部分元素。不包含endidx项。
* arr1.splice(startidx, removelen, newitem, ....) 数组增删改函数，功能很是强大。
    + 删除元素splice(startidx, removelen)
    + 替换元素splice(startidx, removelen, newitem, ....)
    + 新增/插入元素splice(startidx, 0, newitem, ....) 

```javascript
var colors = ['red','green','yellow','black'];
colors.splice(1,1); //删除green
colors.splice(1,0,'white'); //新增white
colors.splice(1,1,'green','hat');   //替换white为green,hat
```

###7. 位置方法

> ECMAScript5为数组的实例添加了两个位置的方法：
* indexOf
* lastIndexOf 

***注意：该方法只有IE9+、FF2+等现代浏览器支持。***


###8. 迭代方法

> ECMAScript5为数组的实例添加5个常用的迭代方法:
* every
* some
* each 对数组进行遍历，每一项都调用回调函数。
* filter 对数组中的每一项调用predicate函数，函数返回true的项返回并生成新数组。
* map 对数组中的每一项调用回调函数，将返回的值作为新数组的元素项。

***注意：该方法只有IE9+、FF2+等现代浏览器支持。***

###9. 归并方法

> ECMAScript5还对数组的实例添加了两个归并方法：
* reduce(function(pre, cur, index, arr){})
* reduceRight(function(pre, cur, index, arr){})

```javascript
var v = [1,23,4,345,6,34];
v.reduce(function(pre, cur, index, arr){return pre + cur;});        //直接求和
```

***注意：该方法只有IE9+、FF2+等现代浏览器支持。***

## Date类型

> ECMAScript中的Date类型来自java（java.util.Date），因此也使用UTC（coordinated Universal Time, 国际协调时间）1970年1月1日午夜（零时）开始经过毫秒数来保存日期。使用这种数据存储的条件下，Date日期能够精确到1970年1月1日前后的285616年。

    正常创建一个日期对象，需要使用New和Date构造函数即可。默认情况构造函数不传入参数，新创建的对象自动获取当前日期和时间。

```javascript
var d = new Date();
var d2 = new Date(Date.parse('December 18, 2009'));
```

如果想通过特定的时间创建日期对象，必须按照UTC规则传入毫秒数来实例化日期对象。为了简化这一计算操作，ECMAScript提供了两个方法对非标准UTC参数进行默认的转换处理：

* Date.parse() 接受一个表示日期的字符串参数，然后尝试根据这个字符串返回相应的日期毫秒数
    + '月/日/年'，如6/13/2004
    + '英文月名 日，年'，如january 12,2005
    + '英文星期几 英文月名 日 年 时:分:秒 时区'，如Tue May 23 2010 13:49:45 GMT-0700
    + ISO 8601扩展格式 YYYY-MM-DDTHH:mm:ss.sssZ（例如：2015-02-21T00:00:00）目前只有兼容ECMAScript5才支持这种格式。
* Date.UTC() 接收多个表示数值参数。具体参数分别是：年份、基于0到11的月份、1到31的日、时、分、秒等。其中##年份、月份##必填。

```javascript
var strToD1 = new Date(Date.parse('5/12/2011'));            // new Date('5/12/2011')等价
var numToD2 = new Date(Date.UTC(2000,1,23,21,12,3));        // new Date(2000, 1, 23, 21,12,3);等价
var timestampToD3 = new Date(2344343);                      // timestamp 只为一个参数输入时，当成毫秒数计算
```

> ECMAScript5为了简化当前日期，添加了Date.now()方法。但目前只有现代浏览器支持它：IE9+、FF3+等

```javascript
var d1 = Date.now();
var d2 = Date.now();
var result = d2 -d1; //时间差值
```

***注意上面代码具有浏览器兼容性问题，通常为了解决此问题。直接采用+好转换日期对象即可***
```javascript
var nowD = +new Date();
```

> Date实例对象中valueOf比较特别，会直接返回毫秒数值。通常可以使用它的毫秒值进行日期比较。

```javascript
var date1 = new Date(2011,0,3);
var date2 = new Date(2011,2,1);
console.log(date1 >date2); //false
console.log(date1 <date2); //true,转换成毫秒值直接用数值进行比较
```

###1. 日期组件和方法

> Date类型的方法，都是取得和设置日期值中特定部分的方法。值得注意的是，UTC日期是指在没有时区偏差的情况下（将日期转换为GMT）的日期值。


|方法                       | 说明                                                |
|---------------------------|-----------------------------------------------------|
|getTime                    |获取整个日期的毫秒值，与valueOf方法相同              |
|setTime                    |设置日期的毫秒值，会改变整个日期                     |
|getFullYear                |获取4位年份                                          |
|setFullYear                |设置年份                                             |
|getMonth                   |                                                     |
|setMonth                   |设置月份，参数超过11增加年数                         |
|getDate                    |1----31                                              |
|setDate                    |设置日期月份中的天数，超过增加月份                   |
|getDay                     |获取星期几（0-6）                                    |
|getHours                   |获取日期中的小时数（0-23）                           |
|setHours                   |设置小时数，超过则增加年月分钟的天数                 |
|getMinites                 |获取分钟数（0-59）                                   |
|setMinites                 |设置分钟数，超过则增加小时数                         |
|getSeconds                 |返回日期中的秒数（0-59）                             |
|setSeconds                 |设置日期中的描述，超过则增加分钟数                   |
|getMilliseconds            |获取日期中的毫秒数                                   |
|setMilliseconds            |设置日期中的毫秒数                                   |
|getTimezoneOffset          |返回本地时间与UTC时间相差的分钟数，例如：美国返回300.进入夏令后这个值会有所变化|






