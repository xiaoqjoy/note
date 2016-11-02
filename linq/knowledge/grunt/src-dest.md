# Source-Destination 文件

由于大部分任务执行过程中都会有文件操作，Grunt官方对文件配置接口进行了良好的抽象，主要有以下几种src-dest的文件映射方式：
+ src-dest Format：其中src支持字符串路径数组和字符串路径，dest仅支持字符串路径
+ Files Object Format：文件对象属性格式。key-value表示dest-src，支持多个dest-src
+ Files Array Format：dest-src数组形式。
+ Custom Filter Format： 自定义帅选格式。expand设置为true。


```
module.exports= function(grunt){
	grunt.initConfig({
		uglify:{
			srcdest:{
				src:'index.js',
				dest:'dist/index.js'
			},
			filesobj:{
				files:{
					'dist/index.js':'index.js'
				}
			},
			filesArr:{
				[dest:'dist/index.js',src:'index.js']
			},
			filter:{
				expand:true,
				cwd:'project',
				src:'src/*.js',
				dest:"dist"
			}
		}
	});
}
```

对于具有src-dest的三种方式（src-dest、Files Array Format、Custom Filter Format）还支持一些附件的属性：
+ filter--fs.Stats.method name与自定义返回值为Boolean
+ expand 处理动态src-dest文件映射。
+ 除了基础属性外，其它都会传入任务中，允许自定义处理


如果expand设置为true,这三种模式还支持一下属性：
+ cwd 所有的src都相对此目录处理文件
+ ext 替换dest生成文件后原有的文件后缀
+ extDot 枚举值{first,last}。表示是从第一个句号还是从最后一个逗号截取文件后缀。
+ flatten Boolean{true,false}是否移除src中文件目录，默认值为false。
+ rename Function(src,dest)函数，返回新的dest路径和文件名字



## src-dest 

采用这种模式，只支持一个dest，N个src。采用1-N的dest-src的文件映射。

```javascript
grunt.initConfig({
	uglify: {
		main:{
			dest:'dist/index.js',
			src:['index.js', 'main.js']
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-uglify');

```

## File Object Format 文件对象格式

采用这种方式，很是简洁优雅；然后不支持除src和dest之外的参数设置，比如：expand、filter等。

```javascript
grunt.initConfig({
	cssmin:{
		main:{
			'dist/main.css':['main.css', 'index.css']
		}
	}
});

```

## Files Array Format 文件数组格式

采用这种文件数组格式与src-dest没什么区别，唯一区别的地方就是支持多个dest数组。

```javascript
grunt.initConfig({
	concat:{
		options:{
			separator:'\n',
			banner:'/*this is my merge files*/'
		},
		merge:{
			files:[
				{dest:'pro.css',src:['user.css', 'account.css']},
				{dest:'framework.css',src:['common.css', 'fw.css']}
			]
		}
	}
});

```

## dynamic Files Mapping 动态文件路径映射

上面介绍的大部分都是指定dest具体文件方式，但在项目中常常会涉及到无法固定具体文件，需要按照src动态生成dest文件（也允许dest文件加文件名后缀）。

```javascript
grunt.initConfig({
	options:{
		optimizationLevel:3
	},
	imagemin:{
		dynamic:{
			expand: true,                  // Enable dynamic expansion 
			cwd: 'src/',                   // Src matches are relative to this path
			filter:'isFile', 
			src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
			dest: 'dist/'
		}
	}
});
```


动态文件映射比较灵活，主要属性可以分为三类：
+ src 过滤{filter和cwd}
+ dest 动态调整{ext, extDot, fattern, rename}

#### src 过滤

+ cwd 指定src的基础目录,所有的src都依据此目录
+ filter主要是自定义过滤文件或目录

```javascript
grunt.initConfig({
	uglify:{
		dynamic:{
			expand:true,
			cwd:'src/',
			src:['lib/**/*.js', 'model/**/*.js'],
			dest:'dist',
			filter:'isFile'
		},
		custom:{
			expand:true,
			cwd:'src/',
			src:'**',
			dest:'dist',
			filter:function(filepath){
				return grunt.file.isFile(filepath) && require('fs').readdirSync(filepath).length === 0;
			}
		},
	}
});


```


#### dest调整

+ ext 和extDot是调整dest文件后缀
+ fattern属性是设置是否移除src（不包含基础路径cwd在内）原有目录结构，true表示移除，false表示不移除
+ rename 自定义dest目录结构


```javascript
grunt.initConfig({
	cssmin:{
		dynamic:{
			expand: true,
			cwd:'styles',
			src:['**/*.css'],
			dest:'dist',
			ext:'.min.css', //所有压缩后文件都变成.min.css后缀
			extDot:'last'	//只从最后一个句号开始匹配后缀，例如：如果是如此中是.min.css后缀，那么执行后将会变成.min.min.css文件
		},
		fattern:{
			expand: true,
			cwd:'styles',
			src:['**/*.css'],
			dest:'dist/all',
			fattern:true		//生成后，将会所有文件都放到dist/all/目录中，原有的目录结构丢失
		}
	},
	imagemin:{
		min:{
			expand: true,
			cwd:''
			src:['**/*.{jpg,png,gif}'],
			dest:'dist',
			fattern:false,		//此时该参数已经失效
			rename:function(dest, src){
				//取出文件后缀，将每个文件都加上.min.extension
				var path = require('path'),
                        subdir  = path.dirname(src),
                        ext  = path.extname(src),
                        name = path.basename(src, ext);
                    return dest + '/' + subdir +'/' + name + '.min' + ext;
			}
		}
	}
});

```

