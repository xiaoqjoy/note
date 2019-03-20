var moudle = (function(){
    var urlConfig = {
        url: 'http://game1.1332255.com/',
        websocketUrl: "ws://ws.1332255.com"
    }
    var pngUrl;
    var domobj={
        dom13322:'13322'
    }
    if(/\.13322\.com/.test(location.href)){
        domobj.dom13322='13322';
        pngUrl = 'dj.13322.com'
    }else{
        domobj.dom13322='1332255';
        pngUrl = 'http://game1.1332255.com/'
    }

    $('.headNav').html(template('headNav'));
    $('.footBar').html(template('footBar'));

    if(/localhost/.test(location.href)){
        urlConfig.url='http://game1.1332255.com/';
    }else{
        urlConfig.url='http://game1.1332255.com/';
    }
    function formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n
    }
    function formatTime(time) {
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var day = time.getDay();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        var weekarray =["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        return{
            date:[year,month, date].map( formatNumber ).join('-'),
            clock:[hour, minute].map( formatNumber ).join(':'),
            weekday:weekarray[day]
        }
    }
    function ajax(params, callback) {
        if (params.url.indexOf('/') == 0) {
            params.url = params.url.substr(1);
        }
        $.ajax({
            type: params.type,
            url: urlConfig.url + params.url,
            dataType: "json",
            data: params.data,
            success: function (data) {
                callback(data);
            },
            error: function (error) {
            }
        });
    }

    function cookieServer(url,data,callback){
        $.ajax({
            type: "POST",
            url: moudle.urlConfig.url + url,
            dataType: "json",
            data: data,
            xhrFields: {
                withCredentials: true
            },
            cache:false,
            crossDomain: true,
            success: function (data){
                callback(data);
            },
            error: function (error){
            }
        });
    }

    function connectServer(url, data, callback) {
        if (url.indexOf('/') == 0) {
            url = url.substr(1);
        }
        $.ajax({
            type: "POST",
            url: urlConfig.url + url,
            dataType: "json",
            data: data,
            cache:false,
            success: function (data) {
                callback(data);
            },
            error: function (error) {
            }
        });
    }

    function newhash(){
        window.location.hash.substring(1)
    };
    function getParam(url){
        var arr = [];
        if(url.split('&').length > 1){
            for(var i = 0; i < 2; i++){
                arr[i] = url.split('&')[i].split('=')[1];
            }
            return arr;
        }else{
            arr[0] = location.hash.split('=')[1];
            return arr;
        }
    }
    function getHashByKey(key){
        var obj = getHashParam(window.location.hash);
        return obj[key];
    }
    function getHashParam(url){
        var obj={};
        var arr=[];
        var reg = /[^&]+/g;
        url = url.replace(/^#/,"");
        if(url.length==0){
            return obj;
        }
        arr = url.match(reg);
        if(!arr){
            return obj;
        }
        var temparr;
        for(var i=0;i<arr.length;i++){
            temparr=arr[i].split("=");
            if(temparr.length>1){
                obj[temparr[0]]=temparr[1];
            }else{
                obj[temparr[0]]="";
            }
        }
        return obj;
    }
    function saveParam2Cookei(str){
        document.cookie="myhash="+str;
    }
    function getHashFromCookei(){
        return getCookie("myhash");
    }
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return arr[2];
        else
            return null;
    }
    function px2rem(px){
        var rem=0;
        var rootSize = parseFloat($("html").css("font-size").replace("px",""));
        rem = px/rootSize;
        return rem;
    }
    //写入LocalStorage
    function setLocalStorage(key,value){
        localStorage["lydj_dota2_"+key]=value;
    }
    //读取LocalStorage
    function getLocalStorage(key){
        return localStorage["lydj_dota2_"+key]
    }
    function removeLocalStorage(key) {
        localStorage.removeItem("lydj_dota2_"+key);
    }

    return {
        connectServer: connectServer,
        cookieServer: cookieServer,
        ajax: ajax,
        formatTime:formatTime,
        newhash:newhash,
        getParam: getParam,
        urlConfig:urlConfig,
        pngUrl:pngUrl,
        px2rem:px2rem,
        saveParam2Cookei:saveParam2Cookei,
        getHashFromCookei:getHashFromCookei,
        getHashParam:getHashParam,
        ls:{getLs:getLocalStorage,
            setLs:setLocalStorage,
            rmItem:removeLocalStorage
        },
        getHashByKey:getHashByKey,
        dom13322:domobj.dom13322
    }

    var liveUrl = "//live."+ moudle.dom13322 +".com/";

    function lg(str){
        if(arguments.length==0){
            return "";
        }
        if(arguments.length==1){
            return str;
        }
        var reg= /\{\d+\}/g;
        var strArr =  str.match(reg);
        for(var i=0;i<strArr.length;i++){
            strArr[i]=Number(strArr[i].replace(/\{|\}/g,""));
            str = str.replace("{"+strArr[i]+"}",arguments[1+strArr[i]]);
        }
        return str;
    }
})()
//# sourceMappingURL=../maps/common.js.map
