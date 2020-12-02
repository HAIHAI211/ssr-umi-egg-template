import React from 'react'
import styles from './index.less'

const IndexPage = () => {
    return (
        <div className={styles.IndexPage}></div>
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