mapState是state的语法糖,

用法：
<template>
{{ userInfo }} ...
</template>
import { mapState } from 'vuex';

computed: {
	...mapState([
	  'userInfo',
	  'menuList',
	  'visitedTags',
	  'isAddVisitedTags'
	])
},

computed: mapState({
    count: 'count', // 第一种写法
    sex: (state) => state.sex, // 第二种写法
    from: function (state) { // 用普通函数this指向vue实例,要注意
      return this.str + ':' + state.from
    },
    // 注意下面的写法看起来和上面相同,事实上箭头函数的this指针并没有指向vue实例,因此不要滥用箭头函数
    // from: (state) => this.str + ':' + state.from
    myCmpted: function () {
      // 这里不需要state,测试一下computed的原有用法
      return '测试' + this.str
    }
}),
  
  
  
理解：  用在vuex里直接拿数据出来，而且要放在computed使用


len = val.length;

    if(len > 0){}  IOS搜索注意要加length判断
	
editor.wordWrap   设置vscode自动换行


CRLF 是 carriage return line feed 的缩写；中文意思是 回车换行。


LF 是 line feed 的缩写，中文意思是换行。


replace(/\./g,"-")   匹配.要加\  	


var lenderAmount = $.trim($('#lenderAmount').val())

/^\d+$/.test(lenderAmount)

//获取当前时间
function getNowFormatDate(){
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}


//把json转换成spring自动bind的格式    主要处理有数组的情况
window.toSpringAutoBindForCollection = {
  convert:function(ajaxJsonData){
      return this. internalConvert(ajaxJsonData,{},'',0);
    },
    internalConvert:function(ajaxJsonData,result,prefixKey,level){
      if(!ajaxJsonData){
        return result;
      }
      if(typeof(ajaxJsonData)=='object'){//object 里面有array的情况
        $.each(ajaxJsonData,function(key,value){
          // var value=ajaxJsonData[i];
              if('string'==typeof(value)||'number'==typeof(value)){//是基本类型
                var fillkey=null;
                if(prefixKey){
                  if(ajaxJsonData instanceof Array){
                    fillkey=prefixKey+"["+key+"]";
                      }else{
                        fillkey=prefixKey+"."+key;
                      }
                }else{
                    fillkey=key;
                }

                    result[fillkey]=value;
              }else{
                var nextPrefixKey=prefixKey;
                  if(level<1){
                    nextPrefixKey+=key;
                  }else{
                      if(ajaxJsonData instanceof Array){
                        nextPrefixKey+="["+key+"]";
                      }else{
                        nextPrefixKey+="."+key;
                      }
                  }
                  toSpringAutoBindForCollection.internalConvert(value,result,nextPrefixKey,level+1)
              }
        });
      }
      return result;
    }
}


//无限向下滚动加载分页组件
function loadPage(index, callback){

  if(index == 1){
    callback(index)
  }
  //$('.loading').remove();
  window.onscroll = function (){
    var scrollT = document.documentElement.scrollTop || document.body.scrollTop; //滚动条的垂直偏移
    var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight; //元素的整体高度
    var clientH = document.documentElement.clientHeight || document.body.clientHeight; //元素的可见高度
    if (scrollT == scrollH - clientH) {
      //alert("到底部了");
      if(scrollT == 0){
        return
      }else{
        index++
        callback(index)
      }
    }
  }

}


使用svn进行版本控制，每个文件夹下都有.svn文件夹，有些项目在脱离svn版本控制之后，想删除项目中所有的.svn文件夹，
可用下面的方法进行快速删除：
建立一个文本文件，取名为kill-svn-folders.reg（扩展名由txt改为reg），文件的内容如下：
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\shell\DeleteSVN]
@="Delete SVN Folders"
[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\shell\DeleteSVN\command]
@="cmd.exe /c \"TITLE Removing SVN Folders in %1 && COLOR 9A && FOR /r \"%1\" %%f IN (.svn) DO RD /s /q \"%%f\" \""
find . -type d -name ".svn"|xargs rm -rf
保存之后，双击这个reg文件。成功后，在每一个文件夹上点击右键都会有一个“Delete SVN Folders”的选项，点击之后，
既可以删除这个文件下（包括子文件夹）所有的.svn文件夹。
删除完成后，为了避免误操作，不小心把正处于版本管理中的.svn文件夹删除，最好把刚才的注册信息删除。删除方法是，
打开注册表（在运行中用regedit命令），找到[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\shell\DeleteSVN] ，
把DeleteSVN这个项删除，即可。



