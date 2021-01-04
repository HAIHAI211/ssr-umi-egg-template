/*
 * @Author: Harrison
 * @Date: 2020-10-30 15:06:29
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-04 11:14:08
 * @FilePath: /ssr-umi-egg-template/template/app/web/config/config.test.ts
 * @Description: file content
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
		SERVER_IDENTITY_BASE_URL: "http://harbor-exchange-test:8080",
		SERVER_API_URL: "http://linxuan-markone:8080",
		APPID: "wx88dcbef4f2854b7e",
		IS_DEV: false,
		IS_TEST: true,
		IS_PROD: false,
	},
})
