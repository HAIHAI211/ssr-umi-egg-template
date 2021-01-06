/*
 * @Author: Harrison
 * @Date: 2020-10-30 14:58:50
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-06 10:20:40
 * @FilePath: /ssr-umi-egg-template/template/app/web/app.js
 * @Description: file content
 */
// import { isBrowser } from 'umi';
// import { setCookie, getCookie } from './utils/cookie';

// /**
//  *  在运行时扩展语言plugin，语言顺序，cookie > 浏览器默认语言 > 默认语言
//  *  切换语言时会同时设置localStorage 和cookie，key保持一致。
//  *  封装好了cookie方法，同时试用与服务端和客户端，客户端取cookie的方法
//  *  见serverHelper.js，只是将koa的方法进行扩展，koa试用请自行学习
//  *  客户端获取cookie的方法见utils/cookie
//  *
//  */
// export const locale = {
//   getLocale() {
//     let lang;
//     if (isBrowser()) {
//       const navigatorLang = window.navigator.language.includes('zh')
//         ? 'zh-CN'
//         : 'en-US';
//       /**
//        *  最后默认是中文，这里可以根据自身项目需要修改
//        *  或者可以将locale单独定义一个config，即给umirc
//        *  也可以导入到这里，赋值给默认语言，这样修改一个地方
//        *  就可以完成默认语言的修改
//        *
//        */
//       lang = getCookie('umi_locale') || navigatorLang || 'zh-CN';
//     } else {
//       lang = getCookie('umi_locale') || global._navigatorLang || 'zh-CN';
//     }
//     return lang;
//   },
//   setLocale({ lang, realReload = false, updater }) {
//     if (!isBrowser()) {
//       console.error('---------设置语音失败非浏览器环境--------');
//       return;
//     }
//     if (!lang) {
//       console.error('---------必须输入要切换的语言，否则无法切换--------');
//       return;
//     }
//     localStorage.setItem('umi_locale', lang);
//     setCookie('umi_locale', lang, null, 10000);
//     if (realReload) {
//       window.location.reload();
//     }
//     updater();
//   },
// };

import { history } from "umi"
import { Toast } from "antd-mobile"
import { isMobile, isWechat, supportWebp } from "./utils/helper"

Toast.config({
	duration: 1.5,
	mask: false,
})

export const ssr = {
	modifyGetInitialPropsCtx: async (ctx) => {
		if (IS_DEV && ctx.isServer) {
			// console.log("开发服务器渲染", ctx)
			ctx.supportWebp = true
			ctx.isMobile = true
			ctx.isWechat = false
		}
		if (!ctx.isServer) {
			// console.log("客户端渲染", ctx)
			ctx.supportWebp = await supportWebp()
			ctx.isMobile = isMobile()
			ctx.isWechat = isWechat()
			ctx.history = history
		}
		return ctx
	},
}
