# 分支的新建与合并

参考：<http://fsjoy.blog.51cto.com/318484/245081>

<http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840038939c291467cc7c747b1810aab2fb8863508000>

## 分支模型

> 每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。

```
HEAD严格来说不是指向提交，而是指向master，master才是指向提交的，所以，HEAD指向的就是当前分支。
```

master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点：

![master分支](../images/master.png)

创建新的分支，例如dev时，Git新建了一个指针叫dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支在dev上：

![dev分支](../images/dev.png)


## 分支策略

在实际开发中，我们应该按照几个基本原则进行分支管理：

+ master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活
+ dev分支上干活，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
+ 基于dev分支personal branch进行开发工作，开发完成后不断往dev分支进行合并

所以团队合作的分支历史图看起来像这样：

![多人分支协作图](../images/gitcooperate.png)







