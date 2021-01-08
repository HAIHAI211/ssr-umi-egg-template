/*
 * @Author: Harrison
 * @Date: 2020-10-30 14:58:50
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-08 10:06:29
 * @FilePath: /ssr-umi-egg-template/template/app/web/app.js
 * @Description: file content
 */

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
