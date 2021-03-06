/*
 * @Author: Harrison
 * @Date: 2020-12-23 12:05:37
 * @LastEditors: Harrison
 * @LastEditTime: 2020-12-23 12:23:19
 * @FilePath: /merchant-ssr/app/controller/home.js
 * @Description: file content
 */
const { Controller } = require('egg')

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx)
    try {
      this.serverRender = require('../public/umi.server')
    } catch(e) {
      console.error("serverRender require error",e)
    }
  }
  async index() {
    const { ctx, app } = this
    global.host = `${ctx.request.protocol}://${ctx.request.host}`
    global.href = ctx.request.href;
    // global._cookies = ctx.helper.parseCookie(ctx);
    // global._navigatorLang = ctx.helper.parseNavLang(ctx);
    global._isMobile = ctx.helper.isMobile(ctx)
    global._supportWebp = ctx.helper.supportWebp(ctx);
    global._isWechat = ctx.helper.isWechat(ctx);
    /**
     *  这里可以根据自己的环境配置修改，
     *  规则就是开发环境需要删除require缓存
     *  重新load文件
     *
     */

    const isDev = app.config.env != 'prod';
    if (isDev) {
      delete require.cache[require.resolve('../public/umi.server')]
    }

    // 先走 eggjs 的v iew 渲染
    // const htmlTemplate = await ctx.view.render('index.html')

    // 将 html 模板传到服务端渲染函数中
    const { error, html } = await this.serverRender({
      path: ctx.url,
      getInitialPropsCtx: {
        isMobile: global._isMobile,
        supportWebp: global._supportWebp,
        isWechat: global._isWechat
      },
      // htmlTemplate,
    })

    if (error) {
      ctx.logger.error(
        '[SSR ERROR] 渲染报错，切换至客户端渲染',
        error,
        ctx.url,
      )
    }
    ctx.type = 'text/html'
    ctx.status = 200
    ctx.body = html
  }
}

module.exports = HomeController
