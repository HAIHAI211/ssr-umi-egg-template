import { defineConfig } from "umi";
const { ID_URL_TEST, API_URL_TEST, APP_ID_TEST } = require("lx-json-component/src/constants")
import NOT_PROD_COMMON_CONFIG from "./common/not-prod"

export default defineConfig({
  ssr: {
      devServerRender: true
  },
  define: {
    ID_URL: ID_URL_TEST,
    API_URL: API_URL_TEST,
    SERVER_ID_URL: ID_URL_TEST,
    SERVER_API_URL: API_URL_TEST,
    APPID: APP_ID_TEST,
    IS_DEV: true,
    IS_CSR: false,
    RUN_ENV: "ssrlocal"
  },
  ...NOT_PROD_COMMON_CONFIG
});