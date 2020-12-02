/*
 * @Author: Harrison
 * @Date: 2020-11-04 15:39:24
 * @LastEditors: Harrison
 * @LastEditTime: 2020-11-29 00:05:13
 * @FilePath: /lx-gw/app/web/config/config.local.ts
 * @Description: file content
 */
import { defineConfig } from "umi"

const publicPath = "/public/"
export default defineConfig({
	ssr: {
		forceInitial: true
	},
	define: {
		IDENTITY_BASE_URL: "/identity",
		API_URL: "/api",
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