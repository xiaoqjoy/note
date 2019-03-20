$(function () {
    var cacheObj = {
        _channel_: {
            //  电竞渠道
            dj: 'P00001',
            //  一比分渠道
            live: 'P00002',
            //  平台渠道
            platform: 'P00003'
        }
    };
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
    template.helper('boCN', function (obj) {
        var array = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
        return '第' + array[obj - 1] + '局';
    });
    template.helper('dateChange', function (obj) {
        var newDate = moudle.formatTime(new Date(obj)).date + ' ' + moudle.formatTime(new Date(obj)).clock;
        return newDate;
    });
    getPlantFormId();
    loginStatus();
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
        renderPage(data);
    });
    moudle.ajax({
        url: '/api/match/guess-end',
        type: 'POST',
        data: {
            gameCode: 'lol',
            pageIndex: 1,
            pageSize: 3,
            bGameIds: '',
            roundType: 1
        }
    }, function (data) {
        refactorGuessEndData(data);
        $('.game-end').html(template('new_play_end', dataDeal(data)))
    });
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
                        renderPage(data);
                    });
                } else {
                    Util.popup.show(data.msg);
                }
            });
        }
    });
    //竞猜中 -已结束-玩法介绍tab切换
    $('.guessPage').on('click', ' .guessStateTab a', function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).hasClass('gsing')) {
            $('.game-guesting').addClass('active');
            $('.game-end,.game-rule').removeClass('active');
        } else if ($(this).hasClass('gsend')) {
            $('.game-end').addClass('active');
            $('.game-guesting,.game-rule').removeClass('active');
        } else {
            $('.game-rule').addClass('active');
            $('.game-guesting,.game-end').removeClass('active');
        }

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
                });
            } else {
                showPlantFormLogin();
            }
        });
    });
    //新 其他玩法弹窗-旧弹窗-input金币-赔率变化
    $('.guessPage').on('keyup', '.popup_old .betCoin', function () {
        var benfit = $(this).val() * $('.betbilv').html();
        $('.popup_old .canwin').html(benfit.toFixed(2));
    });
    //新 其他玩法弹窗-旧弹窗-投注
    $('.guessPage').on('click', '.popup_old .betBtn', function () {
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
        $(".guess_box li a").removeClass("active");
        $(".popup_old").animate({top: "106%"}, 300, function () {
            $(this).css("top", "-57%");
            $(".popup_old").hide();
        });
        $(".mask").hide();
        $("input.betCoin").val("");
    });
    //新 总局弹窗-打开
    $('.guessPage').on('click', '.new_play .bet input', function () {
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
                });
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
    //----------------函数区----------
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
                    itemDetail.scoreA = item.scoreA;
                    itemDetail.scoreB = item.scoreB;
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
        console.log(data)
        return data;
    }

    function calProfit(inputVal) {
        if (($('.compensate span').html() && $('.bet_limit input').val())) {
            var profit = $('.compensate span').html() * $('.bet_limit input').val();
            $('.popup-teammember .income span').html(profit.toFixed(2))
        }
    }

    function renderPage(data) {
        $('.new_play').html(template('new_play', dataDeal(data)))
    }

    function showPlantFormLogin() {
        hhly_login.show();
        hhly_login.initConfig({
            "platformId": cacheObj.platformId,
            "success": function (data) {
                var user = data.user;
                user.channel = cacheObj._channel_.dj;
                moudle.cookieServer('/api/user/login-platform', user, function (data) {
                    loginStatus();
                })
                $('#hhly_sso_login_mask').fadeOut(100);
                $('#hhly_sso_login').slideUp(200);
                $("body").height($(window).height()).css({"overflow": ""});
            }
        });
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

    function clearAllCookie() {
        var lyy = ['user_lyy_com', 'regTime_lyy_com']
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        var rootDomain = "";
        rootDomain = document.domain.replace(/(.*)\.(\w+\.com)/, "$2");
        if (keys) {
            for (var i = keys.length; i--;) {
                if (lyy.indexOf(keys[i]) != -1) {
                    document.cookie = keys[i] + '=0;domain=' + rootDomain + ';expires=' + new Date(0).toUTCString();
                } else {
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
                }
            }
        }
    }

    function getPlantFormId() {
        //get plartform id
        moudle.cookieServer('/api/common/getPlatformId', '', function (data) {
            cacheObj.platformId = data.data;
        })
    }

    //get user information
    function loginStatus() {
        moudle.cookieServer('api/user/info', '', function (data) {
            $('.headTop').html(template('headTop', data));
        })
    }

    //get user information
    function loginStatus() {
        moudle.cookieServer('api/user/info', '', function (data) {
            $('.headTop').html(template('headTop', data));
        })
    }

    ///=====
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
});