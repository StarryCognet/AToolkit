# node.js - 在 PowerShell 上运行 npm 会询问 “你要如何打开这个文件”

## 奇遇
今天准备打开 VSCode 玩一会 vue， 使用 `npm run serve` 命令后直接给我干个打开文件窗口，给我整的一头雾水。。。。。

## 试错
接下来我踏上解决这个错误的路程，以下是我心路历程：

1. 检查环境变量，重新复制粘贴 node 路径，没错啊。
2. 重新安装 npm 也没问题啊。
3. 在 PowerShell 里使用命令查看 node、vue 版本，都可以正常显示，头大。
4. 郁闷了，那就重新安装 nodejs 吧，安装包版改为了压缩包版，还不行！！！
5. 什么破电脑，刚买来还没过 7 天无理由，难不成就要让我重装系统？？？黑人问号？？？

## 偶然
百度了半天也没找到结果，果断打开了谷歌，皇天不负有心人，还真让我给找到了！！！

## 踏破铁鞋无觅处
以下为解决方法：

1. 在 powershell 中运行命令 `get-command npm`

```javascript
get-command npm
```

2. 它可能会给你错误的路径，蓝色标线所示。

![](https://cdn.nlark.com/yuque/0/2025/png/42939896/1753262367430-8b238646-52ca-4f67-b4a4-918efae56374.png)

3. 打开 Source 显示路径，找到 npm 这个文件，删除掉

![](https://cdn.nlark.com/yuque/0/2025/png/42939896/1753262393044-5c5b4872-f8db-4b86-a44a-d4623f1caa23.png)

4. ok 可以啦，重新在 PowerShell 里输入命令 `npm -v`，终于正常显示版本号了。

## 小结
你若问我为什么 systsem32 文件夹下，会有个 npm 文件，当然啦，我也不知道，难道中了毒？

最后附上原文链接[https://www.coder.work/article/559669](https://www.coder.work/article/559669)
