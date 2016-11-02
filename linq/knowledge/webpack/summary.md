# WebPack总结

## resolve 路径查找规则

在使用WebPack模块时，经常会用到Require或ES6中Import package from path,在webpack打包时，会自有一个Resolve Module过程.

#### 根据modulename引用

直接require包名，假设require('name')查找规则和顺序如下：
+ projects下面node_modules目录查找name[安装module]目录
+ projects下面node_modules目录查找name.webpack.js文件
+ projects下面node_modules目录查找name.web.js文件
+ projects下面node_modules目录查找name.js文件
+ projects下面node_modules目录查找name.json文件
+ projects下面node_modules目录查找name文件

#### 根据path引用

require相对路径查找，假设require('./dep')查找规则和顺序如下：
+ 以projects为相对路径，查找dep.webpack.js文件
+ 以projects为相对路径，查找dep.web.js文件
+ 以projects为相对路径，查找dep.js文件
+ 以projects为相对路径，查找dep.json.js文件
+ 以projects为相对路径，查找dep文件

+ 以projects为相对路径，以dep为目录，查找默认index[webpack.js | web.js | .js | json.js]等文件


```
ERROR in ./base.js
Module not found: Error: Cannot resolve 'file' or 'directory' ./dep in f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin
resolve file
  f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep is not a file
  f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep.web.js doesn't exist
  f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep.js doesn't exist
  f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep.webpack.js doesn't exist
  f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep.json doesn't exist
resolve directory
  f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\package.json doesn't exist (directory description file)
  directory default file index
    resolve file index in f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep
      f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index doesn't exist
      f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index.webpack.js doesn't exist
      f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index.js doesn't exist
      f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index.web.js doesn't exist
      f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index.json doesn't exist
[f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep.web.js]
[f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep.js]
[f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep.webpack.js]
[f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep.json]
[f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index]
[f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index.webpack.js]
[f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index.js]
[f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index.web.js]
[f:\mumuStudy\Project\vue_webpack\wpdemo\chunkplugin\dep\index.json]
 @ ./base.js 4:7-23

```


