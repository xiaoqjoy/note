<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <children ref="profile" :message="message">
      <div slot="up">
        <span>菜单1</span>
        <span>菜单2</span>
        <span>菜单3</span>
        <span>菜单4</span>
        <span>菜单5</span>
        <span>菜单6</span>
        <span>{{ list }}</span>
      </div>
      <div slot="down">
        <span>88888888888888888</span>
      </div>
      <template slot-scope="user">
        <span v-for="item in user.data" class="user">{{ item }}</span>
      </template>
    </children>

    <span ref="father" @click="getChild">111111</span>



    <div class="tab" ref="tab">
      <ul class="tab_content" ref="tabWrapper">
        <li class="tab_item" v-for="item in itemList" ref="tabitem">
          {{item.title}}
        </li>
      </ul>
    </div>



  </div>
</template>

<script>
  import children from './child'
  import BScroll from 'better-scroll'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: '菜单7',
      message: 'aaaaaaaaaaaaaaaaaa',

      itemList:[
        {
          'title':'关注'
        },
        {
          'title':'推荐'
        },
        {
          'title':'深圳'
        },
        {
          'title':'视频'
        },
        {
          'title':'音乐'
        },
        {
          'title':'热点'
        },
        {
          'title':'新时代'
        },
        {
          'title':'娱乐'
        },
        {
          'title':'头条号'
        },
        {
          'title':'问答'
        },
        {
          'title':'图片'
        },
        {
          'title':'科技'
        },
        {
          'title':'体育'
        },
        {
          'title':'财经'
        },
        {
          'title':'军事'
        },
        {
          'title':'国际'
        }
      ]

    }
  },
  methods: {
    getChild: function(){
      var child = this.$children[0].$refs.child.innerHTML;
      console.log(child)
    },
    InitTabScroll(){
      let width = 0;
      for (let i = 0; i < this.itemList.length; i++) {
        width += this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
      }
      this.$refs.tabWrapper.style.width = width + 'px'
      this.$nextTick(()=>{
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tab, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical'
          });
        }else{
          this.scroll.refresh()
        }
      });
    }
},
  created() {
    this.$nextTick(() => {
      this.InitTabScroll();
    });
  },
  components: {
    children
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  span.user{
    margin: 0 15px;
  }

.tab {
  width: 100%;
  overflow: hidden;
  padding: 5px;
}
.tab_content {
  line-height: 2rem;
  display: flex;
}
.tab_item{
  flex: 0 0 60px;
  width: 60px;
}
</style>
