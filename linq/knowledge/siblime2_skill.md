# siblime2使用技巧

## Package Control Installed

Package Control 可以看做是一个ST2的扩展管理器，使用它，你可以用非常神奇、非常简单方便的方法去下载、安装、删除 Sublime Text 2 的各种插件、皮肤等，相信我，想更好地使用 ST2 绝对不能没有它！不过 ST2 本身并没有自带这个工具，我们需要自行安装它，安装方法：

+ 下载Package Control.sublime-package文件
+ 控制台命令

#### 下载Control.sublime-package安装

1、在 SublimeText2 的目录里面找到 Data > Installed Packages 的文件夹 (如没有请手动新建) 
2、在这里下载 Package Control.sublime-package 文件 
3、将下载到的文件放进去 Installed Packages 里面 
4、重新启动 Sublime Text 


安装成功：

	Ctrl+Shift+P 调用命令面板，我们就会找到一些以“Package Control:”开头的命令，会呈现Install Package (安装扩展)、List Packages (列出全部扩展)、Remove Package (移除扩展)、Upgrade Package (升级扩展)

安装失败：

	报错，按ctrl + ` 调出控制台，查看失败原因

#### 控制台命令安装

1、按Ctrl + ` 调出控制台
2、执行下面命令：

```
import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print 'Please restart Sublime Text to finish installation'
```
#### 解决sublime package control 出现There are no packages available for installation

按Ctrl + `, 查看原因发现时因为packagecontrol.io无法访问

解决方案：

+ 使用vpn等工具
+ 设置http://packagecontrol.io/channel_v3.json地址
	+ 翻墙下载channel_v3.json
	+ 本地开启一个服务，能够代理channel_v3.json
	+ 进入package control的settings中，把http://packagecontrol.io/channel_v3.json修改为本地地址：

