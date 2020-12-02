/*
 * @Author: Harrison
 * @Date: 2020-10-30 15:06:29
 * @LastEditors: Harrison
 * @LastEditTime: 2020-11-29 00:05:31
 * @FilePath: /lx-gw/app/web/config/config.test.ts
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
		IDENTITY_BASE_URL: "//harbor-ex-test.linxuan.site",
		API_URL: "//merchant-api-test.linxuan.site",
		IS_DEV: false,
		IS_TEST: true,
		IS_PROD: false,
	},
})
