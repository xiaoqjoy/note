/**
 * IM业务类
 */

const accountType = 37073;
const accountMode = 2;

export const imModel = {

  /**
   * IM登录
   * @param sdkAppID appId
   * @param identifier 发送方id
   * @param identifierNick 发送方昵称
   * @param userSig 发送方签名
   * @param toId 接收方id
   * @param onMsgNotify 获取新消息回调
   * @param loginCallback 登录结果回调
   */
  login: function (sdkAppID, identifier, identifierNick, userSig, toId, onMsgNotify, loginCallback) {
    const loginInfo = {
      'sdkAppID': sdkAppID,//用户标识接入SDK的应用ID，必填。（这个可以在腾讯云的后台管理看到）
      'appIDAt3rd': sdkAppID,//App 用户使用 OAuth 授权体系分配的 Appid，必填    （这个其实和上面那个是一样的）
      'identifier': identifier,//用户帐号，必填   （这个就是自己服务器里，每个用户的账号，可以自己设置）
      'identifierNick': identifierNick,//用户昵称，选填   (这个填不填都没什么问题，但是我个人觉得，聊天嘛，还是得有一个网名)
      'accountType': accountType,//账号类型，必填   (这个可以在后台管理看到，但是腾讯的文档上是没有这个的！！！但是这个必须填，不填不报错）
      'userSig': userSig //鉴权 Token，identifier 不为空时，必填   我觉得这个也是必填的，这个需要在一开始就从后端获取。
    };

    //事件回调对象 监听事件
    const listeners = {
      "onConnNotify": onConnNotify//监听连接状态回调变化事件,必填
      // , "jsonpCallback": jsonpCallback//IE9(含)以下浏览器用到的 jsonp 回调函数，
      , "onMsgNotify": onMsgNotify//监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
      // , "onBigGroupMsgNotify": onBigGroupMsgNotify//监听新消息(直播聊天室)事件，直播场景下必填
      // , "onGroupSystemNotifys": onGroupSystemNotifys//监听（多终端同步）群系统消息事件，如果不需要监听，可不填
      // , "onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填
      // , "onFriendSystemNotifys": onFriendSystemNotifys//监听好友系统通知事件，选填
      // , "onProfileSystemNotifys": onProfileSystemNotifys//监听资料系统（自己或好友）通知事件，选填
      // , "onKickedEventCall": onKickedEventCall//被其他登录实例踢下线
      // , "onC2cEventNotifys": onC2cEventNotifys//监听 C2C 系统消息通道
    };
    //1v1单聊的话，一般只需要 'onConnNotify' 和 'onMsgNotify'就行了。
    //监听连接状态回调变化事件
    let onConnNotify = function (resp) {
      let info;
      switch (resp.ErrorCode) {//链接状态码
        case webim.CONNECTION_STATUS.ON:
          webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
          break;
        case webim.CONNECTION_STATUS.OFF:
          info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
          // alert(info);
          webim.Log.warn(info);
          break;
        case webim.CONNECTION_STATUS.RECONNECT:
          info = '连接状态恢复正常: ' + resp.ErrorInfo;
          // alert(info);
          webim.Log.warn(info);
          break;
        default:
          webim.Log.error('未知连接状态: =' + resp.ErrorInfo); //错误信息
          break;
      }
    };
    const opts = {
      "accountMode": accountMode, "accountType": accountType,
      "sdkAppID": sdkAppID, "selType": webim.C2C_MSG_SUB_TYPE.COMMON,
      "selToID": toId
    }
    webim.login(loginInfo, listeners, opts, loginCallback);
  },

  /**
   * 初始化session
   * @param toId 接收方id
   * @returns {Session}
   */
  initSession: function (toId) {
    return new webim.Session(webim.SESSION_TYPE.C2C, toId, toId, '', Math.round(new Date().getTime() / 1000));
  },

  /**
   * 发送文本消息
   * @param session session
   * @param toId 接收方id
   * @param identifier 发送方id
   * @param nickname 发送方昵称
   * @param sendTextContent 发送文本内容
   * @param successCallback 成功回调
   * @param failureCallback 失败回调
   */
  sendTextMsg: function (session, toId, identifier, nickname, sendTextContent, successCallback, failureCallback) {
    const isSend = true;//是否为自己发送
    const seq = -1;//消息序列，-1表示 SDK 自动生成，用于去重
    const random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
    const msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
    const subType = webim.C2C_MSG_SUB_TYPE.COMMON;//消息子类型
    const msg = new webim.Msg(session, isSend, seq, random, msgTime, identifier, subType, nickname);
    const textObj = new webim.Msg.Elem.Text(sendTextContent);
    msg.addText(textObj);
    webim.sendMsg(msg, successCallback, failureCallback);
  },

  /**
   * 上传文件
   * @param inputDOM 文件选择DOM
   * @param identifier 发送方id
   * @param toId 接收方id
   * @param successCallback 成功回调
   * @param failureCallback 失败回调
   */
  uploadFile: function (inputDOM, identifier, toId, successCallback, failureCallback) {
    // 通过DOM取文件数据
    if (inputDOM.files[0] !== undefined) {
      //封装上传图片请求
      const opt = {
        'file': inputDOM.files[0], //图片对象
        'From_Account': identifier, //发送者帐号
        'To_Account': toId, //接收者
        'businessType': accountMode//业务类型
      };
      //上传图片
      webim.uploadPic(opt, successCallback, failureCallback);
    }
  },

  /**
   * 发送图片
   * @param session session
   * @param images 图片
   * @param successCallback 成功回调
   * @param failureCallback 失败回调
   */
  sendImageMsg: function (session, images, successCallback, failureCallback) {
    const msg = new webim.Msg(session, true);
    const images_obj = new webim.Msg.Elem.Images(images.File_UUID);
    for (const i in images.URL_INFO) {
      const img = images.URL_INFO[i];
      let newImg;
      let type;
      switch (img.PIC_TYPE) {
        case 1://原图
          type = 1;//原图
          break;
        case 2://小图（缩略图）
          type = 3;//小图
          break;
        case 4://大图
          type = 2;//大图
          break;
      }
      newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width,
        img.PIC_Height, img.DownUrl);
      images_obj.addImage(newImg);
    }
    msg.addImage(images_obj);
    webim.sendMsg(msg, successCallback, failureCallback);
  }
};
