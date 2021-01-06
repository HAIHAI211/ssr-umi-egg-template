/*
 * @Author: Harrison
 * @Date: 2020-11-05 10:28:08
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-06 11:19:17
 * @FilePath: /ssr-umi-egg-template/template/typings.d.ts
 * @Description: file content
 */
declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module "*.json";
declare module "postcss-px-to-viewport";
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
