/*
 * @Author: Harrison
 * @Date: 2020-11-05 10:28:08
 * @LastEditors: Harrison
 * @LastEditTime: 2020-11-27 10:33:50
 * @FilePath: /lx-gw/typings.d.ts
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
