# push

git push 更新远程refs（伴随关联的对象）

push命令概要：

```
git push  [--all | --mirror | --tags]
 [--repo=<repository>]
 [-f | --force]
 [-d | --delete]
 [--prune]
 [-v | --verbose]
 [<repository> [<refspec>…​]]
```

## 参数选项

#### [--repo=<repository>]或[<repository>]

push 到远程仓库的地址，允许是URLS或远程仓库别名

```
# origin指远程仓库别名，采用git remote -v可以查看值
git push origin master

# 使用URLS与上面一样
git push https://profoundsoul@github.com/profoundsoul/basenotes.git master
```

#### <refspec>

参数原型：

```
# +为可选项，表示是否--force推送。
[+]src:dst
```

+ src---本地分支。可以是分支名字，也可以使用gitrevisions【HEAD、master~4】

+ dst---远程分支。可以使远程分支名字，也可以省略。

***缺省时，会默认在<repository>搜索<src>分支相同名字分支更新操作***。

+ tag <tag>与refs/tags/<tag>:refs/tags/<tag>相同

+ empty <src> 推送到<dst>表示删除远程分支

+ ：（+src：dst允许非fast-forward更新）

#### [-d | --delete]

表示删除远程分支

```
# 表示删除remotes 的dev分支
git push [-d|--delete] remotes dev

# 常见删除远程dev分支
git push origin -d dev
```

注意：***<refspec>中接受target src参数，而不接收:dst***

#### [-f | --force]

强制提交，允许库非fast-forward提交。

#### fast-forward

表示某次提交历史有且只有一个父节点，且父节点应为未push时，远程仓库最新的子节点

现有版本历史如下：

```
      B
     /
 ---X---A

```

此时，B commits是基于X commits的本地commits。当前remote分支上最新的commits是A。若想push B，则必须先pull，合并A和B commits C，最后在提交；

```
      B---C
     /   /
 ---X---A

```

或者，你可以基于A和B的共同版本X，使用pull --rebase拉取，创建一个新的D commit，然后push

```
      B   D
     /   /
 ---X---A

```

## 实例

#### git push

推送当前分支

#### git push origin

推送当前分支，依据git config remote.origin.push HEAD

#### git push origin :

为存在本地的每个分支进行匹配推送

#### git push origin master

推送master分支到远程master分支中

#### git push origin HEAD

将当前分支推送到具有相同名字的远程分支。

#### git push mothership master:satellite/master dev:satellite/dev

一对多分支推送。将master分支推送到远程satellite/master;将dev分支推送到远程satellite/dev

#### git push origin HEAD:master

将当前分支推送到origin的master分支中，而不管当前分支的名字是什么。

#### git push origin master:refs/heads/experimental

基于本地master在origin远程refs/heads/下创建experimental分支。

```
# 先创建本地分支，后创建远程分支命令
git push origin dev:dev

```

#### git push origin :experimental

删除远程experimental分支，与-d/--delete效果一致

#### git push origin +dev:master

允许non-fast-forward更新远程仓库，会遗留下未被引用的无名分支，最终自动被**git gc**回收，与--force/-f效果一致：

假设版本图如下：

```
	    o---o---o---A---B  origin/master
		     \
		      X---Y---Z  dev

```

执行完命令后，版本图如下：

```
		      A---B  (unnamed branch)
		     /
	    o---o---o---X---Y---Z  master
```











