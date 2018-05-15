
$(function () {
    var cacheObj = {
        gameCode: 'dota2',    //游戏类型
        gameName: 'dota2',    //游戏名称
        _channel_: {
            //  电竞渠道
            dj: 'P00001',
            //  一比分渠道
            live: 'P00002',
            //  平台渠道
            platform: 'P00003'
        },
        singleAll:1,//1单场 2全系列
    };
    var arr = [];
    function loadGuess(){
        //load match
        log('load-loadGuess')
        var gameId = arr.join(",");
        moudle.cookieServer('api/match/guessing',{pageIndex: 1,gameCode:cacheObj.gameCode,pageSize: 4,bGameIds:gameId},function(data){
            if(data.page){
                guessDataObj.page=data.page;
            }else{
                guessDataObj.page=null;
            }
            if(data.data == undefined){
                $('.quizList .game-guesting').empty();
                return;
            }
            $('.quizList .game-guesting').empty();
            var matchList = data.data.matchList;
            var matchDetailList = data.data.matchDetailList;
            var competitionList = data.data.competitionList;
            cacheObj.gameName = matchList[0].gameName;
            competition2matchList(matchList,matchDetailList,competitionList);
            var singleNewArr=['lol','dota2'];
            if(singleNewArr.indexOf(cacheObj.gameCode)!=-1){
                dataDeal(data);
                $('.quizList .game-guesting').append(template('new_play', data));
            }
            log(data.data);
            if(cacheObj.gameCode == "ow" || cacheObj.gameCode == "cf"){
                $('.quizList .game-guesting').append(template('guess',data.data));
            }else{
                $('.quizList .game-guesting').append(template('quizItem',data.data));
            }

        })
    }
    function loadGuessNext(par,callBack) {
        //{pageIndex: 1,gameCode:cacheObj.gameCode,pageSize: 4,bGameIds:gameId}
        $(".loaderMore").fadeIn();
        moudle.cookieServer('api/match/guessing',par,callBack);
    }
    function competition2matchList(matchList,matchDetailList,competitionList) {
        //复制竞猜项 老玩法
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
    function handleData(data){
        var matchList = data.data.matchList;
        var matchDetailList = data.data.matchDetailList;
        var competitionList = data.data.competitionList;

        var cacheData = data;
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
    var tabState=0;//0竞猜中 1已结束 2玩法介绍；
    var endDateObj={};//已结束状态
    var guessDataObj={};

    $('.guessPage').on('click',function () {
        log('guessPage click');
    });
    $('.guessPage').on('click',function () {
        log('guessPage click');
    });
    gameInit();
    function gameInit() {
        //入口方法
        initEndHlper();
        initEvent();
        initEndFull();
        initSingleAllTab();
        initAllMatchEvent();
        initNewEvent();
        initGameTypeClikc();
        Util.scrollsTop(scrollDown);
        //请求从这里开始
        getListForGuess();
        showGuessTabe('.game-guesting');
        initAnalyse();
        //加载 入口
        getPlantFormId();
        loginStatus();
    }
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
        moudle.cookieServer('api/match/guess-end',param,callBack)
    }
    //查询全系列赛 已结束
    function queryAllMatchGameEndData(param,callBack){
        // var param = {
        //     gameCode: '',
        //     pageIndex: '',
        //     pageSize: '',
        //     bGameIds: '',
        //     matchDate: '',
        //     dateStatus: '',
        //     roundType: ''
        // }
        moudle.cookieServer('api/match/fun-all/guess-end',param,callBack)
    }
    function scrollDown(){
        log("down down")
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
                    var matchList = data.data.matchList;
                    var matchDetailList = data.data.matchDetailList;
                    var competitionList = data.data.competitionList;
                    cacheObj.gameName = matchList[0].gameName;
                    competition2matchList(matchList,matchDetailList,competitionList);
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
        if(cacheObj.gameCode=='lol'||cacheObj.gameCode=='dota2'){
            refactorGuessEndData(data);
            dataDeal(data);
            $('.quizList .game-end').append(template('new_play_end', data));
        }

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
        if(!isIE()){
            console.log.apply(null,arguments);
        }
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
    function lol_img(url){
        var str = 'http://192.168.74.155:8011/static/lol/'+url;
        if(url.indexOf("http://")!=-1){
            return url;
        }
        return str;
    }
    function dota_img(url){
        var str = 'http://192.168.74.155:8011/static/dota2/'+url;
        if(url.indexOf("http://")!=-1){
            return url;
        }
        return str;
    }
    function initEndHlper(){
        //已结束
        template.helper('log',function (obj) {
            log(obj);
            return 'log';
        })
        template.helper('endRootUrl',function(gamecode){
            var str = moudle.urlConfig.url+gamecode;

            return str;
        });
        template.helper('lol_img',lol_img);
        template.helper('dota_img',dota_img);
        //语言
        template.helper('lg',function(obj,key){
            return lg.lg(key);
        });
        template.helper('formatDate', getFormatDateByLong);//来源于 dateFormart.js
        // template.helper('langData', getValueByLanguage);没找到该方法
        template.helper('getChinese', getChinese);
        template.helper('getNumOrNull', getNumOrNull);
        template.helper('getGameCodeName', getGameCodeName);
        template.helper('getDefualTeamLogo', getDefualTeamLogo);

        //竞猜中
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
        // new
        template.helper('boCN', function (obj) {
            var array = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
            return '第' + array[obj - 1] + '局';
        });
        template.helper('dateChange', function (obj) {
            var newDate = moudle.formatTime(new Date(obj)).date + ' ' + moudle.formatTime(new Date(obj)).clock;
            return newDate;
        });
        template.helper('deal_breakPosition', function (obj) {
            var array = ['上路', '中路', '下路'];
            return array[obj - 1]
        });
        template.helper('deal_maxComboKill', function (obj) {
            var array = ['无多杀', '双杀', '三杀', '四杀', '五杀'];
            return array[obj - 1]
        });
        template.helper('time', function (obj) {
            var newTime = parseInt(obj / 60);
            return newTime;
        });
    }

    function getChinese(num) {
        switch (parseInt(num)) {
            case 1:
                return lg.gjh.data_words_di + lg.gjh.match_number_one + lg.gjh.data_words_ju;
            case 2:
                return lg.gjh.data_words_di + lg.gjh.match_number_two + lg.gjh.data_words_ju;
            case 3:
                return lg.gjh.data_words_di + lg.gjh.match_number_three + lg.gjh.data_words_ju;
            case 4:
                return lg.gjh.data_words_di + lg.gjh.match_number_four + lg.gjh.data_words_ju;
            case 5:
                return lg.gjh.data_words_di + lg.gjh.match_number_five + lg.gjh.data_words_ju;
            case 0:
                return lg.gjh.match_number_total + lg.gjh.data_words_ju;
            default:
                break;
        }
    }
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
        return lg.gjh['data_game_code_name_' + gameCode]
    }

    function getListForGuess() {
        moudle.cookieServer('api/portal/list-for-guess','',function(data){
            $('.gameClass').html(template('gameClass',data));
            // $(".gameClass").find("li:eq(0)").addClass("active");
            //默认选择第一游戏
            $(".gameClass").find("li:eq(0)").trigger("click");
        })
    }

    function loadMatchList(){
        moudle.cookieServer('api/match-type/list-for-guess',{gameCode:cacheObj.gameCode},function(data){
            $('.matchClass').html(template('matchClass',data))
            $('.list li:gt(3)').hide();
        })
    }
    function singleEndLoad(){
        //单场
        endDateObj.date=null;
        showGuessTabe('.game-end');
        queryGameEndData({gameCode:cacheObj.gameCode,dateStatus:1,
        },gameEndDataBack);
    }
    function fullEndLoad(){
        // 全系列赛 加载 已结束
        endDateObj.date=null;
        showGuessTabe('.game-end');
        $('.game-end').empty();
        queryAllMatchGameEndData({gameCode:cacheObj.gameCode,dateStatus:1,},fullEndDataBack)
    }
    var fullEndKey = {
        QPMH:"maxShowHero",
        QBMH:"maxForbidHero",
        QAKH:"avgMaxHeadHero",
        QAAH:"avgMaxAssistNumHero",
        QADH:"avgMaxDeathNumHero",
        QABMH:"avgMaxLastHitHero",
        QDGMH:"maxGpmHero",
        QDKMH:"maxHeadHero",
        QDBMH:"maxLastHitHero",
        CHAP:"championTeam",
        QDKT:"maxHeadTeam",
        QAKT:"avgHeadTeam",
        QDDLT:"minDeathTeam",
        QDALT:"maxAssistHitTeam",
        QTMWT:"maxTimeWinTeam",
        QTLWT:"minTimeWinTeam",
        QATMT:"avgMaxTimeTeam",
        QPHMT:"maxHeroTeam",
        QAKP:"avgMaxHeadPlayer",
        QDKP:"maxHeadPlayer",
        QADLP:"avgMinDeathPlayer",
        QAAMP:"avgMaxAssistHitPlayer",
        QDAMP:"maxAssistHitPlayer",
        QABMP:"avgLastHitPlayer",
        QDBMP:"maxLastHitPlayer",
        QDGMP:"maxGpmPlayer",
        QAGMP:"avgMaxGpmPlayer",
        QPHMP:"maxShowHeroPlayer",
        QR:"sumBoNum1,sumBoNum2",
        QPHN:"showHeroNum1,showHeroNum2",
        QBHN:"forbidHeroNum1,forbidHeroNum2",
        QDMT:"maxMatchTime1,maxMatchTime2",
        QDLT:"minMatchTime1,minMatchTime2",
        QDKMN:"maxHead1,maxHead2",
    }
    var allEndPlayerArr=["QAKP","QDKP","QADLP","QAAMP","QDAMP","QABMP","QDBMP","QDGMP","QAGMP","QPHMP"];
    var allEndHeroArr=["QPMH","QBMH","QAKH","QAAH","QADH","QABMH","QDGMH","QDKMH","QDBMH"];
    var allEndTeamArr=["CHAP","QDKT","QAKT","QDDLT","QDALT","QTMWT","QTLWT","QATMT","QPHMT"];
    var allEndOtherArr=["QR","QPHN","QBHN","QDMT","QDLT","QDKMN"];
    function fullEndDataBack(data) {
        log('fullEndDataBack')
        log(data);
        var str = "aaaaa";
        var matchDetailList = data.data.matchDetailList;
        var matchList =  data.data.matchList;
        var funCompetitionList = data.data.funCompetitionList;
        var typeArr=[,'hero','team','player','other'];
        if(!matchDetailList || !funCompetitionList){
            $('.game-end').empty();
            return;
        }
        for(var k = 0;k<matchDetailList.length;k++){
            var mItem = matchDetailList[k];
            for(var hero in mItem.fieldValues){
                for(var key in fullEndKey){
                    // log(key,hero,allEndHeroArr.indexOf(key),fullEndKey[key])
                    if(fullEndKey[key]==hero && allEndHeroArr.indexOf(key)!=-1 && mItem.fieldValues[hero].length>0){
                        log(hero,mItem.fieldValues[hero]);
                        if(cacheObj.gameCode=='lol'){
                            mItem.fieldValues[hero][0].icon =lol_img(mItem.fieldValues[hero][0].icon);
                        }
                        if(cacheObj.gameCode=='dota2'){
                            mItem.fieldValues[hero][0].icon =dota_img(mItem.fieldValues[hero][0].icon);
                        }

                        mItem.fieldValues[hero][0].name = JSON.parse(mItem.fieldValues[hero][0].name);
                    }
                }
            }
        }
        for(var i = 0;i<matchList.length;i++){
            var funList={};
            var arrObj={hero:[],team:[],player:[],other:[]};
            for(var j = 0;j<funCompetitionList.length;j++){
                var competitionCode = funCompetitionList[j].competitionCode
                if(matchList[i].matchDetailId == funCompetitionList[j].matchDetailId){
                    if(allEndHeroArr.indexOf(competitionCode)!=-1){
                        arrObj.hero.push(funCompetitionList[j]);
                    }
                    if(allEndTeamArr.indexOf(competitionCode)!=-1){
                        arrObj.team.push(funCompetitionList[j]);
                    }
                    if(allEndPlayerArr.indexOf(competitionCode)!=-1){
                        arrObj.player.push(funCompetitionList[j]);
                    }
                    if(allEndOtherArr.indexOf(competitionCode)!=-1){
                        arrObj.other.push(funCompetitionList[j]);
                    }
                    var fieldValues=[];
                    for(var k = 0;k<matchDetailList.length;k++){
                        if(matchDetailList[k].matchId==matchList[i].matchId){
                            fieldValues=matchDetailList[k].fieldValues[fullEndKey[funCompetitionList[j].competitionCode]];
                            // fieldValues.push(matchDetailList[k].fieldValues[fullEndKey[funCompetitionList[j].competitionCode]]);
                        }
                    }
                    funCompetitionList[j].fieldValues=fieldValues;
                };
            }
            for(var l=1;l<typeArr.length;l++){
                if(!arrObj.act&&arrObj[typeArr[l]].length>0){
                    arrObj.act = typeArr[l];
                }
            }
            matchList[i].matchDetailList = arrObj;
        }

        var ht = template("new_play_all_end",data.data);
        $('.game-end').html(ht)
        log(data);
    }
    function initEndFull(){
        //已结束 点击 英雄 战队 选手 其他 切换
        $('.quizList ').on("click",".game-end .new_play .list li",function(e){
            $(this).addClass("active").siblings().removeClass('active');
            var index = $(this).index();
            $(this).parent().parent().find(".panel > div").each(function(i,item){
                if(i == index){
                    $(this).removeClass("hide");
                }else{
                    $(this).addClass("hide");
                }
            });
        });
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


                showGuessTabe('.game-guesting');
                if(cacheObj.singleAll==1){
                    loadGuess();
                }else{
                    loadAllGuess();
                }
            }else{
                //已结束
                if(cacheObj.singleAll==1){
                    singleEndLoad();
                }else{
                    fullEndLoad();
                }
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
                    showPlantFormLogin();
                }else{
                    loginStatus();
                    $('.guessPage > .bet').html(template('bet',data));
                    $(".mask").show();
                    $(".guessPage > .bet .popup_bet").show();
                    $(".guessPage > .bet .popup_bet").animate({top: "27%"}, 300);
                }
            })
            //-----
            // if(document.cookie == ''){
            //     hhly_login.show();
            //     return;
            // }
            // loginStatus();
            // $('.bet').html(template('bet',data));
            // $(".mask").show();
            // $(".popup_bet").show();
            // $(".popup_bet").animate({top: "27%"}, 300);
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
            showPlantFormLogin();
        });
        //签到
        $(".headTop").delegate(".sign","click",function(){
            //$(".sign_popup").html(template("sign",null));
        })
        //exit login
        $(".headTop").delegate(".exitLogin","click",function(){
            clearAllCookie();
            loginStatus();
        })
    }
    function showPlantFormLogin() {
        hhly_login.show();
        hhly_login.initConfig({
            "platformId": cacheObj.platformId ,
            "success": function (data){
                var user = data.user;
                user.channel = cacheObj._channel_.dj;
                moudle.cookieServer('api/user/login-platform',user,function(data){
                    loginStatus();
                })
                $('#hhly_sso_login_mask').fadeOut(100);
                $('#hhly_sso_login').slideUp(200);
                $("body").height($(window).height()).css({"overflow": ""});
                //judge login
            }
        });
    }
    function showGuessTabe(selector) {
        log('show',selector);
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
        $(".quizList .game-guesting").delegate(".quizItem .btn_analyse","click",function(e){
            var target = $(e.currentTarget),
                aName = target.attr("data-teamAName"),
                bName = target.attr("data-teamBName"),
                gameCode = target.attr("data-code"),
                aId = target.attr("data-aid"),
                bId = target.attr("data-bid");
            moudle.cookieServer('api/match/team-compare',{teamAId: aId,teamBId: bId,gameCode: gameCode},function(data){
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

        $('.match_analyse_box,.peilv,.mask').click(function(){
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
            log("gameClass click")
            $(this).addClass("active").siblings().removeClass("active");
            var gameCode = $(this).attr("data-gameCode");
            arr = [];
            cacheObj.gameCode = gameCode;
            loadMatchList();
            if(showSingleAll(gameCode)){
                //默认进入单场 single
                $('.single_all .single').trigger("click");
            }else{
                cacheObj.singleAll=1;
                //自动触发 竞猜中 点击
                $($(".guessStateTab a")[0]).trigger("click");
                // loadGuess();
            }
        })
    }
    function showSingleAll(gameCode) {
        //是否显示 单场 全系列赛 tab
        var arr=['dota2','lol'];
        if(arr.indexOf(gameCode)!=-1){
            $('.single_all').show();
        }else{
            $('.single_all').hide();
        }
        return arr.indexOf(gameCode)!=-1
    }
    function initSingleAllTab() {
        $('.single_all div').on("click",function(e){
            log($(this).index());
            //
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();//0 single 1 all
            if(index==0){
                //single
                cacheObj.singleAll=1;
            }else{
                //all
                cacheObj.singleAll=2;
            }
            $($(".guessStateTab a")[0]).trigger("click");
        })
    }
    function loadSingleGuess() {
        //单场
        moudle.ajax({
            url: '/api/match/guessing',
            type: 'POST',
            data: {
                gameCode: cacheObj.gameCode,
                pageIndex: 1,
                pageSize: 3,
                bGameIds: '',
                roundType: 1
            }
        }, function (data) {
            renderPage(data);
        });

    }

    function loadAllGuess() {
        //加载全系列赛
        //api/match/fun-all/guessing
        moudle.ajax({
                url: '//api/match/fun-all/guessing',
                type: 'POST',
                data: {
                    gameCode: cacheObj.gameCode,
                    pageIndex: 1,
                    pageSize: 3,
                    bGameIds: ''
                }
            }, function (data) {
                renderAll(data);
            }
        )
    }
    //全系列赛 渲染
    function renderAll(data){
        log(data);
        // dataDeal(data);
        //matchList
        //funCompetitionList
        var matchList = data.data.matchList;
        var funCompetitionList = data.data.funCompetitionList;
        //matchDetailList
        log(cacheObj.gameCode);
        var typeArr=[,'hero','team','player','other'];
        for(var i=0;i<matchList.length;i++){
            var match = matchList[i];
            var arrObj={hero:[],team:[],player:[],other:[]};
            for(var j = 0;j<funCompetitionList.length;j++){
                if(match.matchDetailId==funCompetitionList[j].matchDetailId){

                    arrObj[typeArr[funCompetitionList[j].competitionObject]].push(funCompetitionList[j]);
                }
            }
            for(var k=1;k<typeArr.length;k++){
                if(! arrObj.act&&arrObj[typeArr[k]].length>0){
                    arrObj.act = typeArr[k];
                }
            }
            splitAllMatchOther(arrObj)
            arrObj.matchDetailId = match.matchDetailId;
            arrObj.matchName = match.matchName;
            match.matchDetailList = arrObj;
        }
        log(data);
        $('.quizList .game-guesting').empty();
        $('.quizList .game-guesting').append(template('new_play_all',data.data));
    }
    function splitAllMatchOther(arrObj){
        //其他 竞猜 分组
        var other = arrObj.other;
        if(!other||other.length==0){
            return arrObj;
        }
        var arr=[];
        var codeArr=[];
        var codeIndex=0;
        for(var i=0;i<other.length;i++){
            if(codeArr.indexOf(other[i].competitionCode)==-1){
                codeArr.push(other[i].competitionCode);
            }
            codeIndex = codeArr.indexOf(other[i].competitionCode);
            arr[codeIndex]?arr[codeIndex].push(other[i]):arr[codeIndex]=[other[i]];
        }
        arrObj.other = arr;
        return arrObj;
    }
    function initAllMatchEvent(){
        //点击 英雄 战队 选手 其他 切换
        $('.quizList .game-guesting').on("click",".new_play .list li",function(e){
            $(this).addClass("active").siblings().removeClass('active');
            var index = $(this).index();
                $(this).parent().parent().find(".panel > div").each(function(i,item){
                    if(i == index){
                        $(this).removeClass("hide");
                    }else{
                        $(this).addClass("hide");
                    }
                });
        });
        //点击 竞猜项
        $('.quizList .game-guesting').on("click",".new_play .panel .hero_panel .guess_all_list li input",function (e) {
            var guessCode = $(this).parent().attr("data-competitionCode");
            var matchDetailId = $(this).parent().attr("data-matchDetailId");
            var title = $(this).parent().find("span").text();
            //检测登录
            checkLogin({
                guessCode: guessCode,
                matchDetailId: matchDetailId,
                gameCode:cacheObj.gameCode
            },title,getFullHeroList);
        });
        $('.quizList .game-guesting').on("click",".new_play .panel .team_panel .guess_all_list li input",function (e) {
            var guessCode = $(this).parent().attr("data-competitionCode");
            var matchDetailId = $(this).parent().attr("data-matchDetailId");
            var title = $(this).parent().find("span").text();
            //检测登录
            checkLogin({
                guessCode: guessCode,
                matchDetailId: matchDetailId,
                gameCode:cacheObj.gameCode
            },title,getFullTeamList);
        });
        $('.quizList .game-guesting').on("click",".new_play .panel .player_panel .guess_all_list li input",function (e) {
            var guessCode = $(this).parent().attr("data-competitionCode");
            var matchDetailId = $(this).parent().attr("data-matchDetailId");
            var title = $(this).parent().find("span").text();
            //检测登录
            checkLogin({
                guessCode: guessCode,
                matchDetailId: matchDetailId,
                gameCode:cacheObj.gameCode
            },title,getFullPlayerList);
        });
        function checkLogin(obj,title,callBack){
            moudle.cookieServer('api/user/has-login', '', function (data) {
                //请求赔率
                if(data.status!=200){
                    showPlantFormLogin();
                    return;
                }
                callBack(obj,title)
            });
        }
        function getFullPlayerList(obj,title) {
            //full-player-list
            moudle.cookieServer('api/competition/full-player-list',
                obj,
                function (data) {
                    data.title=title;
                    data.gameCode =  cacheObj.gameCode;
                    var item;
                    for(var i = 0;i<data.data.length;i++){
                        item = data.data[i];
                    }
                    $('.popup-all-match').html(template('new_player_popup_player', data));
                    $('.popup-all-match,.mask').show();
                });
        }
        function getFullTeamList(obj,title){
            moudle.cookieServer('api/competition/full-team-list',
                obj,
                function (data) {
                    data.title=title;
                    data.gameCode =  cacheObj.gameCode;
                    var item;
                    for(var i = 0;i<data.data.length;i++){
                        item = data.data[i];
                    }
                    $('.popup-all-match').html(template('new_player_popup_team', data));
                    $('.popup-all-match,.mask').show();
                });

        }
        function getFullHeroList(obj,title) {
            moudle.cookieServer('api/competition/full-hero-list',
                obj,
                function (data) {
                    data.title=title;
                    data.gameCode =  cacheObj.gameCode;
                    var item;
                    for(var i = 0;i<data.data.length;i++){
                        item = data.data[i];
                        if(data.gameCode=='lol'){
                            item.icon = lol_img(item.icon);
                        }else{
                            item.icon = dota_img(item.icon);
                        }
                    }
                    $('.popup-all-match').html(template('new_player_popup_hero', data));
                    $('.popup-all-match,.mask').show();
                });
        }
        //选择英雄
        $('.guessPage').on('click', '.popup-all-match .select_popup li', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var playerImg = $(this).attr('data-playerImg'),
                odds = $(this).attr('data-odds'),
                playerName = $(this).attr('data-playerName'),
                competitionId = $(this).attr('data-competitionId');
            $('.popup-all-match .chooseplayer img').attr('src', playerImg);
            $('.popup-all-match .chooseplayer').attr('data-competitionid', competitionId);
            $('.popup-all-match .chooseplayer p').html(playerName);
            $('.popup-all-match .compensate span').html(odds);
            // calProfit();
        });
        //计算 收益
        $('.guessPage').on('keyup', '.popup-all-match .bet_limit input', function () {
            shouyi($(this),$(this).parent().parent().find(".compensate span"),$(this).parent().parent().find(".income span"));
        });
        //点击 关闭
        $('.guessPage').on('click', '.popup-all-match .close', function () {
            $('body').css('overflow-y', 'scroll');
            $('.popup-all-match,.mask').hide();
            $('.popup-all-match').empty();
        });
        //全系列赛 投注
        $('.guessPage').on('click', '.popup-all-match .betBtn', function () {
            var competitionid ;
            var betCount = $('.popup-all-match .bet_limit input').val();
            competitionid = $(this).parent().parent().parent().find(".left_popup .head .chooseplayer").attr("data-competitionid");
            if (!betCount) {
                Util.popup.show("请输入投注金币");
            } else if (betCount < 10) {
                Util.popup.show("最少投注10金币");
            } else {
                moudle.cookieServer('/api/bet/save', {
                    competitionId: competitionid,
                    money: betCount,
                    gameCode: cacheObj.gameCode,
                    channel: 'P00001'
                }, function (data) {
                    if (data.status == 200) {
                        Util.popup.show("投注成功");
                        moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
                            $('.popup_old .balance span').html(data.data);
                        })
                    } else {
                        Util.popup.show(data.msg);
                    }
                });
            }
        });
        //其他 竞猜 投注
        $('.guessPage').on('click', '.bet_all .popup_bet .betBtn', function () {
            //.bet_all .popup_bet .betCoin
            var competitionid ;
            var betCount = $(this).parent().parent().find('.betCount .betCoin').val();
                //$('.popup-all-match .bet_limit input').val();
            var competitionid = $(this).attr("data-id");
            if (!betCount) {
                Util.popup.show("请输入投注金币");
            } else if (betCount < 10) {
                Util.popup.show("最少投注10金币");
            } else {
                moudle.cookieServer('/api/bet/save', {
                    competitionId: competitionid,
                    money: betCount,
                    gameCode: cacheObj.gameCode,
                    channel: 'P00001'
                }, function (data) {
                    if (data.status == 200) {
                        Util.popup.show("投注成功");
                        moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
                            $('.popup_old .balance span').html(data.data);
                        })
                    } else {
                        Util.popup.show(data.msg);
                    }
                });
            }
        });
        //点击 其他 竞猜项
        $('.quizList .game-guesting').on("click",".new_play .panel .other_panel .ratio .ratio-list",function (e) {
            var guessCode = $(this).attr("data-competitionId");
            var matchDetailId = $(this).attr("data-matchDetailId");
            var title = "xxxxxx";
            log(guessCode,matchDetailId,title);
            var competitionId = $(this).attr('data-competitionId'),
                // _matchVsScore = $(this).parent().parent().parent().parent().parent().parent(),
                top_title = $(this).parent().parent().find('.top_title').html(),
                // first_play = $(this).parent().parent().parent().parent().find('.first_play').html(),
                betItem = $(this).find('.betItem').html(),
                betbilv = $(this).find('.betbilv').html(),
                title = $(this).attr("data-matchName"),
                str =  title + '  |  全系列赛' +top_title+ ' ' + betItem+'@'+betbilv;
            log(str);
            var betObj={};
            betObj.data={};
            betObj.data.gameName=cacheObj.gameName;
            betObj.data.gameCode=cacheObj.gameCode;
            betObj.data.matchName = title;
            betObj.data.topTitle = top_title;
            betObj.data.betItem = betItem;
            betObj.data.odds = betbilv;
            betObj.data.competitionId = competitionId;
            moudle.cookieServer('api/user/has-login', '', function (data) {
                if (data.status == 200) {
                    $('.bet_all').html(template('bet_all_other',betObj));
                    $(".mask").show();
                    $(".bet_all .popup_bet").show();
                    $(".bet_all .popup_bet").animate({top: "27%"}, 300);
                    moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
                        log(data);
                        // $('.popup_old .balance span').html(data.data);
                    })
                } else {
                    showPlantFormLogin();
                }
            });
            return;
            // //检测登录
            // checkLogin({
            //     guessCode: guessCode,
            //     matchDetailId: matchDetailId,
            //     gameCode:cacheObj.gameCode
            // },title,getFullPlayerList);
        });
        //其他 竞猜 投注 计算 收益
        $('.guessPage').on('keyup','.bet_all .popup_bet .betCoin', function () {
            log("keykeykey")
            var peilv = $(this).parent().parent().find(".bet_des .odds");
            var shouy = $(this).parent().parent().find(".bet_des .pre-win");
            shouyi($(this),peilv,shouy);
        });

    }
    function freshCoin(selector,callBack){
        moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
            if(selector){
                $(selector).html(data.data);
            }
            if(callBack){
                callBack.apply(null,data.data);
            }
        })
    }
    // 计算 收益
    function shouyi(shuru,peilu,shouyi){
        if(shuru.val()){
            log(peilu.text())
            var profit = Number(peilu.text()) * Number(shuru.val());
            shouyi.html(profit.toFixed(2))
        }
    }

    function logOut() {
        ///api/user/logout
        moudle.cookieServer('/api/user/logout', '', function () {
            clearAllCookie();
            var data = {
                status: 300
            }
            $('.headTop').html(template('headTop', data));
        })
    }
    //delete all cookie
    function clearAllCookie(){
        var lyy=['user_lyy_com','regTime_lyy_com']
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        var rootDomain="";
        rootDomain = document.domain.replace(/(.*)\.(\w+\.com)/,"$2");
        if(keys) {
            for(var i = keys.length; i--;){
                if(lyy.indexOf(keys[i])!=-1){
                    document.cookie = keys[i] + '=0;domain='+rootDomain+';expires=' + new Date(0).toUTCString();
                }else{
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
                }
            }
        }
    }

    function getPlantFormId() {
        //get plartform id
        moudle.cookieServer('api/common/getPlatformId','',function(data){
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


    //------------new js-------------------

    function loadNewGame(){
        moudle.ajax({
            url: '/api/match/guessing',
            type: 'POST',
            data: {
                gameCode: cacheObj.gameCode,
                pageIndex: 1,
                pageSize: 3,
                bGameIds: '',
                roundType: 1
            }
        }, function (data) {
            renderPage(data);
        });
    }
    function dataDeal(data) {
        $.each(data.data.matchList, function (i, item) {
            var detail = [];
            $.each(data.data.matchDetailList, function (i, itemDetail) {
                var bMatchId = itemDetail.bMatchId,
                    matchDetailId = itemDetail.matchDetailId,
                    this_fun = [],
                    obj = {},
                    newArray = [];
                if (bMatchId == item.bMatchId) {
                    itemDetail.teamALogo = item.teamALogo;
                    itemDetail.teamBLogo = item.teamBLogo;
                    itemDetail.teamAName = item.teamAName;
                    itemDetail.teamBName = item.teamBName;
                    itemDetail.scoreA =item.scoreA;
                    itemDetail.scoreB =item.scoreB;
                    detail.push(itemDetail)
                }
                $.each(data.data.funCompetitionList, function (i, fun) {
                    if (fun.matchDetailId == matchDetailId) {
                        this_fun.push(fun)
                    }
                });
                itemDetail.fun = this_fun;
                $.each(itemDetail.fun, function (i, item) {
                    if (item.competitionObject == 4) {
                        if (!obj[item.competitionCode]) {
                            obj[item.competitionCode] = [];

                        }
                        obj[item.competitionCode].push(item)
                    }
                });
                for (var i in obj) {
                    newArray.push(obj[i]);
                }
                itemDetail.otherGuess = newArray;
            });
            item.matchDetail = detail;
        });
        log(data);
        return data;
    }

    function initNewEvent() {
        //选手竞猜和其他竞猜切换
        $('.guessPage').on('click', '.select-title span', function () {
            $(this).addClass('active').siblings().removeClass('active');
            if ($(this).hasClass('title-players')) {
                $(this).parent().parent().find('.players').show().find('.intro').html('选手竞猜');
                $(this).parent().parent().find('.others').hide();
            } else {
                $(this).parent().parent().find('.others').show().find('.intro').html('其他玩法');
                $(this).parent().parent().find('.players').hide();
            }
        });
        //新 队员弹窗-打开
        $('.guessPage').on('click', '.new_play .guess_list li input', function () {
            var guessCode = $(this).parent().attr('data-competitionCode'),
                matchDetailId = $(this).parent().attr('data-matchDetailId'),
                guessItemName = $(this).siblings('span').html();
            // freshCoin(null,function(coinNum){})
            moudle.cookieServer('api/user/has-login', '', function (data) {
                if (data.status == 200) {
                    $('body').css('overflow-y', 'hidden');
                    moudle.ajax({
                        url: '/api/competition/single-player-list',
                        type: 'POST',
                        data: {
                            guessCode: guessCode,
                            matchDetailId: matchDetailId
                        }
                    }, function (data) {
                        $('.popup-teammember').html(template('popup-teammember', data));
                        $('.popup-teammember .title').html(guessItemName);
                        $('.popup-teammember,.mask').show();
                        moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
                            $('.popup-teammember .balance span').html(data.data);
                        })
                    });
                } else {
                    showPlantFormLogin();
                }
            })
        });

        //新 队员弹窗-关闭
        $('.guessPage').on('click', ' .popup-teammember .close', function () {
            $('body').css('overflow-y', 'scroll');
            $('.popup-teammember,.mask').hide();
        });
        //新 队员弹窗-队员筛选
        $('.guessPage').on('click', '.popup-teammember .select_popup li', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var playerImg = $(this).attr('data-playerImg'),
                odds = $(this).attr('data-odds'),
                competitionid = $(this).attr('data-competitionid'),
                playerName = $(this).attr('data-playerName');
            $('.chooseplayer img').attr('src', playerImg);
            $('.chooseplayer p').html(playerName);
            $('.chooseplayer').attr('data-competitionid', competitionid);
            $('.compensate span').html(odds)
            calProfit();
        });
        //新 隊員弹窗-input金币-赔率变化
        $('.guessPage').on('keyup', '.popup-teammember .bet_limit input', function () {
            calProfit()
        });

        //新 队员弹窗-投注
        $('.guessPage').on('click', '.popup-teammember .betBtn', function () {
            var competitionid = $('.popup-teammember .chooseplayer').attr('data-competitionid'),
                compensate = $('.popup-teammember .compensate span').html(),
                betCount = $('.bet_limit input').val();
            if (!$('.compensate span').html()) {
                Util.popup.show("请选择选手");
            } else if (!$('.bet_limit input').val()) {
                Util.popup.show("请输入投注金币");
            } else if ($('.bet_limit input').val() < 10) {
                Util.popup.show("最少投注10金币");
            } else {
                moudle.cookieServer('/api/bet/save', {
                    competitionId: competitionid,
                    money: betCount,
                    gameCode: 'lol',
                    channel: 'P00001'
                }, function (data) {
                    if (data.status == 200) {
                        Util.popup.show("投注成功");
                        moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
                            $('.popup-teammember .balance span').html(data.data);
                        })
                        moudle.ajax({
                            url: '/api/match/guessing',
                            type: 'POST',
                            data: {
                                gameCode: 'lol',
                                pageIndex: 1,
                                pageSize: 3,
                                bGameIds: '',
                                roundType: 1
                            }
                        }, function (data) {
                            //投注後重新渲染
                            renderPage(data);
                        });
                    } else {
                        Util.popup.show(data.msg);
                    }
                });
            }
        });
        //竞猜中 -已结束-玩法介绍tab切换
        $('.guessPage').on('click', '.guessStateTab a', function () {
            // $(this).addClass('active').siblings().removeClass('active');
            // if ($(this).hasClass('gsing')) {
            //     $('.game-guesting').addClass('active');
            //     $('.guessEnd,.game-rule').removeClass('active');
            // } else if ($(this).hasClass('gsend')) {
            //     $('.game-end').addClass('active');
            //     $('.game-guesting,.game-rule').removeClass('active');
            // } else {
            //     $('.game-rule').addClass('active');
            //     $('.game-guesting,.game-end').removeClass('active');
            // }
        });

        //玩法介绍 ？ 跳转
        $('.guessPage').on('click', '.icon_intro', function () {
            $('.gsrule').addClass('active').siblings().removeClass('active');
            $('.game-rule').addClass('active');
            $('body').scrollTop(0);
            $('.game-guesting,.game-end').removeClass('active');
        });
        //新 其他玩法弹窗-旧弹窗-打开
        $('.guessPage').on('click', '.new_play .guess-list .ratio-list', function () {
            var competitionId = $(this).attr('data-competitionId'),
                _matchVsScore = $(this).parent().parent().parent().parent().parent().parent(),
                top_title = $(this).parent().parent().find('.top_title').html(),
                first_play = $(this).parent().parent().parent().parent().find('.first_play').html(),
                betItem = $(this).find('.betItem').html(),
                betbilv = $(this).find('.betbilv').html(),
                title = _matchVsScore.find('.matchTitle').html(),
                str = _matchVsScore.attr('data-gameName') + '  ' + title + '  |  ' + _matchVsScore.attr('data-teamAName') + '  VS  ' + _matchVsScore.attr('data-teamBName') + ' ' + first_play;
            moudle.cookieServer('api/user/has-login', '', function (data) {
                if (data.status == 200) {
                    $('.popup_old .betMatch').html(str).attr('data-competitionId', competitionId);
                    $('.popup_old .betObject .betItem').html(top_title + ' ' + betItem);
                    $('.popup_old .betbilv').html(betbilv);
                    $(".popup_old").animate({top: "27%"}, 300);
                    $(".popup_old,.mask").show();
                    moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
                        $('.popup_old .balance span').html(data.data);
                    })
                } else {
                    showPlantFormLogin();
                }
            });
        });
        //新 其他玩法弹窗-旧弹窗-input金币-赔率变化
        $('.guessPage').on('keyup', '.popup_old .betCoin', function () {
            log("kkkkup");
            var benfit = $(this).val() * $('.betbilv').html();
            $('.popup_old .canwin').html(benfit.toFixed(2));
        });

        //新 其他玩法弹窗-旧弹窗-投注
        $('.guessPage').on('click', '.popup_old .betBtn', function () {
            log("bet bet");
            var competitionid = $('.popup_old .betMatch').attr('data-competitionid'),
                betCount = $('.popup_old .betCoin').val();
            if (!betCount) {
                Util.popup.show("请输入投注金币");
            } else if (betCount < 10) {
                Util.popup.show("最少投注10金币");
            } else {
                moudle.cookieServer('/api/bet/save', {
                    competitionId: competitionid,
                    money: betCount,
                    gameCode: 'lol',
                    channel: 'P00001'
                }, function (data) {
                    if (data.status == 200) {
                        Util.popup.show("投注成功");
                        moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
                            $('.popup_old .balance span').html(data.data);
                        })
                        moudle.ajax({
                            url: '/api/match/guessing',
                            type: 'POST',
                            data: {
                                gameCode: 'lol',
                                pageIndex: 1,
                                pageSize: 3,
                                bGameIds: '',
                                roundType: 1
                            }
                        }, function (data) {
                            //投注後重新渲染
                            renderPage(data);
                        });
                    } else {
                        Util.popup.show(data.msg);
                    }
                });
            }
        });


        //新 其他玩法弹窗-旧弹窗-关闭
        $('.guessPage').on('click', '.popup_old .closePopup', function () {
            // .closePopup
            log("xxxxxxxxxxxx555555555555555");
            $(".guess_box li a").removeClass("active");
            $(".popup_old").animate({top: "106%"}, 300, function () {
                $(this).css("top", "-57%");
                $(".popup_old").hide();
            });
            $(".mask").hide();
            $("input.betCoin").val("");
        });
        log("---0-0-0-0-0-");
        //新 总局弹窗-打开
        $('.guessPage').on('click', '.game-guesting .bet input', function () {
            log("-------------------------")
            var _matchVsScore = $(this).parent().parent().parent().parent(),
                title = _matchVsScore.find('.matchTitle').html(),
                competitionId = $(this).parent().attr('data-competitionId'),
                all_prize = $(this).parent().siblings('.bet_detail').find('span').html(),
                teamName = $(this).siblings('.teamName').html(),
                str = _matchVsScore.attr('data-gameName') + '  ' + title + '  |  ' + _matchVsScore.attr('data-teamAName') + '  VS  ' + _matchVsScore.attr('data-teamBName') + '  总局';
            moudle.cookieServer('api/user/has-login', '', function (data) {
                if (data.status == 200) {
                    $('body').css('overflow-y', 'hidden');
                    $('.popup_bet_new .betMatch').html(str).attr('data-competitionId', competitionId);
                    $('.popup_bet_new .betWin span').html(teamName);
                    $('.popup_bet_new .betObject span').html(all_prize);
                    $('.popup_bet_new,.mask').show();
                    moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
                        $('.popup_bet_new .balance span').html(data.data);
                    })
                } else {
                    showPlantFormLogin();
                }
            });
        });
        //新 总局弹窗-关闭
        $('.guessPage').on('click', '.popup_bet_new .closePopup', function () {
            $('body').css('overflow-y', 'scroll');
            $('.popup_bet_new,.mask').hide();
        });
        //新 总局弹窗-投注
        $('.guessPage').on('click', '.popup_bet_new .betBtn', function () {
            var competitionid = $('.popup_bet_new .betMatch').attr('data-competitionid'),
                betCount = $('.popup_bet_new .betCoin').val();
            if (!betCount) {
                Util.popup.show("请输入投注金币");
            } else if (betCount < 10) {
                Util.popup.show("最少投注10金币");
            } else {
                moudle.cookieServer('/api/bet/save', {
                    competitionId: competitionid,
                    money: betCount,
                    gameCode: 'lol',
                    channel: 'P00001'
                }, function (data) {
                    if (data.status == 200) {
                        Util.popup.show("投注成功");
                        moudle.cookieServer('api/user-center/get-account-sum', '', function (data) {
                            $('.popup_bet_new .balance span').html(data.data);
                        });
                        moudle.ajax({
                            url: '/api/match/guessing',
                            type: 'POST',
                            data: {
                                gameCode: 'lol',
                                pageIndex: 1,
                                pageSize: 3,
                                bGameIds: '',
                                roundType: 1
                            }
                        }, function (data) {
                            //投注後重新渲染
                            renderPage(data);
                            var all_prize = $('.new_play .bet input').parent().siblings('.bet_detail').find('span').html();
                            $('.popup_bet_new .betObject span').html(all_prize);
                        });
                    } else {
                        Util.popup.show(data.msg);
                    }
                });
            }
        });
        //用户登陆
        $(".guessPage").on("click", ".exitLogin", logOut);
        //用户退出
        $(".guessPage").on("click", ".loginBtn", showPlantFormLogin);
        //新 多選手彈窗-打開
        $('.guessPage').on('click', '.playerName i', function () {
            $('.popup_mutiplayers').show();
            $('.popup_mutiplayers .header .title').html($(this).parent().next().html());
        });
        //新 多選手彈窗-關閉
        $('.guessPage').on('click', '.popup_mutiplayers .closePopup', function () {
            $('.popup_mutiplayers').hide();
        });

        //
        // $('.guessPage').on('click', '.guess-list', function () {
        //     $(".popup_bet").show();
        //     $(".popup_bet").animate({top: "27%"}, 300);
        //     $(".mask").show();
        // });
        // $('.guessPage').on('click', '.popup_old .closePopup', function () {
        //     $(".guess_box li a").removeClass("active");
        //     $(".popup_bet").animate({top: "106%"}, 300, function () {
        //         $(this).css("top", "-57%");
        //         $(".popup_bet").hide();
        //     });
        //     $(".mask").hide();
        //     $("input.betCoin").val("");
        // });
        // $('.guessPage').on('click', '.popup-teammember .select_popup li', function () {
        //     $(this).addClass('active').siblings().removeClass('active');
        //     var playerImg = $(this).attr('data-playerImg'),
        //         odds = $(this).attr('data-odds'),
        //         playerName = $(this).attr('data-playerName');
        //     $('.chooseplayer img').attr('src', playerImg);
        //     $('.chooseplayer p').html(playerName);
        //     $('.compensate span').html(odds)
        //     calProfit();
        // });
        // //原始 新玩法弹窗
        // $('.guessPage').on('click', '.bet input', function () {
        //     var _matchVsScore = $(this).parent().parent().parent().siblings('.matchVsScore');
        //     var all_prize = $(this).parent().siblings('.bet_detail').find('span').html();
        //     var teamName = $(this).siblings('.teamName').html();
        //     var str = _matchVsScore.attr('data-gameName') + '  ' + _matchVsScore.find('.matchTitle').html() + '  |  ' + _matchVsScore.attr('data-teamAName') + '  VS  ' + _matchVsScore.attr('data-teamBName') + '  总局';
        //     $('body').css('overflow-y', 'hidden');
        //     $('.popup_bet_new .betMatch').html(str);
        //     $('.popup_bet_new .betWin span').html(teamName);
        //     $('.popup_bet_new .betObject span').html(all_prize);
        //     $('.popup_bet_new,.mask').show();
        // });
        // $('.guessPage').on('click', '.popup_bet_new .closePopup', function () {
        //     $('body').css('overflow-y', 'scroll');
        //
        //     $('.popup_bet_new,.mask').hide();
        // });
        // $('.guessPage').on('keyup', '.popup-teammember .bet_limit input', function () {
        //     calProfit()
        // });
    }

    function refactorGuessEndData(data) {
        var matchDetailList = data.data.matchDetailList,
            funCompList = data.data.funCompetitionList,
            funCompJSON = {},
            matchDetailJSON = {},
            funComp,
            matchDetail,
            funSingleVO;

        for (var i = 0; i < matchDetailList.length; i++) {
            matchDetail = matchDetailList[i];
            matchDetailJSON[matchDetail.matchDetailId] = matchDetail;
        }

        for (var i = 0; i < funCompList.length; i++) {
            funComp = funCompList[i];
            funCompJSON[funComp.competitionCode + funComp.matchDetailId] = funComp;
        }
        for (var i = 0; i < matchDetailList.length; i++) {
            matchDetail = matchDetailList[i];
            funSingleVO = matchDetail.funSingleVO;

            if (!matchDetail.funSingleVO) {
                continue;
            }

            // 本局比赛中的MVP
            funComp = funCompJSON['DMVP' + matchDetail.matchDetailId];
            if (funComp) {
                funComp.value = [funSingleVO.mvp];
            }

            // 死亡次数最多的选手
            funComp = funCompJSON['DDMP' + matchDetail.matchDetailId];
            if (funComp) {
                funComp.value = funSingleVO.maxDeathTimesPlayerList;
            }

            // 击杀次数最多的选手
            funComp = funCompJSON['DKMP' + matchDetail.matchDetailId];
            if (funComp) {
                funComp.value = funSingleVO.maxKillTimesPlayerList;
            }

            // 输出最多的选手
            funComp = funCompJSON['DSMP' + matchDetail.matchDetailId];
            if (funComp) {
                funComp.value = funSingleVO.maxHurtPlayerList;
            }

            // 打钱最多的选手
            funComp = funCompJSON['DMMP' + matchDetail.matchDetailId];
            if (funComp) {
                funComp.value = funSingleVO.maxMoneyPlayerList;
            }

            // 三路中哪路最先被破
            funComp = funCompJSON['DMW' + matchDetail.matchDetailId];
            if (funComp) {
                funComp.value = funSingleVO.breakPosition;
            }

            // 本局出现的最高连杀
            funComp = funCompJSON['DMCK' + matchDetail.matchDetailId];
            if (funComp) {
                funComp.value = funSingleVO.maxComboKill;
            }

            // 本局出现的最高连杀
            funComp = funCompJSON['DTIME' + matchDetail.matchDetailId];
            if (funComp) {
                funComp.matchTime1 = funSingleVO.matchTime1;
                funComp.matchTime2 = funSingleVO.matchTime2;
            }

            // 奖金池，数据重组
            funComp = funCompJSON['ZSW' + matchDetail.matchDetailId];
            if (funComp && matchDetail.funSingleVO.bonusPool) {
                funComp.bonusPool = matchDetail.funSingleVO.bonusPool.bonusPoolA;
                funComp.teamId = matchDetail.teamAId;

                var funCompOther = $.extend({}, funComp);
                funCompOther.bonusPool = matchDetail.funSingleVO.bonusPool.bonusPoolB;
                funCompOther.teamId = matchDetail.teamBId;

                funCompList.push(funCompOther);
            }
        }
        return data
    }

    function calProfit(inputVal) {
        if (($('.compensate span').html() && $('.bet_limit input').val())) {
            var profit = $('.compensate span').html() * $('.bet_limit input').val();
            $('.popup-teammember .income span').html(profit.toFixed(2))
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

    function renderPage(data) {
        // $('.quizList .game-guesting').empty();
        handleData(data);
        dataDeal(data);
        $('.quizList .game-guesting').append(template('new_play', data));
        if(cacheObj.gameCode == "ow" || cacheObj.gameCode == "cf"){
            $('.quizList .game-guesting').append(template('guess',data.data));
        }else{
            $('.quizList .game-guesting').append(template('quizItem',data.data));
        }
    }
});