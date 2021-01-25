/*
 * @Author: Harrison
 * @Date: 2020-10-30 14:58:50
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-09 23:00:28
 * @FilePath: /clue/app/web/app.js
 * @Description: file content
 */

import {
  isMobile,
  isWechat,
  supportWebp,
  isBrowser,
} from "lx-json-component/src/utils";
import { Toast } from "antd-mobile";
import { history } from "umi";

if (isBrowser()) {
  Toast.config({
    duration: 1.5,
    mask: false,
  });
  if (!IS_PROD) {
    var vConsole = new VConsole();
  }
}

// 就算是ssr，该代码也只在服务端运行
const ssr = {
  modifyGetInitialPropsCtx: async (ctx) => {
    if (IS_DEV && ctx.isServer) {
      console.log("【【【开发服务器渲染】】】");
      ctx.supportWebp = true;
      ctx.isMobile = true;
      ctx.isWechat = false;
    }
    if (!ctx.isServer) {
      console.log("【【【服务端渲染异常后选择客户端渲染】】】");
      ctx.supportWebp = await supportWebp();
      ctx.isMobile = isMobile();
      ctx.isWechat = isWechat();
      ctx.history = history;
    }
    return ctx;
  },
};

export { ssr };
