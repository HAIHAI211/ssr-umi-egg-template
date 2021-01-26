const publicPath = "//lx-cdn.highso.com.cn/{{cdn}}/";
const PROD_COMMON_CONFIG = {
  manifest: {
    publicPath,
  },
  publicPath,
  scripts: [
    {
      // arms
      content: `
      !(function(c,b,d,a){c[a]||(c[a]={});c[a].config={pid:"{{armspid}}",appType:"web",imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",sendResource:true,enableLinkTrace:true,behavior:true};
      with(b)with(body)with(insertBefore(createElement("script"),firstChild))setAttribute("crossorigin","",src=d)
      })(window,document,"https://retcode.alicdn.com/retcode/bl.js","__bl");
              `,
    },
  ],
};

export default PROD_COMMON_CONFIG;
