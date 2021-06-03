<template>
  <div>
    <p style="color: green">vue针对滚动元素内部大量元素，但只有部分元素可见，对dom懒渲染，节省内存的优化</p>
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
export default {
  created() {
    for (let i = 0; i < 10000; i++) {
      this.list.push({
        id: 1,
        name: 'name' + i,
        createTime: '2018-09-09'
      })
    }
  },
  computed: {
    limitCount() {
      return 300 / 40 + 2;
    },
    splitData() {
      return this.list.slice(this.startIndex, this.startIndex + this.limitCount)
    }
  },
  data() {
    return {
      startIndex: 0,
      list: []
    }
  },
  methods: {
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