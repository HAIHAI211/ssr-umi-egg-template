import { defineConfig } from "umi";
import NOT_PROD_COMMON_CONFIG from "./common/not-prod";
const { ID_URL_TEST, API_URL_TEST, APP_ID_TEST } = require("lx-json-component/src/constants")

export default defineConfig({
  ssr: false,
  define: {
    ID_URL: "/identity",
    API_URL: "/api",
    APPID: APP_ID_TEST,
    IS_DEV: true,
    IS_CSR: true,
    RUN_ENV: "csrdev"
  },
  proxy: {
    "/identity": {
      target: ID_URL_TEST,
      changeOrigin: true,
      pathRewrite: { "^/identity": "" },
    },
    "/api": {
      target: API_URL_TEST,
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
  ...NOT_PROD_COMMON_CONFIG
});