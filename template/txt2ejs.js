/*
 * @Author: Harrison
 * @Date: 2021-01-07 18:33:51
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-07 19:03:41
 * @FilePath: /merchant-ssr/txt2ejs.js
 * @Description: document.ejs.txt => document.ejs
 */
const fs = require("fs-extra")

const fileName = './app/web/pages/document.ejs.txt'
const newFileName = './app/web/pages/document.ejs'

if (fs.pathExistsSync(fileName)) {
    
    fs.renameSync(fileName,newFileName)
    console.log('document.txt=>ejs SUCCESS!')
}

