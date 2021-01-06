import React from 'react'
import { Toast } from 'antd-mobile'
import styles from './index.less'

import {
    IFetchGivingLessonProductInfoReturn,
    fetchGivingLessonProductInfo,
    sendCode,
    fetchLogin,
    createOrder,
    fetchSaleChance,
    fetchJson
} from '@/http'

import { parseJson, parseVersions, getVersion, parseComponent } from 'lx-json-component'
import { useAuth } from '@/hooks'

interface IIndexPageProps extends ISSRPageProps {
    merchantpro: string | number
    productInfo: IFetchGivingLessonProductInfoReturn
}
const IndexPage = (props: IIndexPageProps) => {

    console.log('是否服务端渲染', props.isServer)
    console.log('是否是微信环境', props.isWechat)

    useAuth({
        isWechat: props.isWechat
    })

    const gioSendEvent = (eventName: string) => {
        if (!props.productInfo) return
        // const { sourceCategory, productId, merchantId } = props.productInfo
        console.log('gio事件触发', eventName)
        gio && gio("track", eventName, {
            // sourceCategory,
            // productId,
            // merchantId,
            version: props.currentVersion
        });
    }

    const event = {
        onCodeClick: async (phone: string) => {
            const nvcVal = getNVCVal ? getNVCVal() : ""
            // console.log('nvcVal', nvcVal)
            await sendCode({
                phone,
                source: 'studycard-' + props.merchantpro,
                riskyData: nvcVal,
            })
            Toast.info(`已发送验证码 请查收`)
        },
        onSubmit: async (formData: any) => {
            const { code, phone } = formData
            console.log('表单数据', formData)
            try {
                // 登录
                const { data: { jwtToken, openId, userId, isNew } } = await fetchLogin({
                    code,
                    phone,
                    source: 'studycard-' + props.merchantpro,
                    sourceCategory: props.productInfo.sourceCategory
                })
                if (isNew) {
                    gioSendEvent('user_register')
                }
                window.localStorage.setItem('jwtToken', jwtToken)

                // 创建订单
                const { data: { orderNo } } = await createOrder({
                    isMerchant: true,
                    merchantProId: props.merchantpro
                })
                console.log('订单号 orderNo', orderNo)

                // 机会分配
                const { data: saleChanceInfo } = await fetchSaleChance({
                    isMerchant: true,
                    orderId: orderNo,
                    sourceCategory: props.productInfo.sourceCategory
                })
                console.log('机会分配 result', saleChanceInfo)
                // 跳转到成功页
                console.log('saleChanceInfo', saleChanceInfo)
                console.log('productInfo', props.productInfo)

                // sourceCategory, productId, merchantId, phone, qrcodeUrl, content
                const { sourceCategory, productId, merchantId } = props.productInfo
                const { qrcodeUrl, content } = saleChanceInfo

                history.push({
                    pathname: '/moduleA/success',
                    query: {
                        // saleChanceInfo: JSON.stringify(saleChanceInfo),
                        // productInfo: JSON.stringify(props.productInfo)
                        sourceCategory,
                        productId,
                        merchantId,
                        qrcodeUrl,
                        content,
                        phone: saleChanceInfo.phone
                    },
                });
            } catch (e) {
                console.log('submit 报错', e)
            }

        }
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {
                props.jsonDataOfCurrentVersion ? parseComponent({
                    jsonData: props.jsonDataOfCurrentVersion,
                    event,
                    env: props.isWechat ? 'wechat' : 'nowechat'
                }) : null
            }
        </div>
    )
}
export default IndexPage
IndexPage.getInitialProps = async ({ store, isServer, history, match, route, isMobile, supportWebp }: any) => {

    return { isMobile, supportWebp }
}