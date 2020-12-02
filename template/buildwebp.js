/*
 * @Author: Harrison
 * @Date: 2020-11-06 17:14:40
 * @LastEditors: Harrison
 * @LastEditTime: 2020-11-18 18:50:45
 * @FilePath: /lx-gw/buildwebp.js
 * @Description: 生成webp
 */
const sharp = require("sharp")
const fs = require("fs-extra")

const baseDir = "./app/web/assets/"

function readImgs(dir) {
	const files = fs.readdirSync(dir)
	const imgs = []
	for (let i = 0; i < files.length; i++) {
		let file = files[i]
		if (!/\./.test(file)) {
			// 文件夹
			// fs.readdirSync(baseDir + file)
			imgs.push(...readImgs(dir + file + "/"))
		}
		if (/\.(png|jpe?g|gif|webp)(\?.*)?$/.test(file)) {
			// 图片
			imgs.push(dir + file)
		}
	}
	return imgs
}

const imgs = readImgs(baseDir)
const needWebpImgs = imgs.filter((img) => !/\.webp$/.test(img) && !imgs.includes(img + ".webp"))
const needDeleteWebpImgs = imgs.filter((img) => {
	if (/(.+)\.webp$/.test(img)) {
		return !imgs.includes(RegExp.$1)
	}
	return false
})

console.log("---------------------")
console.log("需要转webp的图片：", needWebpImgs)

needWebpImgs.forEach((img) => {
	sharp(img).toFile(img + ".webp", (err, info) => {
		err && console.log("webp错误", err)
	})
})

console.log("---------------------")
console.log("需要删除的webp图片：", needDeleteWebpImgs)
needDeleteWebpImgs.forEach(img => fs.removeSync(img))

console.log("webp转换完成")
