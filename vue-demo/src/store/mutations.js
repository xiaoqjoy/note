import { SOME_MUTATION, ADD, REDUCE, TOTAL } from './mutation-type'

export default {
  btn(state) {
    console.log(state)
  },
  run() {
    alert(2222222)
  },
  setName(state, obj) {
    state.userName = obj.name
  },
  [SOME_MUTATION](){
    alert('SOME_MUTATION')
  },
  [SOME_MUTATION](){
    alert('SOME_MUTATION')
  },
  [ADD](state, obj){
    console.log(obj.a)
    state.count++
    this.commit('TOTAL')
  },
  [REDUCE](state){
    state.count--
    this.commit('TOTAL')
  },
  [TOTAL](state){
    state.total = state.count*5
  },
}