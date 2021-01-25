import { defineConfig } from "umi";
import { join } from "path";
import pxToViewPort from "postcss-px-to-viewport";
import routes from "../routes";

const cwd = process.cwd();
const manifest = join(cwd, "config/manifest.json");
const publicPath = "/";

console.log('UMI_ENV XX', process.env.UMI_ENV)
const isProd = /prod/i.test(process.env.UMI_ENV || '')

export default defineConfig({
  ssr: {
    mode: "stream",
    // removeWindowInitialProps: true
  },
  inlineLimit: 1000, // 1k
  hash: true,
  ignoreMomentLocale: true,
  outputPath: "../public",
  title: "林选教育",
  favicon: "https://lx-static.highso.com.cn/frontend/favicon.ico",
  nodeModulesTransform: {
    type: "all",
  },
  routes,
  publicPath,
  manifest: {
    fileName: "../../config/manifest.json",
    publicPath,
  },
  define: {
    SERVER_ID_URL: "",
    SERVER_API_URL: "",
    IS_DEV: false,
    IS_TEST: false,
    IS_PROD: false,
  },
  targets: {
    chrome: 58,
    firefox: 64,
    safari: 10,
    edge: false,
    ios: 10,
    ie: false,
  },
  extraBabelPlugins: [
    [
      "import",
      {
        libraryName: "antd-mobile",
        style: "css",
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
  copy: ["/mp-verify/MP_verify_Iw2tx3AIwvMBUhYn.txt"],
  headScripts: [
    { // gio
      content: `
          !function (e, t, n, g, i) { e[i] = e[i] || function () { (e[i].q = e[i].q || []).push(arguments) }, n = t.createElement("script"), tag = t.getElementsByTagName("script")[0], n.async = 1, n.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + g, tag.parentNode.insertBefore(n, tag) }(window, document, "script", "assets.giocdn.com/2.1/gio.js", "gio");
          gio('init', '983d2a99c19ed1d3', {});
          gio('send');
          `,
    },
  ],
  scripts: [
    // nvc 人机验证
    `window.NVC_Opt = {
      appkey: "${isProd ? 'FFFF0N0N00000000978B' : 'CF_APP_1'}",
      scene:'nvc_message_h5',
      isH5:true,
      popUp:false,
      renderTo:'#captcha',
      nvcCallback:function(data){
      },
      trans: {"key1": "code0","nvcCode":400},
      language: "cn",
      //滑动验证长度配置
      customWidth: '100%',
      //刮刮卡配置项
      width:300,
      height:100,
      elements: [
        '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png',
        '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png'
      ], 
      bg_back_prepared: '//img.alicdn.com/tps/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png',
      bg_front: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefk5w+ruswAAAAfSURBVFjD7cExAQAAAMKg9U9tCU+gAAAAAAAAAIC3AR+QAAFPlUGoAAAAAElFTkSuQmCC',
      obj_ok: '//img.alicdn.com/tfs/TB1rmyTltfJ8KJjy0FeXXXKEXXa-50-74.png',
      bg_back_pass: '//img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png',
      obj_error: '//img.alicdn.com/tfs/TB1q9yTltfJ8KJjy0FeXXXKEXXa-50-74.png',
      bg_back_fail: '//img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png',
      upLang:{"cn":{
        _ggk_guide: "请在屏幕上滑动，刮出两面盾牌",
        _ggk_success: "恭喜您成功刮出盾牌<br/>继续下一步操作吧",
        _ggk_loading: "加载中",
        _ggk_fail: ['呀，盾牌不见了<br/>请', "javascript:NoCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题'],
        _ggk_action_timeout: ['我等得太久啦<br/>请', "javascript:NoCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题'],
        _ggk_net_err: ['网络实在不给力<br/>请', "javascript:NoCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题'],
        _ggk_too_fast: ['您刮得太快啦<br/>请', "javascript:NoCaptcha.reset()", '再来一次', '或', "http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN", '反馈问题']
        }
      }
    }`,
    "https://g.alicdn.com/sd/nvc/1.1.112/guide.js",
  ],
});
