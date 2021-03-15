## 自动生成plop模板

use *yeoman-generator* to create templates and then use *plop* to create files quickly

使用*yeoman-generator*创建模板和配置文件,最后用*plop*来创建组件和页面

### base | 前提

- if you didn't install yeoman ,you should run `npm install -g yo`
- 如果没有安装yeoman,你需要先 `npm install -g yo`

### how to use | 如何使用

```
npm i -S generator-jier 
yo jier                     // init | 初始化 选择模板 用于生成目录结构
npm i                       // install plop | 安装plop 
npm run cc [componentName]  // create component | 创建组件
npm run cp [componentName]  //create page | 创建页面
```
### DIY

you can change `plop-template/` and `plopfile.js` to use conveniently 

你可以修改`plop-template/`和`plopfile.js`的内容来更方便使用

### question | 问题

- 使用generator的upmInstall('plop')依赖失败.本地可以,传到npm库里就不行.所以 直接修改package.json,然后用户自己装依赖

### Tips 

命令 | taro | uni-app

yarn cc test/testCom | ++ src/pages/test/TestCom(.tsx,.less) | ++ src/pages/test/TestCom.vue

yarn cp test/test-page | ++ src/pages/test/test-page(.tsx,.less,.config.ts) | ++ src/pages/test/test-page.vue

