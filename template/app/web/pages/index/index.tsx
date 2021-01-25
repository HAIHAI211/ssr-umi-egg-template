import React, { useEffect } from "react";
import { Toast } from "antd-mobile";
import { history } from "umi";
import styles from "./index.less";

import {
  IFetchGivingLessonProductInfoReturn,
  fetchGivingLessonProductInfo,
  sendCode,
  fetchLogin,
  createOrder,
  fetchSaleChance,
  fetchJson,
} from "@/http";

import {
  parseJson,
  parseVersions,
  getVersion,
  parseComponent,
} from "lx-json-component";
import { useAuth } from "@/hooks";
import { useCsrInitialProps } from "lx-json-component/src/hooks";

interface IIndexPageProps extends ISSRPageProps {
  merchantpro: string | number;
  productInfo: IFetchGivingLessonProductInfoReturn;
}

const IndexPage = (ps: IIndexPageProps) => {
  const [props] = useCsrInitialProps(ps, IndexPage.getInitialProps);

  console.log("是否服务端渲染", props.isServer);
  console.log("是否是微信环境", props.isWechat);

  useAuth({
    isWechat: props.isWechat,
  });

  const gioSendEvent = (eventName: string) => {
    if (!props.productInfo) return;
    const { sourceCategory, productId, merchantId } = props.productInfo;
    console.log("gio事件触发", eventName);
    gio &&
      gio("track", eventName, {
        sourceCategory,
        productId,
        merchantId,
        version: props.currentVersion,
      });
  };

  const event = {
    onCodeClick: async (phone: string) => {
      const nvcVal = getNVCVal ? getNVCVal() : "";
      // console.log('nvcVal', nvcVal)
      await sendCode({
        phone,
        source: "studycard-" + props.merchantpro,
        riskyData: nvcVal,
      });
      Toast.info(`已发送验证码 请查收`);
    },
    onSubmit: async (formData: any) => {
      const { code, phone } = formData;
      console.log("表单数据", formData);
      try {
        // 登录
        const {
          data: { jwtToken, openId, userId, isNew },
        } = await fetchLogin({
          code,
          phone,
          source: "studycard-" + props.merchantpro,
          sourceCategory: props.productInfo.sourceCategory,
        });
        if (isNew) {
          gioSendEvent("user_register");
        }
        window.localStorage.setItem("jwtToken", jwtToken);

        // 创建订单
        const {
          data: { orderNo },
        } = await createOrder({
          isMerchant: true,
          merchantProId: props.merchantpro,
        });
        console.log("订单号 orderNo", orderNo);

        // 机会分配
        const { data: saleChanceInfo } = await fetchSaleChance({
          isMerchant: true,
          orderId: orderNo,
          sourceCategory: props.productInfo.sourceCategory,
        });
        console.log("机会分配 result", saleChanceInfo);
        // 跳转到成功页
        console.log("saleChanceInfo", saleChanceInfo);
        console.log("productInfo", props.productInfo);

        // sourceCategory, productId, merchantId, phone, qrcodeUrl, content
        const { sourceCategory, productId, merchantId } = props.productInfo;
        const { qrcodeUrl, content } = saleChanceInfo;

        history.push({
          pathname: "/moduleA/success",
          query: {
            // saleChanceInfo: JSON.stringify(saleChanceInfo),
            // productInfo: JSON.stringify(props.productInfo)
            sourceCategory,
            productId,
            merchantId,
            qrcodeUrl,
            content,
            phone: saleChanceInfo.phone,
          },
        });
      } catch (e) {
        console.log("submit 报错", e);
      }
    },
  };

  useEffect(() => {
    gioSendEvent("merchantgift_pageview");
  }, [props.productInfo]);

  return (
    <div className={styles.page}>
      {props.jsonDataOfCurrentVersion
        ? parseComponent({
            jsonData: props.jsonDataOfCurrentVersion,
            event,
            env: props.isWechat ? "wechat" : "nowechat",
          })
        : null}
    </div>
  );
};

export default IndexPage;
IndexPage.getInitialProps = async (props: any) => {
  const {
    store,
    isServer,
    history,
    match,
    route,
    isMobile,
    isWechat,
    supportWebp,
  } = props;

  console.log("getInitialProps------start-----------");
  console.log("isServer", isServer);
  console.log("supportWebp", supportWebp);
  console.log("getInitialProps------end-----------");

  // 从url获取merchantpro
  const { merchantpro, version: urlVersion } = history.location.query;
  // 获取json
  const json = await fetchJson({
    dir: "/givinglesson/index-page",
  });
  // console.log('JSON', json)
  // 获取商品信息
  if (merchantpro && json) {
    console.log("merchantpro", merchantpro);
    try {
      const { data: productInfo } = await fetchGivingLessonProductInfo(
        merchantpro
      );
      console.log("商品id", productInfo.productId);
      // return props
      const jsonData = parseJson({
        json,
        supportWebp,
        data: {
          productId: productInfo.productId,
          env: isWechat ? "wechat" : "nowechat",
          runEnv: IS_PROD ? "prod" : "test",
        },
      });
      const [versionInfos, versions] = parseVersions(jsonData);
      const currentVersion = getVersion({ versions, urlVersion });
      const jsonDataOfCurrentVersion = jsonData.find(
        (item: any) => item.version === currentVersion
      );
      return {
        isServer,
        supportWebp,
        isMobile,
        isWechat,
        currentVersion,
        // jsonData,
        jsonDataOfCurrentVersion,
        merchantpro,
        productInfo,
      };
    } catch (e) {
      console.log("获取商品信息报错", e);
      return { isServer, supportWebp, isMobile, isWechat };
    }
  }

  return { isServer, supportWebp, isMobile, isWechat };
};