//将下面data数组中id重复的数据去掉
let data = [
	{ id: 201801, name: '张三', age: 15, },
	{ id: 201804, name: 'John', age: 18, },
	{ id: 201802, name: '李四', age: 18, },
	{ id: 201801, name: '张三', age: 15, },
	{ id: 201805, name: 'Jack', age: 18, },
	{ id: 201803, name: '王五', age: 10, },
	{ id: 201805, name: 'Jack', age: 18, },
	{ id: 201804, name: 'John', age: 18, },
	{ id: 201805, name: 'Jack', age: 18, },
];

var hash = {};     

this.sub_classList = this.sub_classList.reduce((preVal, curVal) => {    //数组对象去重
	hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal); 
	return preVal 
}, []);


按照id的大小排序
{
	result:[
	  {id:1,name:'中国银行'},
	  {id:3,name:'北京银行'},
	  {id:2,name:'河北银行'},
	  {id:10,name:'保定银行'},
	  {id:7,name:'涞水银行'}
	]
}

function sortId(a,b){  
	return a.id-b.id  
}
result.sort(sortId);
console.log(result); 



vue双向绑定的原理    用v-model就可以实现

VUE实现双向数据绑定的原理就是利用了 Object.defineProperty() 这个方法重新定义了对象获取属性值(get)和设置属性值(set)的操作来实现的




react实现双向数据绑定    单向数据绑定

inputChange = (e)=> {
	this.setState({
		msg: e.target.value
	})
}

<input value={this.state.msg} onChange={this.inputChange} />


react、vue都是单向数据流的框架

规范了数据的流向——由外层组件向内层组件进行传递和更新

单向数据流其实是一种框架本身对数据流向的限制


例子：
var a = {a:1}
var b = a;
b.a=2;
console.log(a)		// {a:2}

我往一个函数内传递一个对象参数，如果在这个函数里修改了这个对象，那么函数外的对象也是会随着改动的(因为本质是一个内存里的东西);
那么设想这样的情景：我父组件的数据通过props传递给子组件，而子组件里更新了props，导致父组件更新——毫无疑问，这是会 导致数据紊乱的、不可控的操作。

因此绝大多数框架在这方面做了处理。
而react在这方面的处理，就是直接规定了(对组件而言，它的)props是只读的，而不是可更改的；




react的单向数据流

React是单向数据流，数据主要从父节点传递到子节点(通过props)
如果顶层（父级）的某个props改变了，React会重渲染所有的子节点。


function child(props){
   this.props = props;
}
function parent(props){ 
   this.props = props              
   this.state = '这是父函数的一个状态'
   this.childNodes  = new child(this.state); 
}
console.log(new parent('这是一个属性'));




react组件通信



子传父(逆向通信) 

父组件拿子组件实例

this.refs.todoList
this.refs.todoList.state.name



远亲组件的通信


export const {Provider,Consumer} = React.createContext();

父组件   App.js

<Provider value={name}>  </Provider>

子组件

import { Consumer } from "../App";    //引入父组件的Consumer容器

//Consumer容器,可以拿到上文传递下来的name属性,并可以展示对应的值
<Consumer>
	{( name ) =>
	 }
</Consumer>




------------------------------------


hash模式和history模式的不同


hash  	hash虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面		hash模式背后的原理是onhashchange事件


history		HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法(IE9+支持)



---------------------------------------  


vue组件之间通信的8种方式


1、props和$emit(常用)


2、$attrs和$listeners


A→B→C

B:	<C v-bind="$attrs" v-on="$listeners"></C>

<!-- C组件中能直接触发getCData的原因在于 B组件调用C组件时 使用 v-on 绑定了$listeners 属性 -->
<!-- 通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的） -->




3、中央事件总线（非父子组件间通信）


通过bus.$emit触发事件，bus.$on监听触发的事件



4、v-model



5、provide和inject


父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量。
不论子组件有多深，只要调用了inject那么就可以注入provider中的数据。


6、$parent和$children

在组件内部可以直接通过子组件$parent对父组件进行操作，父组件通过$children对子组件进行操作


7、vuex


8、路由传参



-----------------------------


前端性能优化方法


1. 减少http请求数

常用的减少http请求数有以下几种：

