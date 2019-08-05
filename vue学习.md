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


