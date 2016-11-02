# Grunt 任务配置规则和技巧

grunt在工程化中前端项目中很常用，然而大部分人只知道用法，并没有去总结它的配置规则，本节是我读完[官网document](http://gruntjs.com/getting-started)后的理解与归纳。

另外：关于Grunt-cli、Grunt与Plugin的安装请自行阅读[npm-install](https://github.com/profoundsoul/basenotes/blob/master/nodejs/npm-install.md)有关章节，并查看官网安装教程。

## Gruntfile 入口文件

> 众所周知，运行grunt命令时，grunt-cli会使用require()系统查找到当前目录（以及树父节点目录）查找是否有安装grunt。如果grunt被发现，会加载本地安装，并应用Gruntfile文件运行任务。

上面描述，来自于官网，详细阐述了Grunt命令运行的主要环节。Gruntfile文件是任务配置的重点，它主要包含以下几部分内容：
+ module.exports 包装函数----必须
+ task和Target的配置        -----必须
+ 加载插件                           -----必须
+ 自定义任务（注册任务）-----可选

```javascript
module.exports=function(grunt){
	grunt.initConfig({
		tast1:{
			options:{},
			target1:{
				options:{}
			},
			target2:{
				options:{}
			}
		},
		tast2:{
			options:{},
			target1:{
				options:{},
				files:[]
			},
			target2:{
				options:{},
				files:[]
			}
		}
	});

	//加载任务插件-tast1	
	grunt.loadNpmTasks(tast1);
	grunt.loadNpmTasks(tast2);
};
```

上述样板，就是最标准的包装器-任务配置-任务加载。只需要这样配置就可以在控制台上。

```
# 运行指定任务，指定target1
$ grunt task1:target1

# 运行指定任务，所有目标
$ grunt task1

```


## task和Target配置

针对于MultiTasks，是可以使用grunt.initConfig函数配置具体的task和Target。task不允许重复，在task中允许配置多个不同名字的target。

#### task配置规则

配置项中的task，是由注册的任务名字决定。分一下三种情况：
+ 注册任务是以grunt-confrib-前缀开头，官方团队提供插件；task名字剔除前缀
+ 注册任务是以grunt-前缀开头，个人提供插件，task名字剔除前缀
+ 私有的自定义Multi任务，直接使用注册task名字即可

```javascript
module.exports = function(grunt){
	grunt.initConfig({
		htmlmin:{
			common:{
				options:{
					removeContents: true,
					collapseWhitespace: true
				},
				files:[{dest:'dist/index.html',src:'src/index.html'}]
			},
			app:{
				options:{
					removeContents: true,
				},
				files:[{dest:'dist/index.html',src:'src/index.html'}]
			}
		},
		sass:{
			options{
				sourceMap: true
			},
			common:{
				files:{
					'main.css':'main.scss'
				}
			}
		},
		custom:{
			options:{},
			main:{}
		}
	});

	// 官方团队提供html最小化插件
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	// 加载个人提供sass插件
	grunt.loadNpmTasks('grunt-sass');

	// 自定义一个Multi Tasks
	grunt.registerMultiTasks('custom', 'this is my custom Multi task', function(){
		 grunt.task.run('htmlmin', 'common');
		 grunt.task.run(['sass', 'common']);
	});

	// 注册一个别名任务，包含上述两个MultiTasks，按照数组先后顺序执行
	grunt.registerTask('default', 'this is grunt defalut tasks', ['custom:main']);
};
```

## options作用范围

所有Multi Task都允许配置options选项指定任务功能。但常见的options配置允许配置在Task和Target层面：
+ target对象中options只对当前target有效
+ task对象options属性对当前task中所有target均有效
+ 如果重复以target中options为准

```javascript
module.exports= function(grunt){
	grunt.initConfig({
		uglify:{
			options:{
				conpress:true
			},
			main:{
				options:{
					"report":   "false",
				},
				files:{'dist/index.js', 'src/index.js'}
			}
		}
	});
};

```

## task运行规则

在配置好target和task后和加载插件后，就可以运行任务，常见运行任务的几种方式：
+ 控制台采用grunt命令运行
+ Gruntfile文件中使用grunt.task.run调用
+ Gruntfile文件中配置alias Task运行指定任务。然后当运行别名任务时，指定任务按照顺序运行。

```javascript
// js代码运行任务，按照数组先后顺序运行
grunt.task.run(['htmlmin', 'sass:common']);

// 别名任务配置，简化任务调用
grunt.registerTask('default', 'comments', ['htmlmin:common']);

//在Gruntfile目录命令控制台终端，执行grunt htmlmin:common
```

#### 指定Target与不指定

上述有指定target与不定target的任务运行Demo，它们的区别如下：
+ 不指定target任务，会按照配置顺序运行所有任务
+ 指定target任务，只会运行指定的target。

```
# 会按照先后顺序（先common后app）运行该任务下所有Target
grunt htmlcss

# 只会运行htmlcss下面的app target
grunt htmlcss:app

```

