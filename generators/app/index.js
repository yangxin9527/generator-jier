const Generator = require('yeoman-generator')
const chalk = require('chalk');
const log = console.log;
const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.keyword('green');




log(chalk.green(
    '仓库地址: ' +
    chalk.blue.underline.bold('https://github.com/yangxin9527/generator-jier.git')
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

        return this.prompt(promptsList)
            .then(answers => {
                this.answers = answers;
            })
    }

    writing() {
        // 写入命令
        let jsonContent = this.readDestinationJSON('package.json');
        jsonContent.scripts.cc = 'plop component'
        jsonContent.scripts.cp = 'plop page';
        if (!this.hasInstalledDevs) {
            jsonContent.dependencies['plop'] = "^2.7.4";
        }
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
                    'taro/page/index.config.ts',
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
    }

    conflicts() {
        this.conflicter.force = true;
    }

    // install() {
    //     if (!this.hasInstalledDevs) {
    //         warning('正在安装依赖...')
    //     }
    // }
    end() { //结束动作，例如清屏，输出结束信息，say GoodBye等等
        log(chalk `
            please install dependencies again | 请再次安装依赖
            {red npm i} 
            and then you can run cmd | 接着你可以尝试命令行运行下面指令
            {red npm run cc [componentName]} or {red npm run cp [pageName]}    //创建组件和页面
            
            diy: | 自定义：
            {gray plop-templates/}  
            {gray plopfile.js}
        `);

    }
}