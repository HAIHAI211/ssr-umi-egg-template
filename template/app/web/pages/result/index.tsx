import React, { useEffect } from 'react'
import styles from './index.less'

import {
    fetchJson
} from '@/http'

import { parseJson, parseVersions, getVersion, parseComponent } from 'lx-json-component'

interface ISuccessPageProps extends ISSRPageProps {
    productInfo: {
        sourceCategory: string | number
        productId: string | number
        merchantId: string | number
    }
}

const SuccessPage = (props: ISuccessPageProps) => {
    console.log('是否服务端渲染', !!props.isServer)

    const gioSendEvent = (eventName: string) => {
        if (!props.productInfo) return
        const { sourceCategory, productId, merchantId } = props.productInfo
        console.log('gio事件触发', eventName)
        gio && gio("track", eventName, {
            sourceCategory,
            productId,
            merchantId,
            version: props.currentVersion
        });
    }

    useEffect(() => {
        gioSendEvent('giftsuccess_pageview')
    }, [props.productInfo])


    return (
        <div className={styles.page}>
            {
                props.jsonDataOfCurrentVersion ? parseComponent({
                    jsonData: props.jsonDataOfCurrentVersion,
                    env: props.isWechat ? 'wechat' : 'nowechat'
                }) : null
            }
        </div>
    )
}



export default SuccessPage
SuccessPage.getInitialProps = async (props: any) => {
    let { isServer, history, isMobile, isWechat, supportWebp } = props


    console.log('getInitialProps------start-----------')
    console.log('isServer', isServer)
    console.log('history', history)
    console.log('supportWebp', supportWebp)
    console.log('isMobile', isMobile)
    console.log('isWechat', isWechat)
    console.log('getInitialProps------end-----------')

    const { version: urlVersion, sourceCategory, productId, merchantId, phone, qrcodeUrl, content } = history.location.query

    let productInfo = sourceCategory ? {
        sourceCategory,
        productId,
        merchantId
    } : null
    let saleChanceInfo = {
        phone,
        qrcodeUrl,
        content
    }
    console.log('productInfo', productInfo)
    console.log('saleChanceInfo', saleChanceInfo)

    // todo:获取远程data.json
    // 获取json
    const json = await fetchJson({
        dir: '/givinglesson/success-page'
    })
    console.log('JSON', json)
    const jsonData = parseJson({
        json, supportWebp, data: {
            phone: saleChanceInfo.phone,
            qrcode: saleChanceInfo.qrcodeUrl,
            copyContent: saleChanceInfo.content
        }
    })
    const [versionInfos, versions] = parseVersions(jsonData)
    const currentVersion = getVersion({ versions, urlVersion });
    const jsonDataOfCurrentVersion = jsonData.find((item: any) => item.version === currentVersion)

    return { isServer, supportWebp, isMobile, isWechat, currentVersion, jsonData, jsonDataOfCurrentVersion, productInfo } as ISuccessPageProps
}