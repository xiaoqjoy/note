# Handling Errors

requirejs加载过程中常见的错误：

+ 404（not found）
+ network timeouts
+ 脚本执行错误

常见处理错误方式主要有三种：

+ 设置一个paths配置，请查看[config.md](./config.md#user-content-cdn)章节
+ require请求指定错误处理函数
+ 设置全局错误处理函数


#### 错误对象

require错误函数或全局错误函数，包含一个错误对象：

+ 请求类型（string），请求分类；常见类型："timeout", "nodefine", "scripterror"
+ 请求模块（Array），请求失败的moudles name/URLS数组；

#### IE8/IE9错误侦测

目前来说对于IE8/IE9来说使用require加载脚本进行错误侦测很难有可信度；（换言说，就是支持的不够好，很容易报异常）

建议：

如果需要支持IE10一下浏览器；建议直接使用define加载模块


## require([]) errbacks

常用的错误侦测手段。

可以使用requirejs.undef(moudlesname)侦测错误，重新设置、加载配置及插件。

```javascript
require(['jquery'], function ($) {
    //Do something with $ here
}, function (err) {
    var failedId = err.requireModules && err.requireModules[0];
    if (failedId === 'jquery') {
        requirejs.undef(failedId);
        requirejs.config({
            paths: {
                jquery: 'local/jquery'
            }
        });
        require(['jquery'], function () {});
    } else {
        //Some other error. Maybe show message to the user.
    }
});

```

## paths config fallbacks

请参考require.config配置章节[config.md](./config.md#user-content-cdn)


## Global requirejs.onError function

可以通过全局的方式侦测未能捕获到的错误：


```javascript
requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};
```





