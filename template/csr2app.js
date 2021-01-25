
const fs = require("fs-extra")

const fileName = './app/web/app.csr.js'
const targetFileName = './app/web/app.js'
fs.copyFileSync(fileName, targetFileName)

