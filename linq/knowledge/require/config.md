# Require.Config

> requirejs中最实用的config函数。当使用require()请求依赖时，配置baseurl、paths、shim能够传递过去当成第一选择


```html
<script src="scripts/require.js"></script>
<script>
  require.config({
    baseUrl: "/another/path",
    paths: {
        "some": "some/v1.0"
    },
    waitSeconds: 15
  });
  require( ["some/module", "my/module", "a.js", "b.js"],
    function(someModule,    myModule) {
        // 优先加载依赖
    }
  );
</script>

```

## baseUrl

> 所有模块检索的根目录

```javascript
require.config({
    baseUrl: "/another/path",
    paths: {
        "some": "some/v1.0"
    }
  });
// 请求/another/path/main.js 文件
require(['main'],function(main){
	
});

```

#### 没有配置baseUrl，没配置data-main

如果baseUrl***没有配置***，没配置data-main，默认取加载requirejs的html page的路径。


```
//假如，在domain:port/root/index.html页面中加载require.js

baseUrl="domain:port/root"

```

#### 没有配置baseUrl，配置data-main

如果没有配置baseUrl，但配置data-main特性。baseUrl的为data-main的所在的目录

```
<script data-main="js/app/app" src="js/app/lib/require.js"></script>

// baseUrl的默认值为html文件目录+js/app/app

```

#### baseUrl跨域

允许baseUrl与当前加载文件不再同一域名中。

***唯一严格限制：text!插件加载的文本内容必须在同域中，至少开发过程必须在同域（生产中可以使用优化工具打包跨域text!内容）***


#### 总结

baseUrl取值优先级：**指定baseUrl值 > data-main > html Directory . 同域（另除非完整URL）情况下，优先级高项依赖低项。**

## paths

paths名称映射是用于不能直接通过baseUrl找到的模块，paths假定以baseUrl为相对路径。

#### path指定文件

直接用path指定具体文件，不需要加后缀；requirejs会默认加上.js后缀；

```javascript
// require(['model']); 直接请求js/common/model.js路径
require.config({
	baseUrl:'js',
	paths: {
		model:'common/model'
	}
});
```

#### /开头path

正常情况都是基于baseUrl，若path中以/开头，则相对于domain

```javascript
// 当前common.js请求路径为domain + /assets/dest/common.js
require.config({
	baseUrl:'js/views',
	paths:{
		'common':'/assets/dest/common'
	}
});

```

#### 以http/https开头

若以http://或https://开头则完全跨域

```javascript
//当前common.js请求路径为http://assets/dest/common.js
require.config({
	baseUrl:'js/views',
	paths:{
		'common':'http://assets/dest/common'
	}
});

```

#### path 指定目录映射

path中采用部分路径，不加后缀的方式；也可以指定部分目录的别名

```javascript
// require(['route/index']) 请求路径为www/user/views/index.js
require.config({
	baseUrl: 'www/',
	paths: {
		route: 'user/views'
	}
});

```

#### require.toUrl获取路径以及后缀

使用require.toUrl可以获取相对路径；并合理加上后缀

```javascript
// www/user/views/login.js
require.toUrl('route/login');

// www/user/views/qq.html
require.toUrl('route/qq.html');

// www/user/views/css/app.css
require.toUrl('route/css/app.css');

```

#### cdn及优先匹配路径

使用paths配置，可以优先使用cdn，若是加载cdn失败，会自动加载后面的path

```javascript
// 优先使用新浪jquery免费cdn；若cdn加载失败，加载lib/jquery.js文件
requirejs.config({
    "paths": {
        "jquery.alpha": 'lib/jquery.alpha',
        "jquery.beta": 'lib/jquery.beta',
        "jquery": [
            'http://lib.sinaapp.com/js/jquery/1.9.1/jquery--1.9.1.min',
            'lib/jquery'],
        "backbone": "lib/backbone",
        "underscore": "lib/underscore"
    },
    "shim": {
        "jquery.alpha": ["jquery"],
        "jquery.beta": ["jquery"],
         underscore: {
            "deps": ['jquery'],
            "exports": "_"
        },
        "backbone": {
            "deps": ['jquery', 'underscore'],
            "exports": "Backbone"
        }
    }
});

```

## bundles

