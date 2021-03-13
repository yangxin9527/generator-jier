## 自动生成plop模板

use yeoman-generator to create templates and then use plop to create files quickly

使用yeoman-generator创建模板和配置文件,最后用plop来创建组件和页面

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

- install plop依赖失败 本地可以,传到线上就不行 解决不了.所以 直接修改package.json,然后用户来npm i

### Tips 
component (testName | test-name) => class TestName      .c-test-name

page (testName | test-name) => class TestName      .p-test-name