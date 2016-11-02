# 创建Cordova app

## 安装CLI

+ 安装node.js，去<https://nodejs.org/en/>下载并安装
```
	node -v
```

+ 检测npm
```
	npm -v
```

+ [window]打开命令控制台安装cordova
```
	npm -g install cordova
```

+ [linux/mac]安装cordova
```
	sodu npm install -g cordova
```

+ 查看cordova安装情况
```
	cordova -v
```

####tips:

+ 若不加sodu；将会限制在/usr/local/share目录
+ -g 表示将cordova进行全局安装;不加表示只安装到当前目录node_moudles目录
+ 自动将cordova安装目录加到path

## 新建app

选择项目路径，执行create命令
```
	cordova create Hello com.example.hello HelloWorld
```

tips：自动生成项目目录结构；其中www/index.html是home page

## 支持平台
> 为你的app选择需要支持的平台，需要在项目目录或子目录中执行以下命令

+ 查看平台
```
	cordova platform list/ls
```
+ 查看帮助
```
	cordova platform -help
```
+ 常用命令
```
	cordova platform add [options]

	cordova platform remove/rm [options]
	
	cordova platform check 
	
	cordova platform update <plat-spec>( <platform-ver>|<path>|<git-url>)
```
+ 添加平台
```
cordova platform add android --save
```

tips：

不能编辑platforms目录下的任何文件，因为每次build/update时可能重新覆盖目录任何文件

## 安装平台必要依赖

需要安装各个平台依赖，可以用命令检测平台必须内容：
```
	cordova requirements 
```

+ [Android platform requirements](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#requirements-and-support)
+ [iOS platform requirements](http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#requirements-and-support)
+ [Windows platform requirements](http://cordova.apache.org/docs/en/latest/guide/platforms/win8/index.html#requirements-and-support)

## 构建app
> 任何web内容都应该放到deviceready事件中执行，定义于www/index.js

+ 全平台构建：
```
	cordova build
```
+ 指定平台构建
```
	cordova build iso/android
```
## 测试App

+ 常用模拟器方法
```
	cordova emluate [android]/[ios]
```
+ 执行运行测试
```
	cordova run [android]/[ios]
```
## 添加插件

+ 查询插件
```
	cordova plugin search camera
```

+ 查看插件
```
	cordova plugin [ls/list]
```

+ 添加插件
```
	cordova plugin add pluginName@version

```









