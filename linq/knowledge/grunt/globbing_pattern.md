# Globbing Pattern 通配符

工程化项目中我们常常需要指定整个项目或目录中的所有同一后缀文件进行处理。而项目开发过程中新增、修改文件时极为常见的，为了解决此问题。因此grunt支持简单的通配符，常见的通配符：
+ * 匹配任意字符，除了/之外
+ ? 匹配一个字符，除了/之外
+ ** 匹配任意字符，包括/
+ {} 支持逗号分隔个多个or字符
+ ！忽略匹配路径

## 常用通配符

在上面常见的通配符中，匹配字符是最常用的，因此匹配字符提供三种方式：
+ * 不包括/的任意字符
+ ** 任意字符
+ ? 一个不包含/的字符

```javascript
grunt.initConfig({
	uglify:{
		web:{
			expand:true,
			src:'**/*.js',
			dest:'dist',
			ext:'.min.js',
			filter:'isFile'
		},
		app:{
			src:['d?/*.js'],	//所有以d?开头的文件中的js全压缩到main.js
			dest:'dist/main.js'
		}
	}
});


```	

多选一选项匹配模式，采用{selector1,selector2,...}

```javascript
grunt.initConfig({
	imagemin:{
		minimage:{
			expand:true,
			src:['images/*.{jpg,png}'],
			dest:'dist/images'
			filter:'isFile'
		}
	}
});
```


排除目录或文件选项，采用！

```javascript
grunt.initConfig({
	jshint:{
		chk:{
			options:{
				curly:true,
				eqnull:true
			},
			//排除node_modules和dist目录js文件的检查
			src:['**/*.js', '!**/node_modules/*.js', '!dist/**']
		}
	}		
})
```

