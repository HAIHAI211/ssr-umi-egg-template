import { defineConfig } from "umi";
import PROD_COMMON_CONFIG from "./common/prod";
const {
  API_URL_PROD,
  APP_ID_PROD,
  ID_URL_PROD,
} = require("lx-json-component/src/constants");

export default defineConfig({
  ssr: false,
  define: {
    ID_URL: ID_URL_PROD,
    API_URL: API_URL_PROD,
    APPID: APP_ID_PROD,
    IS_PROD: true,
    IS_CSR: true,
    RUN_ENV: "csrprod",
  },
  ...PROD_COMMON_CONFIG,
});
