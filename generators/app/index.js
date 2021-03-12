const Generator = require('yeoman-generator')
const chalk = require('chalk');
const ora = require('ora');
const log = console.log;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');



let spinner = null; //加载对象



log(chalk.green(
    '仓库地址: ' +
    chalk.blue.underline.bold('github.com/yangheroxin')
));


const templateList = [{
    name: "uni-app",
    value: 1,
}, {
    name: "taro",
    value: 2
}]

module.exports = class extends Generator {
    checkEnv() {
        let jsonContent = this.readDestinationJSON('package.json')
        let installed = false;
        if (jsonContent &&
            (
                (jsonContent.devDependencies && jsonContent.devDependencies['plop']) ||
                (jsonContent.dependencies && jsonContent.dependencies['plop'])
            )
        ) {
            installed = true
        }
        this.hasInstalledDevs = installed

    }

    prompting() {
        ////判断是否环境是否安装依赖
        this.checkEnv();
        let promptsList = [{
            type: 'rawlist',
            name: 'template',
            message: 'which template do you want ? | 想创建什么模板',
            choices: templateList
        }, ]
        if (!this.hasInstalledDevs) {
            promptsList.push({
                type: 'rawlist',
                name: 'type',
                message: 'choose a package manager | 选择包管理工具',
                choices: ["cnpm", "yarn", "npm"]
            })
        }
        return this.prompt(promptsList)
            .then(answers => {
                this.answers = answers;
            })
    }

    writing() {
        // 写入命令
        let jsonContent = this.readDestinationJSON('package.json');
        jsonContent.scripts.cc = 'plop cc'
        jsonContent.scripts.cp = 'plop cp';
        this.writeDestinationJSON('package.json', jsonContent)

        //复制模板到目标路径
        let templates = []
        let outputs = []
        switch (this.answers.template) {
            case 2:
                templates = [
                    'taro/component/template.hbs',
                    'taro/component/template.less.hbs',
                    'taro/page/template.hbs',
                    'taro/page/template.less.hbs',
                ]
                outputs = templates.map(item => item.replace('taro/', 'plop-templates/'))
                templates.push('taro/plopfile.js')
                outputs.push('plopfile.js')
                break;
            case 1:
            default:
                templates = [
                    'uni-app/component/template.hbs',
                    'uni-app/page/template.hbs',
                ]
                outputs = templates.map(item => item.replace('uni-app/', 'plop-templates/'))
                templates.push('uni-app/plopfile.js')
                outputs.push('plopfile.js')

        }
        templates.forEach((item, i) => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(outputs[i])
            )
        })

        if (!this.hasInstalledDevs) {
            switch (this.answers.type) {
                case 'yarn':
                    this.yarnInstall('plop')
                    break;
                case 'npm':
                    this.npmInstall('plop')
                    break;
                case 'cnpm':
                default:
                    this.npmInstall('plop', {
                        registry: "https://registry.npm.taobao.org"
                    })
            }
        }
    }

    conflicts() {
        this.conflicter.force = true;
    }
    install() {
        if (!this.hasInstalledDevs) {
            spinner = ora(warning('正在安装依赖...')).start();
        }
    }
    end() { //结束动作，例如清屏，输出结束信息，say GoodBye等等
        spinner && spinner.stop();
        log(success('Happy Coding !!  yarn cc [coponent-name] yarn cp [page-name]'));
    }
}