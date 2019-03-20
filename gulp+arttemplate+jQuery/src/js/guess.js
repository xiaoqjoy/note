
/**
 * 获取战队默认LOGO。
 *
 * @param val
 * @return {*}
 */
function getDefualTeamLogo(val) {
    if ($.trim(val) == '') {
        return 'assets/img/default.png';
    }
    return val;
}

/**
 * 国际化游戏代码名称
 * @param gameCode
 */
function getGameCodeName(gameCode) {
    return eval('data_game_code_name_' + gameCode);
}

window.matchList={};
var match_key='match_';
function getData(key) {
    return window.matchList[key];
}

function setData(key, data) {
    return window.matchList[key]=data;
}

$(function(){
    var cacheObj = {
        gameCode: 'lol',    //游戏类型
        gameName: 'lol',    //游戏名称
        _channel_: {
            //  电竞渠道
            dj: 'P00001',
            //  一比分渠道
            live: 'P00002',
            //  平台渠道
            platform: 'P00003'
        }
    };
    var arr = [];
    var topics = {}; //订阅的主题
    function loadGuess(){
        //load match
        var gameId = arr.join(",");
        moudle.connectServer('/api/match/guessing',{pageIndex: 1,gameCode:cacheObj.gameCode,pageSize: 4,bGameIds:gameId},function(data){
            if(data.data == undefined){
                $('.quizItem').html(template('quizItem',null));
                return;
            }
            var len = data.data.matchList.length;
            var matchList = data.data.matchList;

            console.log(data.data);
            cacheObj.gameName = matchList[0].gameName;

            handleData(data);

            initWebSocket(45395);

            if(cacheObj.gameCode == "ow" || cacheObj.gameCode == "cf"){
                $('.quizList .game-guesting').html(template('guess',data.data));
            }else{
                $('.quizList .game-guesting').html(template('quizItem',data.data));
            }

            var match;
            for(i=0;i<data.data.matchList.length;i++){
                match=data.data.matchList[i];
                setData(match_key+match.bMatchId, match);
            }

            /*for(var i = 0;i < len;i++){
                initWebSocket(matchList[i].bMatchId);
            }*/


            showGuessTabe(".game-guesting");
        })
    }
    function loadGuessNext(par,callBack) {
        $(".loaderMore").fadeIn();
        moudle.cookieServer('/api/match/guessing',par,callBack);
    }

    function showActivity(){
        moudle.connectServer('/api/common/activity-open',{menuName: '踩楼有礼,充值有礼,转盘抽奖'},function(data){
            if(data.data[0]){
                $(".contentLeft").append('<a href= "'+ moudle.urlConfig.url+ ' /eventLike/index" target="_blank"><li><span>踩楼有礼</span><i></i></li></a>')
            }
            if(data.data[1]){
                $(".contentLeft").append('<a href= "'+ moudle.urlConfig.url+ ' /awardCtl/index" target="_blank"><li><span>充值有礼</span><i></i></li></a>')
            }
            if(data.data[2]){
                $(".contentLeft").append('<a href= "'+ moudle.urlConfig.url+ ' /prizes/index" target="_blank"><li><span>转盘抽奖</span><i></i></li></a>')
            }
        })
    }

    var tabState=0;//0竞猜中 1已结束 2玩法介绍；
    var endDateObj={};//已结束状态
    var guessDataObj={};

    function queryGameEndData(param,callBack){
        // var param = {
        //     gameCode: '',
        //     pageIndex: '',
        //     pageSize: '',
        //     bGameIds: '',
        //     matchDate: '',
        //     dateStatus: '',
        //     roundType: ''
        // }
        moudle.cookieServer('/api/match/guess-end',param,callBack)
    }
    function scrollDown(){
        //向下滚动时  加载下一页
        var promise = $.Deferred();
        if(tabState==0){
            //竞猜中
            //
            if(!guessDataObj||!guessDataObj.page){
                promise.resolve();
            }else if(guessDataObj.page.pageIndex<guessDataObj.page.pageCount){
                var currentPage = guessDataObj.page.pageIndex+1;
                var gameId = arr.join(",");
                var par = {gameCode:cacheObj.gameCode,
                    pageIndex:currentPage,
                    pageSize: 4,bGameIds:gameId
                };
                if(guessDataObj.date){
                    par.matchDate = guessDataObj.date;
                }

                loadGuessNext(par,funWithPromise(promise,function(data){
                    if(data.page){
                        guessDataObj.page=data.page;
                    }else{
                        guessDataObj.page=null;
                    }
                    if(data.data == undefined){
                        return;
                    }
                    /*var matchList = data.data.matchList;
                    var matchDetailList = data.data.matchDetailList;
                    var competitionList = data.data.competitionList;*/
                    cacheObj.gameName = matchList[0].gameName;
                    handleData(data)
                    //competition2matchList(data);
                    if(cacheObj.gameCode == "ow" || cacheObj.gameCode == "cf"){
                        $('.quizList .game-guesting').append(template('guess',data.data));
                    }else{
                        $('.quizList .game-guesting').append(template('quizItem',data.data));
                    }
                    $(".loaderMore").fadeOut();
                }));
            }else{
                promise.resolve();
            }
        }else if(tabState==1){
            //已结束
            log(endDateObj);
            if(!endDateObj||!endDateObj.page){
                promise.resolve();
            }else if(endDateObj.page.pageIndex<endDateObj.page.pageCount){
                $(".loaderMore").fadeIn();
                var currentPage = endDateObj.page.pageIndex+1;
                var par = {gameCode:cacheObj.gameCode,
                    pageIndex:currentPage
                };
                if(endDateObj.date){
                    par.matchDate = endDateObj.date;
                }
                queryGameEndData(par,funWithPromise(promise,gameEndNextBack));
            }else{
                promise.resolve();
            }
        }
        return promise.promise();
    }
    function gameEndByDate(){
        //按日期查询 已结束
        var par = {gameCode:cacheObj.gameCode,
        };
        if(endDateObj.date){
            par.matchDate = endDateObj.date;
        }
        queryGameEndData(par,gameEndByDateBack);
    }
    function gameEndByDateBack(data) {
        //处理按日期查询的数据
        document.documentElement.scrollTop=document.body.scrollTop=0;
        if(data.page){
            endDateObj.page=data.page;
        }else{
            endDateObj.page=null;
        }
        if(data.data == undefined){
            $('.game-end .guessEndList').empty();
            return;
        }
        var lolArr=['dota2','lol','hearthstone','csgo','kg','cos'];
        if(lolArr.indexOf(cacheObj.gameCode)!=-1){
            data.data.templateType='lol';
        }else{
            data.data.templateType='ow';
        }
        var match = data.data;
        addEndDetailList2match(match);
        $('.game-end .guessEndList').empty();
        for(var i=0;i<match.matchList.length;i++){
            var ht;
            if(match.templateType=='lol'){
                ht = template('guessEndItem_lol',match.matchList[i]);
            }else{
                ht = template('guessEndItem_ow',match.matchList[i]);
            }
            if(ht){
                $('.game-end .guessEndList').append(ht)
            }
        }
        $(".loaderMore").fadeOut()
    }
    function funWithPromise(promise,callBack){
        //加入 promise
        var fun = function (prose,cBack) {
            return function(data){
                var callback = cBack;
                callback(data);
                var promised = prose;
                if(promised){
                    promised.resolve();
                }
            }
        };
        return fun(promise,callBack);
    }
    function gameEndNextBack(data) {
        //向下滚动时  加载下一页 数据处理
        var lolArr=['dota2','lol','hearthstone','csgo','kg','cos'];
        if(lolArr.indexOf(cacheObj.gameCode)!=-1){
            data.data.templateType='lol';
        }else{
            data.data.templateType='ow';
        }
        var match = data.data;
        addEndDetailList2match(match);
        if(data.page){
            endDateObj.page=data.page;
        }
        for(var i=0;i<match.matchList.length;i++){
            var ht;
            if(match.templateType=='lol'){
                ht = template('guessEndItem_lol',match.matchList[i]);
            }else{
                ht = template('guessEndItem_ow',match.matchList[i]);
            }
            if(ht){
                $('.quizItem .guessEndList').append(ht)
            }
        }
        $(".loaderMore").fadeOut();
    }
    function gameEndDataBack(data){
        document.documentElement.scrollTop=document.body.scrollTop=0;
        if(data.page){
            endDateObj.page=data.page;
        }else{
            endDateObj.page=null;
        }
        if(data.data == undefined){
            $('.game-end').empty();
            return;
        }
        var lolArr=['dota2','lol','hearthstone','csgo','kg','cos'];
        if(lolArr.indexOf(cacheObj.gameCode)!=-1){
            data.data.templateType='lol';
        }else{
            data.data.templateType='ow';
        }
        var match = data.data;
        addEndDetailList2match(match);

        $('.game-end').html(template('guessEnd',match));
        $(".loaderMore").fadeOut()
        //初始化 日期插件
        //	日期控件
        $('.searchJC').datetimepicker({
            language: 'zh-cn',
            weekStart: 1,
            todayBtn: 1,
            clearBtn: 1,
            autoclose: 1,
            format: 'yyyy-mm-dd',
            minView: 2
        });
        $('.quizItem .dateSelect .week a').on("click",function (e) {
            endDateObj.date=$(this).attr("date-data");
            $(this).addClass("active").siblings().removeClass("active");
            gameEndByDate();
        });
        $('.quizItem .dateSelect .penData .searchBtn').on("click",function (e) {

            var myDate = $('.penData  .myDate').val();
            if(myDate) {
                endDateObj.date = myDate;
                gameEndByDate();
            }
        });
    }
    function log(str) {
        //输出日志
        //console.log.apply(null,arguments);
        var ss="";
        for(var i=0;i<arguments.length;i++){
            ss+=arguments[i]+"\n"
        }
        if($(".log_out p").length>0){
            var str=$(".log_out p").text()+'\n'+ss;
            $(".log_out p").text(str);
        }
    }
    function addEndDetailList2match(data) {
        //数组赛选处理 已结束
        var detailArr = data.matchDetailList;
        var matchList = data.matchList;
        if(!detailArr||detailArr.length==0)return;
        if(!matchList||matchList.length==0)return;
        for(var i=0;i<matchList.length;i++){
            var arr=[];
            var bMatchId=matchList[i].bMatchId;
            for(var j=0;j<detailArr.length;j++){
                if(bMatchId == detailArr[j].bMatchId){
                    arr.push(detailArr[j]);
                }
            }
            matchList[i].matchDetailList=arr.length?arr:null;
        }

    }

    /***
     * 为null或空时，返回-。
     * 0是有效数据，不返回-，
     * @param val
     * @return {*}
     */
    function getNumOrNull(val) {
        if (val == 0) {
            return val;
        }
        /// 因为!0=true，因为需先判断val是否为0
        if (!val || parseInt(val) <= -1) {
            return '-';
        }
        return val;
    }
    function initEndHlper(){
        //已结束
        template.helper('endRootUrl',function(gamecode){
            var str = moudle.urlConfig.url+gamecode;
            return str;
        });
        //语言
        template.helper('lg',function(obj,key){
            return langauge.lg(key);
        });
        template.helper('formatDate', getFormatDateByLong);//来源于 dateFormart.js
        // template.helper('langData', getValueByLanguage);没找到该方法
        template.helper('getChinese', getChinese);
        template.helper('getNumOrNull', getNumOrNull);
        template.helper('getGameCodeName', getGameCodeName);
        template.helper('getDefualTeamLogo', getDefualTeamLogo);

        template.helper('judgeNull',function(obj){
            if(obj == null){
                return '../images/default.png'
            }
            return obj
        });

        template.helper('supple',function(obj){
            return parseFloat(obj).toFixed(2)
        })

        template.helper('judgeClass',function(obj){
            if(obj.competitionTypeCode == 'HW'){
                if(obj.otherForOrder == '1'){
                    return '大'
                }else if(obj.otherForOrder == '2'){
                    return '小'
                }
            }
            if(obj.competitionTypeCode == 'SD'){
                if(obj.otherForOrder == '1'){
                    return '单'
                }else if(obj.otherForOrder == '2'){
                    return '双'
                }
            }
            return '';
        })

        template.helper('jsonString',function(obj){
            return JSON.stringify(obj)
        });

        template.helper('string',function(obj){
            return JSON.parse(obj)['zh_CN']
        })

        template.helper('judgeMatch',function(obj){
            if(obj == 0){
                return '总局'
            }else if(obj == -1){
                return '全系列赛'
            }else if(obj == 'other'){
                return '其他玩法'
            } else{
                return '第'+obj+'局'
            }
        })

        template.helper('dateFormat',function(obj){
            function padleft0(time) {
                return time.toString().replace(/^[0-9]{1}$/, "0" + time);
            };
            if(obj){
                var date = new Date(parseInt(String(obj).substring(0,10)) * 1000);
                var year = date.getFullYear(),
                    month = padleft0(date.getMonth()+1),
                    day = padleft0(date.getDate()),
                    hours = padleft0(date.getHours()),
                    minutes = padleft0(date.getMinutes());
                return year+ '-' +month+ '-' +day+ ' ' + hours+ ':' +minutes;
            }
            return '-';
        });

        template.helper('teamAPercent',function(data){
            return (data.teamAHeadPerMatch/(data.teamAHeadPerMatch+data.teamBHeadPerMatch))*100
        })

        template.helper('teamBPercent',function(data){
            return (data.teamBHeadPerMatch/(data.teamAHeadPerMatch+data.teamBHeadPerMatch))*100
        })
    }

    function getListForGuess() {
        moudle.cookieServer('/api/portal/list-for-guess','',function(data){
            $('.gameClass').html(template('gameClass',data))
            $(".gameClass").find("li:eq(0)").addClass("active");
        })
    }

    function loadMatchList(){
        moudle.cookieServer('/api/match-type/list-for-guess',{gameCode:cacheObj.gameCode},function(data){
            $('.matchClass').html(template('matchClass',data))
            $('.list li:gt(3)').hide();
        })
    }

    function showGuessTabe(selector) {
        var arr=['.game-guesting','.game-end','.game-rule'];
        $(selector).show();
        log(selector);
        arr.splice(arr.indexOf(selector),1);
        log(arr);
        for(var i=0;i<arr.length;i++){
            $(arr[i]).hide();
        }
    }

    function initEvent() {
        //赛事切换
        $(".matchClass").delegate("li a","click",function(){
            var select = $(this).find('.icon_radio'),
                id = $(this).attr('data-id');
            arr.push(id);
            if(id == ''){
                arr = [];
            }
            var allMatch = $(this).parents("li").siblings().eq(0);
            select.addClass('selected');
            $(allMatch[0]).find('.allMatch').removeClass('selected');
            if(select.hasClass('allMatch')){
                select.addClass('selected');
                $(this).parents("li").siblings().find('.icon_radio').removeClass('selected')
            }
            loadGuess();
        })

        $(".guessStateTab a").click(function(){
            var val = $(this).find('span').html();
            $(this).addClass("active").siblings().removeClass("active");
            tabState =$(this).index();
            if(val == '玩法介绍'){
                $('.game-rule').html(template('guessRule',null));
                showGuessTabe('.game-rule');
            }else if(val == '竞猜中'){
                loadGuess();
                showGuessTabe('.game-guesting');
            }else{
                //已结束
                endDateObj.date=null;
                showGuessTabe('.game-end');
                queryGameEndData({gameCode:cacheObj.gameCode,dateStatus:1,
                },gameEndDataBack);
            }
        })

        //open bet
        $(".quizList .game-guesting").delegate(".quizItem li a","click",function(){
            var cache = JSON.parse($(this).attr('data-cache'));
            cache.gameName = cacheObj.gameName;
            cache.gameCode = cacheObj.gameCode;
            var data = {data: cache};

            moudle.cookieServer('api/user/has-login','',function(message){
                if(message.status == 300){
                    login();
                }else{
                    loginStatus();
                    $('.bet').html(template('bet',data));
                    $(".mask").show();
                    $(".popup_bet").show();
                    $(".popup_bet").animate({top: "27%"}, 300);
                }
            })
        })

        //close bet
        $(".bet").delegate(".closePopup","click",function(){
            silideDown();
        })

        $(".bet").delegate(".betCoin","click",function(){
            $(this).attr("placeholder", "");
        })

        //at once bet
        $(".bet").delegate(".betBtn","click",function(){
            var id = $(this).attr("data-id"),
                code = $(this).attr("data-code"),
                coin = $(this).parent().siblings(".betCount").find(".betCoin").val();
            if (!$('.betCoin').val()) {
                Util.popup.show("请输入金额");
                return;
            } else if ($('.betCoin').val() < 10){
                Util.popup.show("最小下注金额10金币");
                return;
            }

            moudle.cookieServer('api/bet/save',{competitionId: id,money: coin,gameCode: code},function(data){
                console.log(data);
                if(data.status == 200){
                    Util.popup.show("投注成功");
                    loginStatus();
                }
                Util.popup.show(data.msg);
            })
            silideDown();
        });

        //金币输入框事件处理
        $(".bet").delegate("input.betCoin","keyup",function(){
            var odds = $(".odds").html();
            var val = $(this).val();
            $(this).val(moneyFilter(val));
            $('.pre-win').text(Math.round(Number(val) * Number(odds) * 100) / 100.0)
        })

        //滚动固定弹窗
        $(window).scroll(function(){
            if ($(document).scrollTop() >= $(document).height() - $(window).height()){
                //alert("滚动条已经到达底部为" + $(document).scrollTop());
            }
            var scrollTop = document.body.scrollTop;
            if(scrollTop < 80){
                $(".scroll_box").css("top","75px");
            }else{
                $(".scroll_box").css("top","-8px");
            }
        })

        $('.list li:gt(3)').hide();
        $('.moreDate').click(function (){
            if ($('.list li:gt(3)').is(":visible")) {
                $(this).find(".icon_more").removeClass("up");
            } else {
                $(this).find(".icon_more").addClass("up");
            }
            $('.list li:gt(3)').slideToggle('normal');
        });
        $(".guess_box .guessItem:odd").addClass("oddcss");
        $(".guess_box .guessItem:even").addClass("evencss");

        //login
        $(".headTop").delegate(".loginBtn","click",function(){
            console.log(cacheObj)
            login();
        });

        function login(){
            hhly_login.show();
            hhly_login.initConfig({
                "platformId": cacheObj.platformId ,
                "success": function (data){
                    console.log(data)
                    var user = data.user;
                    console.log(user);
                    user.channel = cacheObj._channel_.dj;

                    moudle.cookieServer('/api/user/login-platform',user,function(data){
                        console.log(data);
                        loginStatus();
                    })
                    $('#hhly_sso_login_mask').fadeOut(100);
                    $('#hhly_sso_login').slideUp(200);
                    $("body").height($(window).height()).css({"overflow": ""});
                    //judge login
                    console.log(document.cookie)
                }
            });
        }

        /*$(".sign_popup").delegate(".sign_btn","click",function(){
            $(this).addClass('yet');
            moudle.cookieServer('api/sign/signin',{'language': 'zh_CN', osType: 'pc'},function(resp){
                if(resp.data > 0){
                    Util.popup.textUp('已签到成功，获得+' + resp.data + '金币');
                }
            })
        })*/

        //签到
        $(".headTop").delegate(".sign","click",function(){
            if(signMoudle.isSigned()){
                return false;
            }
            //signMoudle.isSigned();

            moudle.cookieServer('api/sign/list','',function(data){
                console.log(data)
                //signMoudle.renderSignPanel(data)
                $(".sign_popup").html(template("sign",data));

                $('.calendar').signCalander({
                    year: data.data.year,
                    month: data.data.month - 1,
                    gou: moudle.urlConfig.url + '/images/sign_ca/ca_gou.png'
                });
            })
        })

        // 关闭签到
        $(".sign_popup").delegate(".act_close","click",function(){
            $(".sign_popup").html("");
        })

        //exit login
        $(".headTop").delegate(".exitLogin","click",logOut)
    }
    function logOut(){
        ///api/user/logout
        moudle.cookieServer('/api/user/logout','',function(){
            clearAllCookie();
            loginStatus();
        })
    }
    function showGuessTabe(selector){
        var arr=['.game-guesting','.game-end','.game-rule'];
        $(selector).show();
        log(selector);
        arr.splice(arr.indexOf(selector),1);
        log(arr);
        for(var i=0;i<arr.length;i++){
            $(arr[i]).hide();
        }

    }
    function silideDown(){
        $(".guess_box li a").removeClass("active");
        $(".popup_bet").animate({top: "106%"}, 300, function (){
            $(this).css("top", "-57%");
            $(".popup_bet").hide();
            $(".bet").html("");
            $(".mask").hide();
        });
        $("input.betCoin").val("");
    }

    function moneyFilter(str){
        return str.replace(/^0+|[\D]+/g, "").substr(0, 5);
    }

    function initAnalyse(){
        //战队比赛数据分析
        $(".quizList").delegate(".btn_analyse","click",function(e){
            var target = $(e.currentTarget),
                aName = target.attr("data-teamAName"),
                bName = target.attr("data-teamBName"),
                gameCode = target.attr("data-code"),
                aId = target.attr("data-aid"),
                bId = target.attr("data-bid");
            moudle.cookieServer('/api/match/team-compare',{teamAId: aId,teamBId: bId,gameCode: gameCode},function(data){
                var arr = data.data.requiredBackField.split(",");
                data.data.teamAName = aName;
                data.data.teamBName = bName;
                data.data.requiredBackField = arr;
                var len = arr.length;
                for(var i = 0; i < len; i++){
                    if(arr[i] == "teamAHeadPerMatch"){
                        data.data.tHeadPerMatch = true;
                    }
                    if(arr[i] == "teamAWinRate"){
                        data.data.winRate = true;
                    }
                    if(arr[i] == "teamAFirstBigDragonRate"){
                        data.data.DragonRate = true;
                    }
                    if(arr[i] == "teamAFirstTowerRate"){
                        data.data.TowerRate = true;
                    }
                    if(arr[i] == "teamAFirstBloodRate"){
                        data.data.BloodRate = true;
                    }
                }
                target.prev().html(template("analyseBox",data));
                if(!target.parent().hasClass('active')){
                    analyseboxHide();
                    target.parent().addClass('active');
                    thisboxshow(target);
                }else{
                    target.parent().removeClass('active');
                    thisboxHide(target);
                }
            })
        });
        $('.match_analyse_box,.popup_bet,.peilv,.mask').click(function(){
            return false;
        });
        $('body').click(function (e) {
            evt = event.srcElement ? event.srcElement : event.target;
            if($(evt).hasClass('btn_analyse')||$(evt).parent().hasClass('btn_analyse')){
                return;
            }
            analyseboxHide();
        });


    }
    function thisboxshow(target){
        target.siblings('.lit-analysebox').animate({width: "245px"},'fast',function (){
            target.find('.arrRight').hide();
            target.find('.arrLeft').show();
        });
    }
    function thisboxHide(target) {
        target.find('.arrRight').show();//右箭头显示
        target.find('.arrLeft').hide();//左箭头隐藏
        target.siblings('.lit-analysebox').animate({width: "0px"});
    }
    function analyseboxHide(){
        $('.btn_analyse').parent().removeClass('active');
        $('.btn_analyse').find('.arrRight').show();//右箭头显示
        $('.btn_analyse').find('.arrLeft').hide();//左箭头隐藏
        $('.btn_analyse').siblings('.lit-analysebox').animate({width: "0px"});
    }

    function initGameTypeClikc() {
        $(".gameClass ").delegate("li","click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            var gameCode = $(this).attr("data-gameCode");
            arr = [];
            cacheObj.gameCode = gameCode;
            loadGuess();
            loadMatchList();
        })

    }

    //delete all cookie
    function clearAllCookie(){
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
            for(var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }

    function getPlantFormId() {
        //get plartform id
        moudle.cookieServer('/api/common/getPlatformId','',function(data){
            cacheObj.platformId = data.data;
        })
    }

    //get user information
    function loginStatus(){
        var message = {data: {}};
        moudle.cookieServer('api/user/info','',function(data1){
            message.data[0] = data1;
            $('.headTop').html(template('headTop',message));
            if(data1.status !== 200){
                return;
            }else{
                moudle.cookieServer('api/sign/has-sign-today','',function(data2){
                    message.data[1] = data2;
                    $('.headTop').html(template('headTop',message));
                })
            }
        })
    }

    function handleData(data){
        var matchList = data.data.matchList;
        var matchDetailList = data.data.matchDetailList;
        var competitionList = data.data.competitionList;

        var compMap = {};
        var comp;
        var comStr;
        var otherCompArr;
        var match;

        for(var e = 0;e< competitionList.length; e++){
            comp = competitionList[e];
            comp.competitionTypeName = JSON.parse(comp.competitionTypeName)['zh_CN'];
            compMap[comp.competitionId]=comp;
        }

        for(var i = 0;i< matchList.length;i++){
            match = matchList[i];
            match.obj1 = {};

            comStr = ''; //
            otherCompArr = [];

            for(var j = 0;j< matchDetailList.length;j++){
                if(matchList[i].bMatchId !== matchDetailList[j].bMatchId){
                    continue;
                }

                //matchList[i].obj[matchDetailList[j].bo] = [];
                matchList[i].obj1[matchDetailList[j].bo] = [];

                var comObj;
                var pair;
                var otherPair;

                for(var v = 0;v< competitionList.length;v++){

                    comObj = competitionList[v];
                    pair = null;

                    if(matchDetailList[j].matchDetailId == competitionList[v].matchDetailId){
                        //matchList[i].obj[matchDetailList[j].bo].push(comObj);

                        //
                        if(!compMap[comObj.brotherId] || comStr.indexOf(comObj.competitionId+'') >= 0
                            || comStr.indexOf(comObj.brotherId+'') >= 0){
                            continue;
                        }

                        // is other guess
                        if(comObj.teamId <= '0'){
                            if(comObj.competitionId < comObj.brotherId){
                                otherPair=[comObj, compMap[comObj.brotherId]];
                            }else{
                                otherPair=[compMap[comObj.brotherId], comObj];
                            }
                            otherCompArr.push(otherPair);
                            comStr += comObj.competitionId+',';
                            continue;
                        }

                        if(comObj.competitionId < comObj.brotherId){
                            pair=[comObj, compMap[comObj.brotherId]];
                        }else{
                            pair=[compMap[comObj.brotherId], comObj];
                        }

                        comStr += comObj.competitionId+',';
                        matchList[i].obj1[matchDetailList[j].bo].push(pair);

                    }
                }

                if(matchList[i].obj1[matchDetailList[j].bo].length == 0){
                    delete matchList[i].obj1[matchDetailList[j].bo];
                }
            }

            if(otherCompArr && otherCompArr.length > 0){
                match.obj1['other'] = otherCompArr;
            }
        }
    }


    function initWebSocket(matchId){
        moudle.connectServer('/api/competition/poll',{matchId: matchId, version: 0},function(data){
            console.log(data);
            if(data.data){
                // old list compare new list
                var match = getData(match_key + matchId);
                var compNewList={},
                    compOldList,
                    matchDetailList,
                    compNew,
                    compOld,
                    compChangeList=[];

                for (var i=0; i<data.data.competitionList.length;i++){
                    compNew=data.data.competitionList[i];
                    /*if(compNew.competitionId==12897){
                     compNew.odds=compNew.odds+0.2;
                     }*/
                    compNewList[compNew.competitionId]=compNew;
                }
                console.log(compNew)
                console.log(match);
                // match detail list
                for (var m in match.obj1){
                    matchDetailList=match.obj1[m];
                    for (var bo in matchDetailList){
                        compOldList=matchDetailList[bo];
                        console.log(compOldList.length)
                        console.log(compOldList)
                        for (var j=0; j<compOldList.length;j++) {
                            // compare odds
                            compOld= compOldList[j];
                            compNew= compNewList[compOld.competitionId];

                            if(compOld.odds > compNew.odds){
                                // TODO
                                compOldList[j]=compNew;
                                compChangeList.push(compNew);
                                $("#"+compNew.competitionId).parents('li').append('<i class="arrow tips-down" style="display: block;">↓</i>');
                                console.log('>>>>>>>>>>>>>>>>>>>>>>'+compNew.competitionId)
                            }else if(compOld.odds < compNew.odds){
                                // TODO
                                compOldList[j]=compNew;
                                compChangeList.push(compNew);
                                $("#"+compNew.competitionId).parents('li').append('<i class="arrow tips-up" style="display: block;">↑</i>');
                                console.log($("#"+compNew.competitionId).html())
                                console.log('<<<<<<<<<<<<<<<<<<<<<<<<<'+ compNew.competitionId)
                            }else{
                                console.log('xxxxxxxxx==================');
                            }
                        }
                    }
                }

                function renderData(){
                    var data={data:{matchList: [match]}};
                    console.log(data)
                    // render template
                    if(match.gameCode == "ow" || match.gameCode == "cf"){
                        $('.quizItem[data-id="'+match.bMatchId+'"]').html(template('guess',data.data));
                    }else{
                        $('.quizItem[data-id="'+match.bMatchId+'"]').html(template('quizItem',data.data));
                    }
                }
                setTimeout(renderData,5000)
            }
        })
    }



    function contrastData(data){
        if(data.data){
            // old list compare new list
            var match = getData(match_key + matchId);
            var compNewList={},
                compOldList,
                matchDetailList,
                compNew,
                compOld,
                compChangeList=[];

            for (var i=0; i<data.data.competitionList.length;i++){
                compNew=data.data.competitionList[i];
                /*if(compNew.competitionId==12897){
                    compNew.odds=compNew.odds+0.2;
                }*/
                compNewList[compNew.competitionId]=compNew;
            }

            console.log("match");
            console.log(match);

            // match detail list
            for (var m in match.obj1){
                matchDetailList=match.obj1[m];
                for (var bo in matchDetailList){
                    compOldList=matchDetailList[bo];
                    for (var j=0; j<compOldList.length;j++) {
                        // compare odds
                        compOld= compOldList[j];
                        compNew= compNewList[compOld.competitionId];

                        if(compOld.odds > compNew.odds){
                            // TODO
                            compOldList[j]=compNew;
                            compChangeList.push(compNew);
                            $("#"+compNew.competitionId).parents('li').append('<i class="arrow tips-down" style="display: block;">↓</i>');
                            console.log('>>>>>>>>>>>>>>>>>>>>>>'+compNew.competitionId)
                        }else if(compOld.odds < compNew.odds){
                            // TODO
                            compOldList[j]=compNew;
                            compChangeList.push(compNew);
                            $("#"+compNew.competitionId).parents('li').append('<i class="arrow tips-up" style="display: block;">↑</i>');
                            console.log($("#"+compNew.competitionId).html())
                            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<'+ compNew.competitionId)
                        }else{
                            console.log('xxxxxxxxx==================');
                        }
                    }
                }
            }

            function renderData(){
                var data={data:{matchList: [match]}};
                console.log(data)
                // render template
                if(match.gameCode == "ow" || match.gameCode == "cf"){
                    $('.quizItem[data-id="'+match.bMatchId+'"]').html(template('guess',data.data));
                }else{
                    $('.quizItem[data-id="'+match.bMatchId+'"]').html(template('quizItem',data.data));
                }
            }
            setTimeout(renderData,5000)
        }
    }

    //判断是否是IE
    function isIE() {
        var ua = window.navigator.userAgent.toLowerCase();
        var isIe = false;
        if (ua.indexOf("msie") > -1 || ua.indexOf(".net") > -1) {
            isIe = true;
        }
        return isIe;
    }

    //	webSocket
    var pollingVersions = {}; //IE轮询信息版本号集合
    /*function initWebSocket(matchId) {
        if ('WebSocket' in window && !isIE()) {
            var topic = topics['"' + matchId + '"'];
            //该主题未订阅，则订阅该主题
            if (!topic){
                //初始化 websocket
                var websocket = Stomp.client(moudle.urlConfig.websocketUrl);
                websocket.connect("", "", function (){
                        topic = websocket.subscribe("/topic/GUEST.topic.game.yxjc.match." + matchId, function (data) {
                            contrastData(data);
                        });
                    }
                );
                topics['"' + matchId + '"'] = topic;
            }
        } else {
            pollingVersions[matchId] = -1;
            setInterval(function (){
                moudle.connectServer("/api/competition/poll",{"matchId": matchId, version: pollingVersions[matchId]},function(data){
                    if (data) { //如果服务器返回的有数据
                        pollingVersions[matchId] = data.version; //更新版本号
                        contrastData(data);
                    }
                })
            }, 5000);
        }
    }*/

    gameInit();
    function gameInit(){
        //入口方法
        initEndHlper();
        loadGuess();
        Util.scrollsTop(scrollDown);
        getListForGuess();
        loadMatchList();
        initEvent();
        initAnalyse();
        initGameTypeClikc();
        getPlantFormId();
        loginStatus();
        showActivity();
    }
})
