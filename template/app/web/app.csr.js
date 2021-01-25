/*
 * @Author: Harrison
 * @Date: 2020-10-30 14:58:50
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-09 23:00:28
 * @FilePath: /clue/app/web/app.js
 * @Description: file content
 */

import { Toast } from "antd-mobile"

Toast.config({
	duration: 1.5,
	mask: false,
})

if (!IS_PROD) {
	var vConsole = new VConsole();
}