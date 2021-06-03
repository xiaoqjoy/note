export default {
  btn(state) {
    console.log(state)
  },
  run() {
    alert(2222222)
  },
  setName(state, obj) {
    state.userName = obj.name
  }
}