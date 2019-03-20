$(function () {
    template.helper('boCN', function (obj) {
        var array = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
        return '第' + array[obj - 1] + '局';
    });
    template.helper('dateChange', function (obj) {
        var newDate = moudle.formatTime(new Date(obj)).date + ' ' + moudle.formatTime(new Date(obj)).clock;
        return newDate;
    });
    // moudle.ajax({
    //     url: '/api/user-center/get-account-sum',
    //     type: 'POST',
    //     data: {}
    // }, function (data) {
    //     console.log(data)
    // });
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
                itemDetail.teamALogo = item.teamALogo;
                itemDetail.teamBLogo = item.teamBLogo;
                itemDetail.teamAName = item.teamAName;
                itemDetail.teamBName = item.teamBName;
            });
            item.matchDetail = detail;
        });
        console.log(data)
        return data;
    }

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
    //新 队员弹窗
    $('.guessPage').on('click', '.guess_list li input', function () {
        var guessCode = $(this).parent().attr('data-competitionCode'),
            matchDetailId = $(this).parent().attr('data-matchDetailId');
        $('body').css('overflow-y', 'hidden');
        moudle.ajax({
            url: '/api/competition/single-player-list',
            type: 'POST',
            data: {
                guessCode: guessCode,
                matchDetailId: matchDetailId
            }
        }, function (data) {
            console.log(data)
            $('.popup-teammember').html(template('popup-teammember', data));
            $('.popup-teammember,.mask').show();
        });
    });
    $('.guessPage').on('click', '.popup-teammember .close', function () {
        $('body').css('overflow-y', 'scroll');
        $('.popup-teammember,.mask').hide();
    });
    $('.guessPage').on('click', '.guessStateTab a', function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).hasClass('gsing')) {
            $('.guessing').addClass('active');
            $('.guessEnd,.guessRule').removeClass('active');
        } else if ($(this).hasClass('gsend')) {
            $('.guessEnd').addClass('active');
            $('.guessing,.guessRule').removeClass('active');
        } else {
            $('.guessRule').addClass('active');
            $('.guessing,.guessEnd').removeClass('active');
        }
    });
    $('.guessPage').on('click', '.icon_intro', function () {
        $('.gsrule').addClass('active').siblings().removeClass('active');
        $('.guessRule').addClass('active');
        $('body').scrollTop(0);
        $('.guessing,.guessEnd').removeClass('active');
    });
    $('.guessPage').on('click', '.guess-list', function () {
        $(".popup_bet").show();
        $(".popup_bet").animate({top: "27%"}, 300);
        $(".mask").show();
    });
    $('.guessPage').on('click', '.popup_old .closePopup', function () {
        $(".guess_box li a").removeClass("active");
        $(".popup_bet").animate({top: "106%"}, 300, function () {
            $(this).css("top", "-57%");
            $(".popup_bet").hide();
        });
        $(".mask").hide();
        $("input.betCoin").val("");
    });
    $('.guessPage').on('click', '.select_popup li', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var playerImg = $(this).attr('data-playerImg'),
            odds = $(this).attr('data-odds'),
            playerName = $(this).attr('data-playerName');
        $('.chooseplayer img').attr('src', playerImg);
        $('.chooseplayer p').html(playerName);
        $('.compensate span').html(odds)
        calProfit();
    });
    //原始 新玩法弹窗
    $('.guessPage').on('click', '.bet input', function () {
        var _matchVsScore = $(this).parent().parent().parent().siblings('.matchVsScore');
        var all_prize = $(this).parent().siblings('.bet_detail').find('span').html();
        var teamName = $(this).siblings('.teamName').html();
        var str = _matchVsScore.attr('data-gameName') + '  ' + _matchVsScore.find('.matchTitle').html() + '  |  ' + _matchVsScore.attr('data-teamAName') + '  VS  ' + _matchVsScore.attr('data-teamBName') + '  总局';
        $('body').css('overflow-y', 'hidden');
        $('.popup_bet_new .betMatch').html(str);
        $('.popup_bet_new .betWin span').html(teamName);
        $('.popup_bet_new .betObject span').html(all_prize);
        $('.popup_bet_new,.mask').show();
    });
    $('.guessPage').on('click', '.popup_bet_new .closePopup', function () {
        $('body').css('overflow-y', 'scroll');

        $('.popup_bet_new,.mask').hide();
    });
    $('.guessPage').on('keyup', '.popup-teammember .bet_limit input', function () {
        calProfit()
    });
    function calProfit(inputVal) {
        if (($('.compensate span').html() && $('.bet_limit input').val())) {
            var profit = $('.compensate span').html() * $('.bet_limit input').val();
            $('.popup-teammember .income span').html(profit.toFixed(2))
        }
    }

    function renderPage(data) {
        $('.new_play').html(template('new_play', dataDeal(data)))
    }
});