import { defineConfig } from 'umi';
import { join } from 'path';

const cwd = process.cwd();
const manifest = join(cwd, 'config/manifest.json');

export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  ignoreMomentLocale: true,
  hash: true,
  outputPath: '../public',
  publicPath: "/public/",
	title: "林选",
	favicon: "https://lx-static.highso.com.cn/frontend/favicon.ico",
  manifest: {
    fileName: '../../config/manifest.json',
    // 为 ''，不然会有两个 /
    publicPath: '',
  },
  targets: {
		ie: 10,
		chrome: 49,
		firefox: 64,
		safari: 10,
		edge: 13,
		ios: 10
	},
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  dva: {
    immer: true,
    // hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }]
});
