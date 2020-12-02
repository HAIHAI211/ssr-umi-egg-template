import React from 'react'
import styles from './index.less'

const IndexPage = () => {
    return (
        <div className={styles.indexPage}>首页 服务端渲染</div>
    )
}
export default IndexPage
IndexPage.getInitialProps = async ({ store, isServer, history, match, route, isMobile, supportWebp }: any) => {
    // console.log(ctx);
    // if (!isServer) {
    //   return
    // }
    // await store.dispatch({ type: 'test/test' })
    // const { test } = store.getState()
    return { isMobile, supportWebp }
}