一个js文件中存在多个define时，可以使用捆绑指定一个moudel文件包含多个moudle ID；下次请求文件里面的moudle ID时，自动会请求捆绑moudle文件并加载。

```javascript
requirejs.config({
    bundles: {
        'primary': ['main', 'util', 'text', 'text!template.html'],
        'secondary': ['text!secondary.html']
    }
});

require(['util', 'text'], function(util, text) {
    //The script for module ID 'primary' was loaded,
    //and that script included the define()'d
    //modules for 'util' and 'text'
});

```

***只需要请求util，会自动下载primary文件并加载其中的moudle***

## waitSeconds

请求脚本等待的时间，即：请求超时边界时间

```javascript
require.config({
	waitSeconds:20
});

```

特殊说明：

+ 设置为0，表示不超时
+ 不设置默认为7s


## urlArgs

定义请求资源额外的查询字符串参数，通常用来处理cache和version

```javascript
require.config({
	urlArgs: 'bust=' + (new Date()).getTime()
});

```

#### urlArgs:Function

在Require.js 2.2.0版本以上，urlArgs支持function类型，返回args字符串。

```javascript
requirejs.config({
    urlArgs: function(id, url) {
        var args = 'v=1';
        if (url.indexOf('view.html') !== -1) {
            args = 'v=2'
        }

        return (url.indexOf('?') === -1 ? '?' : '&') + args;
    }
});

```

## config

可以为指定module模块传递公用配置参数；

```javascript
requirejs.config({
    config: {
        'bar': {
            size: 'large'
        },
        'baz': {
            color: 'blue'
        }
    }
});

define(function (require, exports, module) {
    //Will be the value 'large'
    var size = module.config().size;
});

define(['module'], function (module) {
    //Will be the value 'blue'
    var color = module.config().color;
});

```

## shim

> 加载非AMD标准模块时使用到的配置，如果加载的path已经找到了moduleName，则不执行shim配置。因此shim配置规则与path中名称必须一致。

```javascript
// shim中的属性名字（modulepath1）必须存在paths对象属性名中.在已经在找modulepath1后，加载过程中去映射shim中对应配置。
// 换句话说，即使不配置shim，如果没有deps的话，也是允许加载非AMD模块的，只是没有exports而已罢了
require.config({
    shim:{
        modulepath1:{
            exports:'globalVariable'
        }
    },
    paths:{
        modulepath1:'/src/source'
    }
});

```

#### exports 非标准AMD模块factory返回值暴露

模块加载完后，exports主要的作用是，将global Variable包装为当前(非AMD标准库)的返回值。
+ exports值是由global全局调用方式的字符串

```javascript
require.config({
        shim: {
            'jquery-private': {
                exports: 'jQuery'
            },
            'jquery.custom': {
                deps: ['jquery-private'],
                exports: 'jQuery.fn.custom'
            }
        },
        paths: {
            'jquery-private': '../lib/jquery-1.12.3',
            'jquery.custom': 'jquery.custom.plugin'
        }
    });

    //此时允许不需要全局用jquery访问jQuery.fn.Custom插件，直接使用customPlugin即可
    require(['jquery.custom'], function (customPlugin) {
        console.log(customPlugin);
    });
```

#### deps 模块依赖配置

设置依赖moudles，定义加载顺序

```javascript
requirejs.config({
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'foo': {
            deps: ['bar'],
            exports: 'Foo',
            init: function (bar) {
                return this.Foo.noConflict();
            }
        }
    }
});

define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({});
});

```

#### 加载插件或非标准AMD库

常见的不需要导出Module ID写法

```javascript
requirejs.config({
    shim: {
        'jquery.colorize': ['jquery'],
        'jquery.scroll': ['jquery'],
        'backbone.layoutmanager': ['backbone']
    }
});

```

需要定义依赖，并导出Module ID的写法

```javascript
requirejs.config({
    shim: {
        'jquery.colorize': {
            deps: ['jquery'],
            exports: 'jQuery.fn.colorize'
        },
        'jquery.scroll': {
            deps: ['jquery'],
            exports: 'jQuery.fn.scroll'
        },
        'backbone.layoutmanager': {
            deps: ['backbone']
            exports: 'Backbone.LayoutManager'
        }
    }
});

```





