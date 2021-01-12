/*
 * @Author: Harrison
 * @Date: 2020-12-23 13:14:28
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-12 16:52:06
 * @FilePath: /ssr-umi-egg-template/template/app/web/utils/helper.ts
 * @Description: file content
 */
/*
 * @Author: Harrison
 * @Date: 2020-12-18 14:51:40
 * @LastEditors: Harrison
 * @LastEditTime: 2020-12-21 15:51:43
 * @FilePath: /merchant/app/web/utils/helper.js
 * @Description: file content
 */

export const isMobile = () => {
	return /mobile|android|iphone|ipad|phone/i.test(navigator.userAgent)
}

export const supportWebp = () => {
	return new Promise((resolve, reject) => {
		const __webp_i__ = new Image()
		// 图片加载完成时候的操作
		__webp_i__.onload = function () {
			// 图片加载成功且宽度为1，那么就代表支持webp了，因为这张base64图是webp格式。如果不支持会触发image.error方法
			if (__webp_i__.width == 1) {
				console.log("【【该浏览器支持webp】】")
				resolve(true)
				// window.supportWebp = true
			} else {
				console.log("【【该浏览器不支持webp】】")
				resolve(false)
				// window.supportWebp = false
			}
		}
		__webp_i__.onerror = function () {
			console.log("【【该浏览器不支持webp】】")
			resolve(false)
			// window.supportWebp = false
		}
		// 一张支持alpha透明度的webp的图片，使用base64编码
		__webp_i__.src =
			"data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=="
	})
}

// export const supportWebp = () => {
// // 	const accept = ctx.get("accept") || ""
// // 	const ua = ctx.get("user-agent") || ""
// // 	console.log("【Accept】", accept)
// // 	console.log("【user-agent】", ua)
// //   let supportWebp = false
// //   // accept里含有image/webp 或 iphone os>= 14 则支持webp
// // 	if (/webp/i.test(accept) || getIphoneOsVersion(ctx) >= 14) {
// // 		supportWebp = true
// // 	}
// // 	return supportWebp
// }

export const isWechat = () => {
	return /micromessenger/i.test(navigator.userAgent)
}

// export const getRedirectUri = () => {
// 	// if (/^https?:\/\/.+$/.test(window.location.href)) {
// 	// 	return encodeURIComponent(window.btoa(RegExp.$1))
// 	// }
// 	// return ''
// 	return encodeURIComponent(window.btoa(window.location.href))
// }
