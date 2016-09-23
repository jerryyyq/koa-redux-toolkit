# Koa Route MySQL React Redux Toolkit
这是一个尽量简单的、结构清晰的、适合入门开发者实践的框架。使用这个框架，会令开发者非常容易理解整个框架的工作流程。
在这个框架内，开发者可以使用逻辑非常清晰的流程来控制服务器端路由以及客户端路由。

对于 React 与 Redux 的结合，也简化了分布结构，使一个组件的代码都集中到一个子目录内，并且尽可能的减少了需要导出的函数。
看了一些其他框架，出于别的一些考虑，他们很多对一个组件的文件分散放置，并且在不同的组件目录内都放置了统一的 index.js 文件，
这样的结果导致在编辑器里编辑不同组件文件时查找目标文件很困难，同时增加了很多其实本质上无用的文件，为开发者，尤其是初级开发者带来了很多困扰。

我一直认为，好的代码只有两条原则：
*  正确：代码要运行正常。
*  易于理解：任何一个新人接手，都可以很容易的理解原来代码的逻辑。
所以，在这个框架内，为了使开发者容易理解这个框架的工作流程，我尽量把相关的代码放到了一起，能够减少的不必要的文件尽量省却，希望能减少入门者的困惑。

代码分为主要两大部分，正如其名：
*  server：服务器端代码。包括了：服务器端路由，数据库操作，json 结果返回，等功能。
*  client：浏览器端代码。包括了：客户端路由，React 组件定义与实例化，Redux 相关功能创建与调用，客户端交互，客户端与服务器端数据交互，异步请求等功能。

本套代码使用到的技术点包括：
React antd界面，redux调用，react-route，组件动态加载，koa-route，登录与注销，数据库操作，数据库数据获取，cookie设置，session维护，用户口令安全存储方法。

数据库安装脚本为：server/yyqtestdb.sql，通过在 mysql 内运行此脚本可以生成本套代码运行需要的数据库和用户，您也可以自己修改核安装。
数据库的连接配置信息在：server/lib/mysql-query.js 文件内，您需要修改相关配置信息，保证能够连接上数据库。


## 使用说明

* 首先，clone 或者 下载

```bash
$ git clone https://github.com/jerryyyq/koa-redux-toolkit.git
// or
$ wget -O koa-redux-toolkit.zip https://github.com/jerryyyq/koa-redux-toolkit/archive/master.zip
$ unzip koa-redux-toolkit.zip
```

* 然后，进入目录

```bash
$ cd koa-redux-toolkit
```

* 按照 server/yyqtestdb.sql 内容生成相关数据库内容
* 修改 server/lib/mysql-query.js 文件内的数据库连接配置信息


* 安装工程依赖的 node 模块

```bash
$ npm install
```

* 将客户端 main.js 及其依赖模块编译为 ES5 语法代码：bundle.js
该输出脚本 bundle.js 被 client/index.html 文件包含。
请注意：为了简化框架，没有进行热加载，所以：每次更改代码后，需要重新编译并重新启动服务。

```bash
$ npm run build-debug
```

* 最后，启动服务

```bash
$ npm start
```

如果看到： koa web server running at: http://...... 恭喜你，服务已经启动成功，可以在浏览器中访问了！

服务的启动是首先从工程目录下的 server.js 开始的，在这个脚本中，会首先通过 koa-router 创建服务器端路由，然后定位客户端文件到请求根路径下，
最后，通过 koa 启动 Web 服务。
您可以通过 ^C 结束服务。



