// plopfile.js
const _ = require('lodash')
module.exports = function (plop) {
  // 设置工具函数 强制大写开头
  plop.setHelper('upperCase', (txt) => _.upperFirst(txt));
  // 新增组件
  plop.setGenerator('c', {
    description: 'add component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: '请输入组件名称'
    }],
    actions: [{
      type: 'add',
      path: 'src/components/{{upperCase name}}.vue', // 目标路径
      templateFile: 'plop-templates/component/template.hbs' // 源模板路径
    }]
  });
  plop.setGenerator('p', {
    description: 'add page',
    prompts: [{
      type: 'input', // input:输入类型 |
      name: 'name', // 键 以供后面获取用户输入
      message: '请输入组件名称' // 提示信息
    }],
    actions: [{
      type: 'add',   //add:新增
      path: 'src/pages/{{name}}.vue', // 目标路径
      templateFile: 'plop-templates/page/template.hbs' // 源模板路径
    }]
  });


};
