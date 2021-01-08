/*
 * @Author: Harrison
 * @Date: 2021-01-06 13:23:12
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-08 10:12:14
 * @FilePath: /ssr-umi-egg-template/template/app/web/routes/index.ts
 * @Description: file content
 */

const routes: any = [
	{ path: "/", component: "@/pages/index" },
	{ path: "/moduleA", component: "@/pages/index" },
	{ path: "/moduleA/success", component: "@/pages/result" },
]

export default routes
