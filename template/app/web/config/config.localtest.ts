/*
 * @Author: Harrison
 * @Date: 2021-01-07 21:09:39
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-07 21:13:02
 * @FilePath: /merchant-ssr/app/web/config/config.localtest.ts
 * @Description: (本地build的test环境)
 */
import { defineConfig } from "umi"

const publicPath = "/public/"
export default defineConfig({
	manifest: {
		fileName: "../../config/manifest.json",
		publicPath,
	},
	publicPath,
	define: {
		IDENTITY_BASE_URL: "https://harbor-ex-test.linxuan.site",
		API_URL: "https://merchant-api-test.linxuan.site",
		SERVER_IDENTITY_BASE_URL: "https://harbor-ex-test.linxuan.site",
		SERVER_API_URL: "https://merchant-api-test.linxuan.site",
		APPID: "wx88dcbef4f2854b7e",
		IS_DEV: false,
		IS_TEST: true,
		IS_PROD: false,
	},
})
