/**
 * Created by Administrator on 2016/11/30.
 */

var Util=(function($){
    return {
        init:function(){
            this.scrolltoTop();
        },
        /**
         * 回到顶部
         */
        scrolltoTop:function(){
            $("body").append("<a href='javascript:;' class='icon_backTop' id='backTop'></a>");

            var obtn=document.getElementById("backTop");
            if(obtn == null){
                return;
            }
            var clientHeight=document.documentElement.clientHeight;
            var timer=null;
            var isTop=true;
            //滚动条滚动式触发
            window.onscroll=function(){
                var osTop=osTop=document.documentElement.scrollTop||document.body.scrollTop;
                if(osTop>=clientHeight){
                    obtn.style.display="block";
                }else{
                    obtn.style.display="none";
                }
                if(!isTop){
                    clearInterval(timer);
                }
                isTop=false;
            }
            obtn.onclick=function(){
                timer=setInterval(function(){
                    var osTop=document.documentElement.scrollTop||document.body.scrollTop;
                    var ispeed=Math.floor(-osTop/3);
                    console.log(ispeed);
                    document.documentElement.scrollTop=document.body.scrollTop=osTop+ispeed;
                    isTop=true;
                    if(osTop==0){
                        clearInterval(timer);
                    }
                },30);
            }
        },
        /**
         * @param distance 滚动条距离底部的距离
         * @param callBack 触动触发后的操作
         */
        scrollsTop:function(callBack,param) {
            var scr = 0,
                isScrolling=false,
                distance=Number(distance),
                //screenheight = window.screen.availHeight,//屏幕的高度
                screenheight=document.documentElement.clientHeight;
            bodyheight = document.body.clientHeight;//内容高
            temp=$(window).scrollTop();
            var userAgent = navigator.userAgent;//取得浏览器的userAgent字符串
            window.scrollTo(0,0);
            $(window).unbind("scroll");
            var lastscroll=0;
            $(window).scroll(function () {
                /******************游戏类型赛事状态吸顶 start *********************/
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop <= 82){
                    $(".scroll_box").css("top",75-scrollTop+"px");
                }else{
                    $(".scroll_box").css("top","-8px");
                }
                /******************游戏类型赛事状态吸顶 end *********************/
                scr = $(window).scrollTop();
                if(scr<lastscroll){
                    //向上滚动时return
                    lastscroll = scr;
                    return;
                }
                lastscroll = scr;
                if (screenheight + scr > document.body.clientHeight - 20) {//当滚动条滑动到据底部20px时触发
                    //$(window).scrollTop(scr-100);
                    if(isScrolling) return;
                    isScrolling=true;
                    callBack(param).then(function(){
                        isScrolling=false;
                        //console.log("data="+data.result);
                    });
                    temp=$(window).scrollTop();
                }
            });
        },
        popup:{
            time:null,
            /**
             *
             * @param html 弹框中的内容，可是而是存文本，也可以是html元素
             * @param pointerClose 默认是false,true表示手动关闭
             */
            show:function(html,pointerClose){
                window.clearTimeout(this.time);
                //$("body").css("overflow","hidden");
                $("body").find(".popup_alert").remove();
                $("body").find(".popup_mask").remove();
                $("body").append('<div class="bg popup_mask autoPopup_mask" onselectstart="return false;" unselectable="on"></div>'+
                    '<div class="popup_alert defaultPop" id="popup_alert">'+
                    '<a class="icon_close" href="javascript:;" data-toggle="close" data-target="popup_alert"></a>'+
                    '<div class="popup_con"><div class="detail">'+html+'</div></div>'+
                    '</div>');

                var _this=this;
                if(pointerClose) return;

                this.time=setTimeout(function(){
                    _this.hide();
                },2000);

                $(".autoPopup_mask").unbind("click");
                $(".autoPopup_mask").click(function(){
                    _this.hide();
                });
            },
            /**
             * 确认框
             * @param obj {title:"aaa",con:"",btn:["确定"，"取消"]}
             * @param conYes 确定的回调
             * @param conNo  取消的回调
             */
            confirm:function(obj,conYes,conNo){
                if(!obj) return;
                var _this=this,
                    btnsHtml="",
                    poptypeClass="";

                //$("body").css("overflow","hidden");
                $("body").find(".popup_alert").remove();
                $("body").find(".popup_mask").remove();

                //手动关闭
                for(var i= 0,size=obj.btn.length;i<size;i++){
                    btnsHtml+='<div><a href="javascript:;" class="js_operateBtn">'+obj.btn[i]+'</a></div>';
                }
                $("body").append('<div class="bg popup_mask"></div>'+
                    '<div class="popup_alert confirmPop" id="popup_alert">'+
                    '<a class="icon_close" href="javascript:;" data-toggle="close" data-target="popup_alert"></a>'+
                    '<div class="popup_header">'+obj.title+'</div>'+
                    '<div class="popup_con"><div class="detail">'+obj.con+'</div></div>'+
                    '<div class="popup_footer">'+btnsHtml+'</div>'+
                    '</div>');
                //关闭按钮
                $(".icon_close").click(function(){
                    _this.hide();
                })
                //执行回调
                $(".js_operateBtn").unbind("click");
                $(".js_operateBtn").click(function(){
                    var index=$(this).parent("div").index();
                    _this.hide();
                    setTimeout(function(){
                        if(index==0){
                            if(typeof conYes != 'function') return;
                            conYes();
                        }else{
                            if(typeof conNo != 'function') return;
                            conNo();
                        }
                    },200);
                });
            },
            hide:function(){
                //ie8 不兼容连写
                $("body").find(".popup_alert").remove();
                $("body").find(".popup_mask").remove();
                //$("body").css("overflow","auto");
            },
            textUp:function(html){
                //文本弹出提示
                var id = this.textupId();
                var mid =this.textupMid();//42
                this.textIdArr.push(id);
                var textIdArr = this.textIdArr;
                var textid = 'textupId'+id;
                var selector = "body .popup_text."+textid;
                $(selector).remove();
                $("body").append(
                    '<div class="popup_text '+textid+' hide">'+html+'</div>'
                );
                $(selector).show();
                var step = 2;//2
                (function(_mid,_step,_id,_selector){
                    $(_selector).css("top",(_mid+_step)+"%");
                    $(_selector).css("opacity","0");
                    $(_selector).animate({top: _mid+"%",opacity: "1"}, 400,function(){
                        $(_selector).delay(900).animate({top: (_mid-_step)+"%",opacity: "0"}, 600,function () {
                            $(_selector).remove();
                            var index = -1;
                            index = textIdArr.indexOf(_id);
                            if(index!=-1){
                                textIdArr.splice(index,1);
                            }
                        });
                    });
                })(mid,step,id,selector);

                // $(selector).animate({top: "42%",opacity: "1"}, 400,function(){
                //     $(selector).delay(900).animate({top: "39.5%",opacity: "0"}, 600,function () {
                //         $("body").find(selector).remove();
                //     });
                // });
            },
            textupId:function(){
                if(this.textIdArr.length==0){
                    this.textCurrentId=1;
                }else if(this.textIdArr.length>=this.textUpMax){
                    this.textCurrentId=this.textIdArr.splice(0,1)[0];
                }else{
                    this.textCurrentId=Math.max.apply(null,this.textIdArr)+1;
                }
                return this.textCurrentId;
            },
            textupMid:function(){
                // console.log(this.textIdArr);
                if(this.textIdArr.length==0)
                {
                    this.textCurrentMid=42;
                }else{
                    this.textCurrentMid+=2;
                }
                return this.textCurrentMid;
            },
            textCurrentId:1,
            textCurrentMid:42,
            textIdArr:[],
            textUpMax:10
        }
    }

})(jQuery);

Util.init();

