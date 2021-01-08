/*
 * @Author: Harrison
 * @Date: 2020-11-04 15:39:24
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-02 18:16:56
 * @FilePath: /merchant-ssr/app/web/config/config.local.ts
 * @Description: file content
 */
import { defineConfig } from "umi"

const publicPath = "/public/"
export default defineConfig({
	ssr: {
		devServerRender: true
	},
	define: {
		IDENTITY_BASE_URL: "/identity",
		SERVER_IDENTITY_BASE_URL: "http://harbor-ex-test.linxuan.site",
		API_URL: "/api",
		SERVER_API_URL: "http://merchant-api-test.linxuan.site",
		APPID: "wx861d3becd4f4f559",
		IS_DEV: true,
		IS_TEST: false,
		IS_PROD: false,
	},
	manifest: {
		fileName: "../../config/manifest.json",
		publicPath,
	},
	publicPath,
	proxy: {
		"/identity": {
			target: "http://harbor-ex-test.linxuan.site",
			changeOrigin: true,
			pathRewrite: { "^/identity": "" },
		},
		"/api": {
			target: "http://merchant-api-test.linxuan.site",
			changeOrigin: true,
			pathRewrite: { "^/api": "" },
		},
	},
})