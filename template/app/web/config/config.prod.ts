/*
 * @Author: Harrison
 * @Date: 2020-10-30 15:06:19
 * @LastEditors: Harrison
 * @LastEditTime: 2020-11-29 00:05:39
 * @FilePath: /lx-gw/app/web/config/config.prod.ts
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
		IDENTITY_BASE_URL: "//harbor-ex.linxuan.site",
		API_URL: "//merchant-api.linxuanketang.com",
		IS_DEV: false,
		IS_TEST: false,
		IS_PROD: true,
	},
})
