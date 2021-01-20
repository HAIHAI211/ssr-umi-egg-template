/*
 * @Author: Harrison
 * @Date: 2020-11-03 15:51:25
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-07 15:01:04
 * @FilePath: /merchant-ssr/app/web/config/config.ts
 * @Description: file content
 */
import { defineConfig } from "umi"
import { join } from "path"
import pxToViewPort from "postcss-px-to-viewport"
import routes from "../routes"

const cwd = process.cwd()
const manifest = join(cwd, "config/manifest.json")

export default defineConfig({
	ssr: {
		mode: "stream",
		// forceInitial: true
	},
	inlineLimit: 1000, // 1k
	hash: true,
	ignoreMomentLocale: true,
	// chainWebpack(config: any) {
	// 	config.plugin("moment2dayjs").use("antd-dayjs-webpack-plugin")
	// },
	outputPath: "../public",
	title: "林选教育",
	favicon: "https://lx-static.highso.com.cn/frontend/favicon.ico",
	nodeModulesTransform: {
		type: "none",
	},
	routes,
	// theme: {
	// 	"primary-color": "#18BB94",
	// 	"brand-primary": "#18BB94",
	// },
	targets: {
		chrome: 49,
		firefox: 64,
		safari: 10,
		edge: 13,
		ios: 10,
	},
	// extraBabelPlugins: [
	// 	[
	// 		"import",
	// 		{
	// 			libraryName: "@ant-design/icons",
	// 			libraryDirectory: "", // defaults to 'lib'
	// 			camel2DashComponentName: false, // defaults to true
	// 		},
	// 	],
	// ],
	extraBabelPlugins: [
		[
			"import",
			{
		  libraryName: "antd-mobile",
		  style: 'css'
			},
		],
	],
	extraPostCSSPlugins: [
		pxToViewPort({
			unitToConvert: "rpx",
			viewportWidth: 750,
			unitPrecision: 3,
			viewportUnit: "vw",
			//fontViewportUnit: 'vw',
			selectorBlackList: [],
			minPixelValue: 1,
			mediaQuery: false,
		}),
	],
})
