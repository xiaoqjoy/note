
//左右滑动..,同步,IIFE.
(function(){
    var currentRow = 1; // 有多少栏， 1栏5个li,按顺序排列.
    var slideUL = $(".iconLogo");
    //页面刷新后，定位到active的元素.
    refreshNav();
    //左滑
    $(".index__arrow_left").on("click",function(e){
        var left =  slideUL.find("li").offset();
        left = left < 0 ? -left : 0;
        slideUL.find("li").animate({left: (left )+"px"}, "fast");
        $(this).removeClass("active");
        $(".index__arrow_right").removeClass("active").addClass("active");
        currentRow =1;
    });
    //右滑
    $(".index__arrow_right").on("click",function(e){
        var left = slideUL.find("li").offset();
        var topnavNum = slideUL.find("li").length;
        left = left < (topnavNum -4)*120  ? left : (topnavNum - 4)*120 ;
        slideUL.find("li").animate({left: -(left )+"px"}, "fast");
        $(this).removeClass("active");
        $(".index__arrow_left").removeClass("active").addClass("active");
        currentRow = 2;
    });

    //如果后台同事有其他实现方式及其他逻辑。点击头部小icon时切换样式�?�可以忽略line25-29.
    slideUL.delegate("li","click",function(e){
        $(this).addClass("active").siblings().removeClass("active");
    })

    $(".quizDirectory").delegate("li","click",function(e){
        var dataId = $(this).find("i").attr("data-id");
        clickFreshNav(dataId);
    })
    /**
     * 点击游戏大按钮，同步顶部按钮样式及滚动.
     * 1.更新slideTarget样式
     * 2.如果slideTarget是隐藏的就显示出来了.
     * @param dataId
     */
    function clickFreshNav(dataId){
        var topnavNum = $(".iconLogo").find("li").length;
        var selectedLi = slideUL.find(".active");
        var slideTarget = $("[code='"+dataId+"']").parent();
        //更新样式
        slideTarget.addClass("active").siblings().removeClass("active");
        //滚动.
        var targetIndex = slideUL.find("li").index(slideTarget)+1;
        //如果处于第一列（5个图标), 则不移动, 如果处于第二列还有的，那么就移动相应的位置,根据多个少li移动.后续考虑优化或者去掉.
        if (targetIndex/5 <=1 && targetIndex/5 >=0) {
            slideUL.find("li").css("left",-(0)+"px");
        } else {
            slideUL.find("li").css("left",-((topnavNum-5)*120)+"px");
        }
        currentRow = parseInt(targetIndex/5)+ 1;

    }
    //刷新定位到active元素.
    function refreshNav(){
        var selectedLi = slideUL.find(".active");
        var topnavNum = $(".iconLogo").find("li").length;
        //如果当前点击的index(from 0)  大于或等于4,则移动 (index-4 + 1) * 120
        var index = selectedLi.index() || 0;
        if ((index/5 <=1 && index/5 >=0) || index == -1) {
            slideUL.find("li").css("left",-(0)+"px");
        } else {
            slideUL.find("li").css("left",-((topnavNum-5)*120 )+"px");
        }

        currentRow = parseInt(index/5) + 1;  //处于第几栏的。
    }
}($))