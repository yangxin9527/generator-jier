## 自动生成plop模板

```
yo plop //创建模板
yarn cc //创建组件
yarn cp //创建页面

```
- 选择模板(用户输入)
    - taro
    - uni-app

- 读取package.json 写入plop cc 和plop cp 命令

- 复制模板到目标路径

- 选择安装工具(用户输入,如果没有安装plop则进入)
    - cnpm 
    - npm 
    - yarn

- 完成

### 剩余问题

- install安装 plop依赖失败
- plop 参数修改 为create component 和page 

## 待优化

- plop 直接装在依赖中,而不是用户运行yo jier才开始安装,需要暴露出jier方法 
- 生成命令行帮助信息
