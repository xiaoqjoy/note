<template>
  <div>
    <h1>{{ $store.state.a }}</h1>
    <h2>{{ a }}</h2>
    <h3>{{ setPar }}</h3>

    <button @click="btn">按钮</button>

    <button @click="SOME_MUTATION">BTN</button>
    <br/>
    <br/>

    <button @click="REDUCE">-</button>

    <p>{{ count }}</p>

    <button @click="ADD">+</button>

    <br/>

    <p>合计:<span>{{ total }}</span></p>

    <br/>

    <button @click="addElse">按钮1</button>

    <ul>
      <li v-for="(item, index) in listName" :key="index" @click="getName(item.name)">{{item.name}}</li>
    </ul>
    <p>{{ userName }}</p>
    <p>vue针对滚动元素内部大量元素，但只有部分元素可见，对dom懒渲染，节省内存的优化</p>
    <div class="list" style="height: 300px;overflow: scroll" ref="scrollDom" @scroll="scroll">
      <div :style="{height:list.length*40+'px'}"></div>
      <div style="position:absolute;width: 100%" :style="{top:startIndex*40+'px'}">
        <div v-for="(item,index) in splitData" :key="index" class="item">
          <div v-html="item.id"></div>
          <div v-html="item.name"></div>
          <div v-html="item.createTime"></div>
          <div>
            <Button>修改</Button>
            <Button>删除</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  created() {
    //this.$store.commit('run')


    for (let i = 0; i < 10000; i++) {
      this.list.push({
        id: 1,
        name: 'name' + i,
        createTime: '2018-09-09'
      })
    }
  },
  mounted() {
    console.log(this.$store)
  },
  computed: {
    limitCount() {
      return 300 / 40 + 2;
    },
    splitData() {
      return this.list.slice(this.startIndex, this.startIndex + this.limitCount)
    },
    ...mapState(['a', 'listName', 'userName', 'count', 'total']),
    ...mapGetters(['setPar'])
  },
  data() {
    return {
      startIndex: 0,
      list: []
    }
  },
  methods: {
    ...mapMutations(['run', 'setName','SOME_MUTATION', 'ADD', 'REDUCE']),
    ...mapActions(['addFn']),
    addElse(){
      this.addFn({
        a: 2
      })
    },
    btn() {
      this.run()
    },
    getName(name) {
      this.$store.commit('run')
      console.log(this.a)
      //this.userName = name
      this.setName({    //这里传值必须是对象   这里相当于把值保存到vuex里面了，别的页面也可以使用
        name
      })
    },
    scroll() {
      // 根据滚动的距离，估算出这个滚动位置对应的数组序列，例如滚动100px，每条40px，对应第3条
      let scrollTop = this.$refs.scrollDom.scrollTop;
      this.startIndex = Math.floor(scrollTop / 40);
    }
  }
}
</script>
<style scoped>
.list {
  border: solid 1px #5f5f5f;
  background-color: white;
  margin: 100px 0;
  padding: 5px;
  width: 500px;
  position: relative;
}
.item {
  display: flex;
  height: 40px;
}
.item div {
  flex-grow: 1;
  border: solid 1px #9e9e9e;
  padding: 3px;
}
</style>