import { defineConfig } from "umi";
import NOT_PROD_COMMON_CONFIG from "./common/not-prod";
const { ID_URL_TEST, API_URL_TEST, APP_ID_TEST } =require("lx-json-component/src/constants")

export default defineConfig({
  ssr: false,
  define: {
    ID_URL: ID_URL_TEST,
    API_URL: API_URL_TEST,
    APPID: APP_ID_TEST,
    IS_TEST: true,
    IS_CSR: true,
    RUN_ENV: "csrtest"
  },
  ...NOT_PROD_COMMON_CONFIG
});