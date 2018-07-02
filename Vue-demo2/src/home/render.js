import './render.css'
export default {
  data(){
    return{
      author: 'xiaoqi'
    }
  },
  render(){
    return (
      <div>
        <p class="render">这里是render的用法，来源于：{ this.author }</p>
        {/*注意这里调用render和直接在Vue文件里的写法不一样*/}
      </div>
    )
  }
}
