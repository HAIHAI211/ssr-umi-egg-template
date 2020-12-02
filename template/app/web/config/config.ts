/*
 * @Author: Harrison
 * @Date: 2020-11-03 15:51:25
 * @LastEditors: Harrison
 * @LastEditTime: 2020-12-02 11:43:11
 * @FilePath: /ssr-umi-egg-template/template/app/web/config/config.ts
 * @Description: file content
 */
import { defineConfig } from "umi"
import { join } from "path"
import pxToViewPort from "postcss-px-to-viewport"

const cwd = process.cwd()
const manifest = join(cwd, "config/manifest.json")

export default defineConfig({
	ssr: {
		devServerRender: true,
		mode: "stream",
		// forceInitial: true
	},
	inlineLimit: 1000, // 1k
	// dynamicImport: {
	// },
	hash: true,
	ignoreMomentLocale: true,
	// plugins: ["antd-dayjs-webpack-plugin"],
	chainWebpack(config) {
		config.plugin("moment2dayjs").use("antd-dayjs-webpack-plugin")
	},
	outputPath: "../public",
	// manifest: {
	// 	fileName: "../../config/manifest.json",
	// 	// 为 ''，不然会有两个 /
	// 	// publicPath: "/A/",
	// },
	// // publicPath: "/B/",
	title: "林选教育",
	favicon: "https://lx-static.highso.com.cn/frontend/favicon.ico",
	// locale: {
	// 	default: "zh-CN",
	// 	antd: false,
	// 	title: false,
	// 	baseNavigator: true,
	// 	baseSeparator: "-",
	// },
	// dva: {
	// 	immer: true,
	// 	// hmr: false,
	// },
	nodeModulesTransform: {
		type: "none",
	},
	routes: [// path: '/ck_cw/:productId?/:sourceCategory?',
		{ path: "/", component: "@/pages/index/index" }
	],
	theme: {
		"primary-color": "#18BB94",
		"brand-primary": "#18BB94",
	},
	targets: {
		ie: 10,
		chrome: 49,
		firefox: 64,
		safari: 10,
		edge: 13,
		ios: 10,
	},
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
