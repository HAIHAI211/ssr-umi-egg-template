"use strict";
const path = require("path");

module.exports = (appInfo, appConfig = {}) => {
  const assetsDir =
    (appConfig.assets && appConfig.assets.assetsDir) || "app/web";
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1513765449219_5858";

  // add your config here
  config.middleware = [];

  console.log("egg环境", appInfo.env);
  const isProd = appInfo.env === "prod";

  config.assets = {
    devServer: {
      command: "umi dev",
      env: {
        APP_ROOT: path.join(appInfo.baseDir, assetsDir),
        PORT: "{port}",
        BROWSER: "none",
        ESLINT: "none",
        SOCKET_SERVER: "http://127.0.0.1:{port}",
        PUBLIC_PATH: "http://127.0.0.1:{port}",
      },
    },
  };

  config.static = {
    prefix: '/'
  }

  config.view = {
    mapping: {
      ".html": "nunjucks",
    },
    defaultViewEngine: "nunjucks",
  };

  config.proxy = true;

  config.security = {
    csrf: false,
    xframe: {
      enable: false,
    },
  };

  config.alinode = {
    server: "wss://agentserver.node.aliyun.com:8080",
    appid: isProd ? "87364" : "87363",
    secret: isProd
      ? "2b60c1e903366fe44c67aea10aadba90cfe323e9"
      : "bbb3a3917530a79e9f73dedc0cdcde36f3023e74",
    agentidMode: "IP"
    // logdir:
    //   "Node.js 性能平台日志输出地址绝对路径，与 NODE_LOG_DIR 保持一致。如：/tmp/",
    // error_log: [
    //   "您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个",
    //   "例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log",
    //   "不更改 Egg 默认日志输出路径可不配置本项目",
    // ],
    // agentidMode: isProd ? "112.126.123.216" : "101.200.182.224",
  };

  return config;
};
