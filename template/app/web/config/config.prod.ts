/*
 * @Author: Harrison
 * @Date: 2020-10-30 15:06:19
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-04 11:13:53
 * @FilePath: /ssr-umi-egg-template/template/app/web/config/config.prod.ts
 * @Description: file content
 */
import { defineConfig } from "umi"

const publicPath = "//lx-cdn.highso.com.cn/lx-gw/public/"
export default defineConfig({
	// publicPath: "//lx-cdn.highso.com.cn/lx-gw/",
	publicPath,
	manifest: {
		fileName: "../../config/manifest.json",
		publicPath,
		// publicPath: "//lx-cdn.highso.com.cn/lx-gw/public/",
	},
	define: {
		IDENTITY_BASE_URL: "https://harbor-ex.linxuan.site",
		API_URL: "https://merchant-api.linxuanketang.com",
		SERVER_IDENTITY_BASE_URL: "http://harbor-exchange:8080",
		SERVER_API_URL: "http://linxuan-markone:8080",
		APPID: "wx861d3becd4f4f559",
		IS_DEV: false,
		IS_TEST: false,
		IS_PROD: true,
	},
})
