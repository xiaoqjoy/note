# js小笔记

//图片自适应css代码

```javascript
background: url(../images/consult.jpg) no-repeat center center;
    width: 100%;
    height: 70%;
    background-size: cover;
```

//想要消除ul li  里面前面的margin  需要在ul上面写margin:0px;padding:0px;

//css向上样式
```javascript
.box{
    position:relative;
}
.box:after, .box:before {
    border: 10px solid transparent;
    border-bottom: 10px solid #f2f2f2;
    width: 0px;
    height: 1px;
    position: absolute;
    top: -21px;
    right: 10px;
    content: ' ';
}
.box:before {
    border-bottom-color: #c1c1c1;
    right: 10px;
    top: -22px;
}
```


location：子对象            
document.location.hash          // #号后的部分       
document.location.host          // 域名+端口号           
document.location.hostname      // 域名       
document.location.href          // 完整URL        
document.location.pathname      // 目录部分         
document.location.port          // 端口号          
document.location.protocol      // 网络协议(http:)      
document.location.search        // ?号后的部分       


encodeURIComponent()     编码(中文，用户名(数字，英文不是编码))

decodeURIComponent()     解码
                
/* 设置滚动条的样式 */
::-webkit-scrollbar{width: 6px;}        
/* 滚动槽 */           
::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);border-radius: 10px;}         
/* 滚动条滑块 */         
::-webkit-scrollbar-thumb{border-radius:10px;background: rgba(0,0,0,0.3);-webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.5);}    
/*滚动条hover样式*/          
/*::-webkit-scrollbar-thumb:window-inactive{background: rgba(255,0,0,0.4);}*/       
                


为表格设置合并边框模型：

table{border-collapse:collapse;}
            
<input type="file" accept=".txt">    只 接受TXT文件的上传
            
enctype="multipart/form-data"    form表单提交

                


















