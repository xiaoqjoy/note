<template>
  <div>
    <p>这是index页面，已实现路由跳转{{ msg }}</p>
    <p>{{ counts }}-----------------index页面</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      counts: this.$store.state.count,
      msg: ''
    }
  },
  name: "index",
  created() {
    this.test();
  },
  watch: {
    count(news, olds) {
      if (news != olds) {
        this.msg = '888888888888888'
        alert(88888888888888)
      }
    }
  },
  computed: {
    ...mapState(['count'])
  },
  mounted() {
    console.log(this.$store.state.name);    //调用vuex里面的状态值需要在mounted里执行
    //this.$store.commit('increment');
    //this.$store.dispatch('incrementAsync')
  },
  methods: {
    test() {
      this.query().then(res => {      //这里的res就是2，resolve传过来的
        console.log(res)
      })
    },

    query() {
      return new Promise(function (resolve, reject) {
        if (1) {
          resolve(2)
        } else {
          reject(3)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
