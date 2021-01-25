# 基于umi & eggjs 生成ssr前端模板

## app/view/index.html 和 app/web/pages/document.ejs的区别
答：前者是eggjs ssr使用，后者是本地 dev ssr使用

# 包裁剪
1. 考虑到营销页用于移动端，targets去掉ie兼容
2. 不使用antd、umi-request、locale、models，故移除preset-react插件集
- 删除preset-react依赖
- babel-plugin-import 按需引入antd-mobile(toast)
- 屏蔽antd-dayjs-webpack-plugin

# tree shaking
现象
1. hook.ts里import jweixin, export a,b;其中a真正用到jweixin，b没有用到jweixin；然后暴露出去后，真正被页面用到的是b；观察到jweixin被加入依赖；如果没有export a，那么jweixin不会被依赖；如果将a单独一个文件声明，则jweixin不会被依赖
   

## IIFE
- 函数声明不可以立即执行，但函数表达式可以
- !functionxx(){}() 和(functionxx(){})()都是通过将函数声明转为表达式并立即执行来实现模块化的
- 因为函数声明提升，而表达式不会，所以更好的模块化。

## csr & ssr

${buildType}-${env}

csr IS_CSR=true isBrowser=true

    本地 IS_DEV=true
    测试 IS_TEST=true
    生产 IS_PROD = true

ssr IS_CSR=false

    本地 local
        dev-server 
        egg-server 
            server render => isServer=true isBrowser=true
    测试 test、 生产 prod
        egg-server
            server render => isServer=true isBrowser=false
            client render => isServer=false isBrowser=true
