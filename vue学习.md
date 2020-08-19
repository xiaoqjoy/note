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


<<<<<<< HEAD


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






=======
----------------------------------

vue双向绑定的原理

VUE实现双向数据绑定的原理就是利用了 Object.defineProperty() 这个方法重新定义了对象获取属性值(get)和设置属性值(set)的操作来实现的



------------------------------------


hash模式和history模式的不同


hash  	hash虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面		hash模式背后的原理是onhashchange事件


history		HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法(IE9+支持)



---------------------------------------  


Vuex

>>>>>>> 4549d6ddd466af713ace28af0898ac3d64529a66















