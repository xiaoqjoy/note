<template>
  <div>
    <div class="footerComponent">
      <p>深圳市双平泰医疗科技有限公司 <a href="#" target="_blank">© 2016 Copyright aicares.net-粤ICP备15066354号-2</a></p>
      <p>互联网药品信息服务资格证编号(粤)-非经营性-2016-0277</p>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'footerComponent',
        data() {
            return {}
        },
        methods: {}
    }
</script>
<style lang="less" scoped type="text/less">
  .footerComponent{
    color: #666;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    padding-bottom: 6px;
    a{
      color: #666;
      text-decoration: none;
    }
  }
</style>




<!--   移动端rem  根元素计算公式
<script type="text/javascript">
  // import fastclick from 'fastclick';
  (function() {
    var constMaxWidth = 752;
    var constMaxHtmlFontSize = 100; //1rem=constMaxHtmlFontSize
    var minUnit = 1 / constMaxHtmlFontSize; //最小刻度
    var self = window;
    self.width = constMaxWidth; //设置默认最大宽度
    self.fontSize = constMaxHtmlFontSize; //默认字体大小
    self.widthProportion = function() {
      var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / self.width;
      return p < minUnit ? minUnit : p;
    };
    self.changePage = function() {
      self.val = self.widthProportion() * self.fontSize;
      if (self.val > constMaxHtmlFontSize) {
        self.val = constMaxHtmlFontSize
      }
      document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + self.val + "px !important");
    }
    self.changePage();
    window.addEventListener("resize", function() {
      self.changePage();
    }, false);
    // window.addEventListener('load', function() {
    //     fastclick.attach(document.body);
    // }, false);
  })();
</script>-->



<!--i{     移动端 雪碧图 背景图设置方法
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-image: url("../../../static/images/icon.png");
  background-repeat: no-repeat;
  zoom: 0.5;
  text-align: center;
  line-height: 1rem;
  color: white;
  font-size: 0.5rem;
  background-size: 7.52rem 38rem;    //这里是背景图 宽高/100
}
i.check{
  background-position: -0.06rem -25.95rem;
}-->
