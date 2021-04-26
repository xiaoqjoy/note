<template>
  <div>
    <p>this is test file!</p>
    <span>{{ name }}--------------------test page</span>
    <span ref="dom">{{ count }}-------------------test page</span>
    <p>{{ num }}</p>
    <p>{{ parm }}</p>
    <p>----------------------------------------------++++++++++++++++++++++++++</p>
    <slot></slot>

    <hello />

  </div>
</template>

<script>
import hello from "../components/hello";

export default {
  name: "test",
  props: ['parm'],
  data() {
    return {
      name: this.$store.state.name,
      count: this.$store.state.count,
      a: 123,
      b: 456,
      firstName: 'Foo',
      lastName: 'Bar'
    }
  },

  created() {
    console.log(this.$store)
    //setTimeout('console.log(this.$refs.dom)',0)
    this.$nextTick(() => {
      console.log(this.$refs.dom)
    })
  },
  computed: {
    num() {
      return this.a + this.b
    }
  },
  watch: {

  },
  mounted() {
    console.log(this.$refs.dom)
  },
  components: {
    hello
  }
}
</script>

<style scoped>
</style>