1）合并图片。当图片较多时，可以合并为一张大图，从而减少http请求数。经常变化的图片可能不太合适，变化相对稳定的就可以考虑。
合并大图除了能减少http 请求数外，还可以充分利用缓存来提升性能。

2）合并压缩css样式表和js脚本，他们的共同目的都是为了减少http连接数。

3）去掉不必要的请求。开发写代码或者系统升级之后残留的无效请求连接。

4）充分利用缓存。这里说的缓存是客户端侧缓存或者说浏览器缓存。Expires头信息是客户端侧缓存的重要依据，格式类似于Expires:sun ,20 Dec 2017 23:00:00 GMT。 
如果当前时间小于Expires指定的时间，浏览器就会从缓存中直接获取相关的数据信息或html文件，如果当前时间大于Expires指定的时间，浏览器会向服务器发送请求来获取相关数据信息。

以Apache为例，可在Apache的配置文件httpd.conf中设置Expires。


2. 图片优化


1）尽可能的使用PNG格式的图片，它相对来说体积较小。

2）对于不同格式的图片，在上线之前最好进行一定的优化。

3）图片的延迟加载，也叫做赖加载。

4）雪碧图合并小图标

3. 使用CDN

CDN即  内容分发网络  ，可以使用户就近取得所需内容，解决网络拥挤的状况，提高用户访问网站的响应速度。

4. 开启GZIP

GZIP即数据压缩，用于压缩使用Internet传输的所有文本资源。开启GZIP的方法很简单，到对应的web服务配置文件中设置一下即可。

以Apache为例，在配置文件httpd.conf中添加。

5. 样式表和JS文件的优化

一般我们会把css样式表文件放到文件的头部。比如，放到<head>标签中，这样可以让CSS样式表尽早地完成下载。对应js脚本文件，一般我们把他放到页面的尾部。

6、JS部分


函数防抖：第一次执行函数后，N秒内不再重复操作此函数方可执行下一次，防止短时间内频繁操作导致页面卡顿。

函数节流：连续频繁操作函数时限制在N秒内才执行一次。


---------------------------------------------------

前端路由的原理


单页面应用指的是应用只有一个主页面，通过动态替换DOM内容并同步修改url地址，
来模拟多页应用的效果，切换页面的功能直接由前台脚本来完成，而不是由后端渲染完毕后前端只负责显示


前端不同页面的状态管理器,可以不向后台发送请求而直接通过前端技术实现多个页面的效果


vue中的vue-router,以及react的react-router均是对这种功能的具体实现


-----------------------------------------------------


$root

通过root访问得到的是根父组件

$refs

通过在子组件标签定义 ref 属性，在父组件中可以使用$refs 访问子组件实例

$parent

访问得到的是它最近一级的父组件



console.log(this.$el);
返回Vue实例的关联DOM元素，在这里是#container

console.log(this.$data);
返回Vue实例的数据对象data，在这里就是对象{msg：”hello，2018“}

console.log(this.$options.address);
返回Vue实例的自定义属性address，在这里是自定义属性address

console.log(this.$refs.hello)
返回含有属性ref = hello的DOM元素（如果多个元素都含有这样的属性，只返回最后一个）





--------------------------------------------------------


深入理解async/await机制



async/await其实是Promise的语法糖，它能实现的效果都能用then链来实现


async是“异步”的简写，await译为等待，所以我们很好理解async声明function是异步的，await等待某个操作完成




 function testAsy(x){
   return new Promise(resolve=>{setTimeout(() => {
       resolve(x);
     }, 3000)
    }
   )
}
async function testAwt(){    
  let result =  await testAsy('hello world');
  console.log(result);    // 3秒钟之后出现hello world
}
testAwt();


await如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。



 function testAsy(x){
   return new Promise(resolve=>{setTimeout(() => {
       resolve(x);
     }, 3000)
    }
   )
}
async function testAwt(){    
  let result =  await testAsy('hello world');
  console.log(result);    // 3秒钟之后出现hello world
  console.log('tangj')   // 3秒钟之后出现tangj
}
testAwt();
console.log('tangSir')  //立即输出tangSir


 await 必须用在 async 函数中
 
 
 

---------------------------------------------------------------


递归的概念简单来说，就是在函数里边调用函数本身


function factorial(n, total=1) {
    if(n === 1){
        return total
    }
    return factorial(n-1, n * total)
}
factorial(5)


-------------------------------------------------------------











