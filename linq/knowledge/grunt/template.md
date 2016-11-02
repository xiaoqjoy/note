# Grunt Template机制

grunt为了更方便组合路径等格式化文本，采用了underscore(_)的template模板机制，如果不熟悉可以参考[underscore官网](http://underscorejs.org/#template)

## template 基本用法

简单介绍下模板，主要有三个标签:
+ <% %> 定义js脚本
+ <%= %> 将js变量中的文本写入字符串中
+ <%- %>  内容带有html-escaped写入字符串中

```javascript
var compiled = _.template("hello: <%= name %>");
compiled({name: 'moe'});
## => "hello: moe"

var template = _.template("<b><%- value %></b>");
template({value: 'script>'});
## => "<b>script&gt;</b>"


## 改变<%  %>模板写法为{{  }}
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

```

## Config中可用变量

其实，在[Gruntfile 任务配置规则和技巧](config_rule_skill.md)中只讲到如何在Config配置文件中配置Multi任务需要的配置，并没有提及任务之外的属性。在这里我们来探讨下非Multi选项、任务、目标属性之外的属性。

```javascript
grunt.initConfig({
	task1:{
		target1:{},
		options:{},
		arg1:{},
		arg2:2
	},
	task2:{},
	property1:{},
	property2:'name'
});
```

请大家看看上面Demo，除了task1与task2之外，还有property1和property2、arg1、arg2等等属性，那么这些属性能做什么用呢？我们先看看[官方Demo](http://gruntjs.com/getting-started)

```
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
      src: 'src/<%= pkg.name %>.js',
      dest: 'build/<%= pkg.name %>.min.js'
    }
  }
});

```

上述Demo中,pkg是读取了目录下package.json文件后的对象，在banner、src、dest中可以直接使用。因此我们可以得出结论：
+ 任何与task同级（非任务指定属性）都当成任务执行的一个变量处理，任务执行完毕才销毁。

+ grunt Template中可以使用任何作用范围内的属性

```javascript
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  dirs: {
    src: 'src/files',
    dest: 'dist/<%= pkg.name %>/<%= pkg.version %>',
  },
  concat: {
    basic: {
      src: ['<%= dirs.src %>/main.js'],
      dest: '<%= dirs.dest %>/basic.js',
    },
    extras: {
      src: ['<%= dirs.src %>/main.js', '<%= dirs.src %>/extras.js'],
      dest: '<%= dirs.dest %>/with_extras.js',
    },
  },
  jshint:{
	main:{
		src:['<%=concat.extras.dest%>', '<%=concat.basic.dest%>']
	}
  }
});
```

总结：***任何与task同级的属性，包括task都是可以当成js变量访问。而他们包含的属性则可以被这些变量直接访问。***




