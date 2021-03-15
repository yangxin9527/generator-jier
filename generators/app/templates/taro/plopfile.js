// plopfile.js
const _ = require('lodash')

function onlyName(txt) {
    let arr = txt.split('/');
    return arr.length > 1 ? arr[arr.length - 1] : txt
}

module.exports = function(plop) {
    // 设置工具函数 强制大写开头
    plop.setHelper('kebabCase', (txt) => _.kebabCase(txt)); //加-
    plop.setHelper('bigCamelCase', (txt) => _.upperFirst(_.camelCase(txt)));
    plop.setHelper('onlyName', onlyName);

    const prompts = [{
        type: 'input',
        name: 'inputName',
        message: 'input the name | 请输入组件名称',
        validate(val) {
            if (RegExp(/^[A-Za-z]+[/a-z0-9A-Z_-]*$/).test(val.trim())) {
                return true
            } else {
                return '格式错误'
            }
        }
    }]

    // 新增组件
    plop.setGenerator('component', {
        description: 'add component | 新增组件',
        prompts,
        actions(data) {
            let arr = data.inputName.split('/');
            let name = arr[arr.length - 1]
            arr[arr.length - 1] = _.upperFirst(_.camelCase(name))
            return [{
                    type: 'add',
                    path: `src/components/${arr.join('/')}/${arr[arr.length-1]}.tsx`, // 目标路径
                    templateFile: 'plop-templates/component/template.hbs', // 源模板路径
                    data: {
                        name
                    }
                }, {
                    type: 'add',
                    path: `src/components/${arr.join('/')}/${arr[arr.length-1]}.less`,
                    templateFile: 'plop-templates/component/template.less.hbs',
                    data: {
                        name
                    }
                }

            ]
        }
    });
    plop.setGenerator('page', {
        description: 'add page | 新增页面',
        prompts,
        actions(data) {
            let newDate = {
                name: onlyName(data.inputName)
            }
            return [{
                type: 'add', //add:新增
                path: 'src/pages/{{inputName}}/index.tsx', // 目标路径
                templateFile: 'plop-templates/page/template.hbs',
                data: newDate
            }, {
                type: 'add', //增加less
                path: 'src/pages/{{inputName}}/index.less', // 目标路径
                templateFile: 'plop-templates/page/template.less.hbs',
                data: newDate
            }, {
                type: 'add', //增加config
                path: 'src/pages/{{inputName}}/index.config.ts', // 目标路径
                templateFile: 'plop-templates/page/index.config.ts',
                data: newDate
            }]
        }
    });




};