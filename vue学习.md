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


