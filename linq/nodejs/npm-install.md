# npm 安装规则

使用npm过程中install命令最为常用，主要有三大使用方法：

1. npm install something@versions --save-dev
2. npm install (使用package.json中dependencies属性)
3. npm i -g something@versions --save-dev

## 查找安装目录

使用方法1和方法2都是项目安装，最重要的第一件事就是**查找安装目录**：
1. 自当前目录查找package.json文件，如果找到就认为是安装目录；否则查找父目录，并依次递归查找package.json目录所在；

2. 自当前目录查找node_modules文件目录，如果找到就认为是安装目录；否则继续查找父目录，并依树父节点递归查找node_modules目录；

3. 如果上面2种情况都没有找到安装目录，则会安装到默认的全局目录；


```
## --save-dev 会自动将安装的包写入到package.json文件devDependencies节点中，若不存在该文件会自动创建该文件

npm install grunt@~1.0.0 --save-dev
```

**总结：安装目录就是自当前目录，向树父节点
递归查找package.son或node_modules目录；未查找到，就会使用默认的全局目录**


## 包语义化版本(semver)

除了确定安装目录外，要找到something包使用版本号。因此需要知道包当前具有哪些版本

```
##自动罗列出包可用版本号
npm view something versions

```

[semver规则](npm-semver.md)

## 全局安装

常见的全局安装可以使用-g或--global

```
# 安装到默认的全局目录
npm -g install something

# 安装grunt-cli
npm -g install grunt-cli

```


#### 开启全局安装模式

可以设置npm默认安装模式为全局安装。

```
#开启或关闭全局安装模式
npm set global=true 
npm set global=false
```

如果修改失败，可以使用暴力修改.npmrc文件方式开启或关闭全局安装模式,查看.npmrc文件命令

```
# 查看所有内容
npm config list -l

# 查看变量值
npm get variablename

```



