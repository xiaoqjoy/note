<template>
    <div class="test">
      <!-- <h2>this is a test page</h2>
      <button @click="goIndex">go to index</button> -->
      <div id="minimap"></div>       <!-- 缩略图 DOM 结构规约参考 Minimap API -->
      <div id="toolbar"></div>       <!-- 工具栏 DOM 结构规约参考 Toolbar API -->
      <div id="itempannel"></div>    <!-- 元素面板栏 DOM 结构规约参考 Itempannel API -->
      <div id="detailpannel"></div>  <!-- 详情面板栏 DOM 结构规约参考 Detailpannel API -->
      <div id="contextmenu"></div>   <!-- 右键菜单栏 DOM 结构规约参考 Contextmenu API -->
      <div id="page"></div>          <!-- 参考 Flow、Mind API -->
    </div>
</template>
<script>
import G6Editor from '@antv/g6-editor';
    export default {
        name: 'test',
        data() {
            return {

            }
        },
        mounted: function(){
          const editor = new G6Editor();
const minimap = new G6Editor.Minimap({
  container: 'minimap',
});
const toolbar = new G6Editor.Toolbar({
  container: 'toolbar',
});
const contextmenu = new G6Editor.Contextmenu({
  container: 'contextmenu',
});
const itempannel = new G6Editor.Itempannel({
  container: 'itempannel',
});
const detailpannel = new G6Editor.Detailpannel({
  container: 'detailpannel',
});
const page = new G6Editor.Flow({
  graph: {
    container: 'page',
  },
});
editor.add(minimap);
editor.add(toolbar);
editor.add(contextmenu);
editor.add(itempannel);
editor.add(detailpannel);
editor.add(page);
        },
        created: function(){

        },
        methods: {
          // goIndex: function(){
          //   this.$router.push('/')
          // }
        }
    }
</script>
<style>
</style>
