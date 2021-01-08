/*
 * @Author: Harrison
 * @Date: 2021-01-07 18:33:51
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-07 19:00:34
 * @FilePath: /merchant-ssr/ejs2txt.js
 * @Description: document.ejs => document.ejs.txt
 */
const fs = require("fs-extra")

const fileName = './app/web/pages/document.ejs'
if (fs.pathExistsSync(fileName)) {
    fs.renameSync(fileName,fileName + '.txt')
    console.log('document.ejs=>txt SUCCESS!')
}

