// plopfile.js
const _ = require('lodash')

module.exports = function(plop) {
    // 设置工具函数 强制大写开头
    plop.setHelper('upperCase', (txt) => _.upperFirst(txt));
    // 新增组件
    plop.setGenerator('component', {
        description: 'add component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: '请输入组件名称'
        }],
        actions: [{
            type: 'add',
            path: 'src/components/{{upperCase name}}/{{upperCase name}}.tsx', // 目标路径
            templateFile: 'plop-templates/component/template.hbs' // 源模板路径
        }, {
            type: 'add',
            path: 'src/components/{{upperCase name}}/{{upperCase name}}.less',
            templateFile: 'plop-templates/component/template.less.hbs'
        }]
    });
    plop.setGenerator('page', {
        description: 'add page',
        prompts: [{
            type: 'input', // input:输入类型 |
            name: 'name', // 键 以供后面获取用户输入
            message: '请输入组件名称' // 提示信息
        }],
        actions: [{
            type: 'add', //add:新增
            path: 'src/pages/{{name}}/index.tsx', // 目标路径
            templateFile: 'plop-templates/page/template.hbs' // 源模板路径
        }, {
            type: 'add', //增加less
            path: 'src/pages/{{name}}/index.less', // 目标路径
            templateFile: 'plop-templates/page/template.less.hbs' // 源模板路径
        }, {
            type: 'add', //增加config
            path: 'src/pages/{{name}}/index.config.ts', // 目标路径
            templateFile: 'plop-templates/page/index.config.ts' // 源模板路径
        }]
    });


};