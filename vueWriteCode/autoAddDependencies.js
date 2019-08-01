#!/usr/bin/env node
const fs = require('fs')
const argv = require('yargs').argv;
const target = argv.target || './src'
let file = argv.file
if (!file) {
  console.log('请加上 --file 参数')
  return
}


function returnVue(path, vueFiles) {
  vueFiles = vueFiles ? vueFiles : []
  const data = fs.readdirSync(path)
  data.forEach(item => {
    const stat = fs.statSync(`${path}/${item}`)
    if (stat.isDirectory()) {
      returnVue(`${path}/${item}`, vueFiles)
    } else if (typeof item === 'string' && /\.vue$/.test(item)) {
      vueFiles.push(`${path}/${item}`)
    }
  })
  return vueFiles
}

function returnStyleTagIndex (filePath, cbOk, cbErr) {
    fs.readFile(filePath, 'utf8', (err, buffer) => {
        if (err) cbErr(err)
        buffer = buffer.split('\n')
        const styleTagIndex = buffer.findIndex(tag => {
           return /^<style\s+(lang="s[ac]ss")?(\s+scoped)?(\s+)?>$/.test(tag)
        })
        cbOk(buffer, styleTagIndex)
    })
}

function writeCodeToFile(path) {
    returnStyleTagIndex(path, (buffer, index) => {
        const layersUp = path.match(/\//g).length - 2
        const cssPath = `${layersUp > 0 ? '../'.repeat(layersUp) : './'}${file}`
        buffer.splice(index+1, 0, `@import url(${cssPath});`)
        buffer = buffer.join('\n')
        fs.writeFileSync(path, buffer, 'utf8')
    }, (err) => {
        throw err
    })
}

const allVues = returnVue(target)
allVues.forEach(path => {
    writeCodeToFile(path)
})