/*
 * @Author: Harrison
 * @Date: 2020-10-22 19:45:59
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-08 10:07:18
 * @FilePath: /ssr-umi-egg-template/template/app/web/http/config.ts
 * @Description: http通用配置
 */
import axios from 'axios';
import { isBrowser } from 'umi'
import { Toast } from 'antd-mobile';


const ORDER_STATUS = {
  ORDER_PAID: 10201,
  NOT_FOUND_RECORD: 10003,
  ORDER_UN_PAID: 10202,
};


/**
 * API地址
 */

const HTTP = axios.create({
  baseURL: isBrowser() ? API_URL : SERVER_API_URL,
  headers: {
    Authorization: '',
  },
  withCredentials: true,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function(status) {
    return status >= 200 && status < 300; // default
  },
});

// Add a request interceptor
HTTP.interceptors.request.use(
  async function(config) {
    // Do something before request is sent
    const jwtToken = isBrowser() ? localStorage.getItem('jwtToken') : ''
    console.log('cache jwtToken', jwtToken)
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: jwtToken,
      },
    };
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
HTTP.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // TODO 登录失效
    if (response && response.data && response.data.code === -1001) {
      isBrowser() && localStorage.removeItem('jwtToken')
    }
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

// 业务解构
// 如果http-code为200 && service-code为0 返回res.data.data.data
// 否则报异常

interface Options {
  successCodes?: number[];
  shouldDeconstruct?: boolean;
  suitTable?: boolean;
}

const serviceDeconstruct = async (axiosPromise, options: Options = {}) => {
  // 如果不想解构，就正常返回
  options = {
    successCodes: [0],
    shouldDeconstruct: true,
    suitTable: false,
    ...options,
  };
  if (!options.shouldDeconstruct) return axiosPromise;
  try {
    const res = await axiosPromise;
    // console.log('promise 请求 结果', res)
    if (res && res.data && options.successCodes.includes(res.data.code)) {
      const { code, data } = res.data;
      if (!options.suitTable) return { code, data };
      if (Array.isArray(data)) {
        console.log('ttt', {
          code,
          data,
          total: data.length,
          success: true,
        });
        return {
          code,
          data,
          total: data.length,
          success: true,
        };
      } else if (Array.isArray(data.items)) {
        return {
          code,
          data: data.items,
          total: data.totalNum,
          success: true,
        };
      }
      return {
        code,
        data: [],
        total: 0,
        success: true,
      };
    } else {
      throw new Error(res.data.msg);
    }
  } catch (e) {
    isBrowser() && Toast.info(e.message || e.toString());
    throw e;
  }
};

export { HTTP, ORDER_STATUS, serviceDeconstruct };
