#!/usr/bin/env node
// 依赖引入
var fs = require('fs')
var shell = require('shelljs')

// 命令行变量
var enviroment = process.argv[2]
var branch = process.argv[3] || 'dev'

// git 远程地址
var remoteDistUrl = shell.exec('git remote -v')
var indexs = [remoteDistUrl.indexOf('http'), remoteDistUrl.indexOf(' (fetch)')]
remoteDistUrl = remoteDistUrl.slice(indexs[0], indexs[1])
remoteDistUrl = remoteDistUrl.split('.')
remoteDistUrl[remoteDistUrl.length - 2] = remoteDistUrl[remoteDistUrl.length -2]+'_dist'
remoteDistUrl = remoteDistUrl.join('.')

// 发布时间
var date = new Date(),
year = date.getFullYear(),
month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
dateFormat =  year + month + day + hours + minutes

// 判断某文件夹是否存在
function foldExist(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

// 进入 dist_git 文件夹
if (!foldExist('./dist_git')) {
    shell.exec('mkdir dist_git')
}

shell.cd('./dist_git/')

// 初始化git
if (!foldExist('./.git')) {
    shell.exec('git init')
    shell.exec('git remote add origin ' + remoteDistUrl)
    shell.exec('git pull origin master')
    shell.exec(`git fetch origin ${branch}`) 
}

// 更新本地代码
shell.exec('git checkout dev && git pull')

// 删除所有当前文件夹内除了.git的所有文件
shell.exec('rm -rf ./*')

// 回到src目录
shell.cd('-')

// 删除dist
shell.exec('rm -rf dist/')

// 打包
if (enviroment) {
    (enviroment === 'prod') ? shell.exec('npm run build') : shell.exec('npm run build:' + enviroment)
}

shell.exec('cp -r ./dist/ ./dist_git/')

// 去到 dist_git 文件夹
shell.cd('-')

// 提交代码到本地
shell.exec(`git add . && git commit -m ${enviroment ? enviroment : ''}发布${dateFormat}`)

// 发布到远程
shell.exec('git pull && git push')