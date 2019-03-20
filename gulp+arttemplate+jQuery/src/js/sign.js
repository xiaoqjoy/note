/**
 * 签到。
 * Created by Administrator on 2017/3/14.
 */
var signMoudle = (function(){
    var path = moudle.urlConfig.url;
    var Urls = {
        query: path + 'api/sign/list',
        signin: path + 'api/sign/signin',
        isSignToday: path + 'api/sign/has-sign-today'
    };

    var signing = false;
    var $body = $('body');
    var signBtn = $('#sign-bar-btn');
    var signTimeout = null;

    /**
     * 签到按钮是否可用，
     * ---------------------------
     * @param enable true是, false否
     */
    function setSignEnable(enable) {
        if (enable) {
            $('.act_sign_box .sign_btn').removeClass('yet');
            $('.act_sign_box .sign_btn .sign_yet_img').addClass('hide');
            $('.act_sign_box .sign_btn .sign_yet_img').hide();
            $('.act_sign_box .sign_btn .sign_img').removeClass('hide');
            $('.act_sign_box .sign_btn .sign_img').show();
        } else {
            if (!$('.act_sign_box .sign_btn').hasClass('yet')) {
                $('.act_sign_box .sign_btn').addClass('yet');
            }

            $('.act_sign_box .sign_btn .sign_img').hide();
            $('.act_sign_box .sign_btn .sign_yet_img').show();
            $('.act_sign_box .sign_btn .sign_yet_img').removeClass('hide');
            $('.act_sign_box .sign_btn .sign_img').addClass('hide');
        }
    }

    function renderGou(resp){
        $('#keepSignDays').html(resp.data.keepSignDays);
        $('#totalSigninNum').html(resp.data.totalSigninNum);

        // 签到天打勾，并显示金币
        var signinList = resp.data.signinList;
        var signin;
        for (var i = 0; i < signinList.length; i++) {
            signin = signinList[i];
            $('.calendar').signCalander("setCoin", signin.day, signin.gifGold);
        }
    }

    /**
     * 刷新金币
     */
    function reflushBtn() {
        signBtn.html('已签到').attr('disable', 'disable');
        console.log(33333333333)
        $('.icon_head_fresh ').click();
    }

    /**
     * 今天是否已经签到
     */
    function isSigned() {
        var signed = false;

        $.ajax({
            url: Urls.isSignToday,
            type: 'post',
            async: false,
            cache: false,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (resp) {
            	console.log(resp)
                if (resp.data.signToday >= 1) {
                    signed = true;
                    Util.popup.textUp('今天已签到');
                    reflushBtn();
                }
            },
            error: function () {
            }
        });

        return signed;
    }

    /**
     *  签到成功处理。
     * @param resp
     */
    function signSuccessHandler(resp){
        signing = false;
        setSignEnable(false);

        if (resp.data > 0) {
            Util.popup.textUp('已签到成功，获得+' + resp.data + '金币');

            $.ajax({
                url: Urls.query,
                type: 'post',
                async: false,
                cache: false,
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (resp) {
                    renderGou(resp);
                    reflushBtn();
                },
                error: function () {
                }
            });

			/*$.post(Urls.query, {
			 xhrFields: {
			 withCredentials: true
			 },
			 crossDomain: true
			 }, function (resp) {
			 renderGou(resp);
			 reflushBtn();
			 }, 'json');*/

        } else {
            Util.popup.textUp('今天已签到');
        }
    }

    /**
     * 当天已经签到直接提示，防冒泡。
     * ---------------------------------------
     */
    function showMsg() {
        if (signing) {
            return;
        }

        signing = true;
        Util.popup.textUp('今日已签到');

        // 防冒泡
        signTimeout = setTimeout(function () {
            signing = false;
            clearTimeout(signTimeout);
        }, 2000);
    }

    /**
     *  渲染签到面板。
     *  ---------------------------------------
     * @param resp
     */
    function renderSignPanel(resp) {
    	console.log(resp)
        signing = true;

        var html = template('sign', resp.data);
        $body.append(html);

        // 活动栏，重新加载
        // getMenuIsPublic();

        // 当天已经签到
        setSignEnable(resp.data.signToday <= 0);

        $('.calendar').signCalander({
            year: resp.data.year,
            month: resp.data.month - 1,
            gou: path + '../images/sign_ca/ca_gou.png'
        });

        renderGou(resp);

        // 关闭按钮
        $body.on('click', '.act_close', function () {
            signing = false;
            $body.find(".act_sign_box").remove();
            $body.find(".act_sign_mask").remove();
        });

        // 签到按钮
        $body.on('click', '.act_sign_box .sign_btn', function () {
            if ($(this).hasClass('yet')){
                showMsg();
                return;
            }

            $(this).addClass('yet');

            $.ajax({
                    url: Urls.signin,
                    data: {'language': 'zh_CN', osType: 'pc'},
                    type: 'post',
                    async: false,
                    cache: false,
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: signSuccessHandler,
                    error: function () {
                        $(this).removeClass('yet');
                        Util.popup.textUp("签到失败！");
                    }
                }
            );
        });
    }

    return {
        renderSignPanel: renderSignPanel,
        renderGou: renderGou,
        isSigned: isSigned
    }
})()