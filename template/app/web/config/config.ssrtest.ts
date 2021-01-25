import { defineConfig } from "umi";
import NOT_PROD_COMMON_CONFIG from "./common/not-prod"
const {
  ID_URL_TEST,
  API_URL_TEST,
  APP_ID_TEST,
  SERVER_API_URL_TEST,
  SERVER_ID_URL_TEST,
} = require("lx-json-component/src/constants");



export default defineConfig({
  define: {
    ID_URL: ID_URL_TEST,
    API_URL: API_URL_TEST,
    SERVER_ID_URL: SERVER_ID_URL_TEST,
    SERVER_API_URL: SERVER_API_URL_TEST,
    APPID: APP_ID_TEST,
    IS_TEST: true,
    IS_CSR: false,
    RUN_ENV: "ssrtest",
  },
  ...NOT_PROD_COMMON_CONFIG
});
