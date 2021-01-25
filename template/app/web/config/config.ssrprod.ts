import { defineConfig } from "umi";
import PROD_COMMON_CONFIG from "./common/prod";
const {
  API_URL_PROD,
  APP_ID_PROD,
  ID_URL_PROD,
  SERVER_ID_URL_PROD,
  SERVER_API_URL_PROD,
} = require("lx-json-component/src/constants");

const publicPath = "//lx-cdn.highso.com.cn/merchant-ssr/";
export default defineConfig({
  manifest: {
    publicPath,
  },
  publicPath,
  define: {
    ID_URL: ID_URL_PROD,
    API_URL: API_URL_PROD,
    SERVER_ID_URL: SERVER_ID_URL_PROD,
    SERVER_API_URL: SERVER_API_URL_PROD,
    APPID: APP_ID_PROD,
    IS_PROD: true,
    IS_CSR: false,
    RUN_ENV: "ssrprod",
  },
  ...PROD_COMMON_CONFIG
});
