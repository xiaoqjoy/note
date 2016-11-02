# node常用命令

#### 升级node版本命令[window]

以administrator身份运行powershell：

```shell
 npm isntall -g npm-windows-upgrade

 npm-windows-upgrade
```

在win10运行有些问题，只能找官网下载最新安装包

```
https://nodejs.org/en/download/
```

#### siblime text3 安装及支持es6语法

[在 Sublime Text 上配置 ES2015 开发环境](http://morning.work/page/2016-03/sublime-text-for-nodejs-es2015-development.html?utm_source=tuicool&utm_medium=referral)

安装siblime text3后的注册码

[注册码](http://www.jianshu.com/p/04e1b65dd2c0)


#### siblime text3折叠和展开代码

按ctrl + k，然后按ctrl + 1，可收起所有函数

按ctrl + k，ctrl + 2 （这个数字可以变的，表示收起的函数的级数，你试试就明白了）

按ctrl + k， 再按 ctrl + j 显示所有函数


#### 常见使用的插件

```
Emmet
JavaScript Next
SublimeLinter  [先安装npm install -g eslint babel-eslint]
HTML-CSS-JS Prettify  [ctrl+shift+H]
SublimeCodeIntel
Vue Syntax Highlight  
MarkDown Editing   
ColorSublime
Theme
Alignment
DocBlockr
```

调整sidebar主题

```
"color_scheme": "Packages/User/SublimeLinter/Bittersweet (SL).tmTheme",
"font.size":19,
"theme": "Cola.sublime-theme",
// The number of spaces a tab is considered equal to
"tab_size": 2,

// Set to true to insert spaces when tab is pressed
"translate_tabs_to_spaces": true,
```

需要调整sidebar字体、颜色、间距，需要按照一个插件PackageResourceViewer

```
Ctrl + Shift + P
安装PackageResourceViewer，安装好后重新打开当前目录.
输入PackageResourceViewer,-打开输入theme，编辑sublime-setting文件，
编辑tab_label
```


> HTML/CSS/JS Prettify 这个插件就行， 安装后 tools->HTML/CSS/JS Prettify->set prettify preference 在"allowed_file_extensions": ["htm", "html", "xhtml", "shtml", "xml", "svg","vue"] 加上vue就好了


[HTML-CSS-JS Prettify插件](http://frontenddev.org/article/sublime-does-text-three-plug-ins-html-and-css-js-prettify.html)

[prety Theme](http://www.jianshu.com/p/13fedee165f1)

