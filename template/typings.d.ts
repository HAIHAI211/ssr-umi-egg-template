/*
 * @Author: Harrison
 * @Date: 2020-11-05 10:28:08
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-09 19:15:30
 * @FilePath: /ssr-umi-egg-template/template/typings.d.ts
 * @Description: file content
 */
declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module "*.json";
declare module "postcss-px-to-viewport";
declare module "jweixin-module"
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}

interface ISSRPageProps {
  isServer: boolean
  supportWebp: boolean
  isMobile: boolean
  isWechat: boolean

  currentVersion: string;
  jsonData: any
  jsonDataOfCurrentVersion: any
}

declare const API_URL: string
declare const SERVER_API_URL: string
declare const SERVER_IDENTITY_BASE_URL: string
declare const IDENTITY_BASE_URL: string
declare const APPID: string
declare const IS_PROD: boolean
declare const IS_TEST: boolean

declare const gio: any

declare const getNVCVal: any
declare const getNC: any
declare const NoCaptcha: any
declare const _nvc_nc: any
declare const getSC: any
declare const getLC: any
declare const nvcReset: any
