
/*
 * @Author: Harrison
 * @Date: 2020-07-17 14:32:06
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-08 10:07:43
 * @Description: http请求接口页
 */

import { HTTP, ORDER_STATUS, serviceDeconstruct } from "./config"
import qs from "qs"
import { isBrowser } from "umi"
import axios from 'axios'




/**
 * @description: 获取json
 * @param {*}
 * @return {*}
 */
interface IFetchJsonProps {
	dir: string
}
export async function fetchJson({dir}: IFetchJsonProps) {
	try {
		const d = new Date()
		d.setMinutes(0)
		d.setSeconds(0)
		const timestamp = d.getTime()
		const result = await axios.get(`/${IS_PROD ? 'prod' : 'test'}/origin${dir}/data.json?t=${timestamp}`, {
			baseURL: 'https://lx-static.highso.com.cn/frontend/merchant'
		})
		console.log('json内容', result)
		if (!result || !result.data) return null
		return result.data
	} catch(e) {
		return null
	}

}


/**
 * @description: 检查登录
 * @param {*}
 * @return {*}
 */
interface ICheckLoginReturn {
	jwtToken: string|number|undefined;
	openId: string|number|undefined;
	userId: string|number|undefined;
}
export function checkLogin(): Promise<IReturn<ICheckLoginReturn>> {
	return serviceDeconstruct(
		HTTP({
			method: "GET",
			baseURL: isBrowser() ? IDENTITY_BASE_URL : SERVER_IDENTITY_BASE_URL,
			url: "/login/current",
		})
	)
}

interface IReturn<T> {
	code: number
	data: T
}

/**
 * @description: 获取商品信息(通用)
 * @param {*}
 * @return {*}
 */

export function fetchProductInfo(productId: string) {
	return serviceDeconstruct(
		HTTP({
			method: "GET",
			url: "/product/info/get",
			params: {
				id: productId,
			},
		})
	)
}

/**
 * @description: 获取商品信息(赠课专用)
 * @param {*}
 * @return {*}
 */
export interface IFetchGivingLessonProductInfoReturn {
	sourceCategory: string
	productName: string
	price: string | number
	productId: string | number
	merchantId: string | number
}

export function fetchGivingLessonProductInfo(
	merchantpro: string
): Promise<IReturn<IFetchGivingLessonProductInfoReturn>> {
	return serviceDeconstruct(
		HTTP({
			method: "GET",
			url: "/product/merchant/info/get",
			params: {
				id: merchantpro,
			},
		})
	)
}

/**
 * @description: 发送验证码
 * @param {type}
 * @return:
 */
type ISendCodeProps = {
	phone: string
	[key: string]: any
}

export async function sendCode(props: ISendCodeProps) {
	const { code, data } = await serviceDeconstruct(
		HTTP({
			method: "POST",
			baseURL: isBrowser() ? IDENTITY_BASE_URL : SERVER_IDENTITY_BASE_URL,
			url: "/check/sms/code/send",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			data: qs.stringify({
				...props,
				adUrl: encodeURI(window.location.href),
			}),
		}),
		// new Promise((resolve, reject) => {
		// 	setTimeout(() => {
		// 		reject('发送太频繁')
		// 	}, 500)
		// }),
		{
			successCodes: [0, 100, 200, 600, 700, 800, 900],
		}
	)

	return new Promise((resolve, reject) => {
		if (code == 400) {
			//唤醒滑动验证
			getNC().then(function () {
				NoCaptcha.upLang("cn", {
					LOADING: "加载中...", //加载
					SLIDER_LABEL: "请向右滑动验证", //等待滑动
					CHECK_Y: "验证通过", //通过
					ERROR_TITLE: "非常抱歉，这出错了...", //拦截
					CHECK_N: "验证未通过", //准备唤醒二次验证
					OVERLAY_INFORM: "经检测你当前操作环境存在风险，请输入验证码", //二次验证
					TIPS_TITLE: "验证码错误，请重新输入", //验证码输错时的提示
				})
				_nvc_nc.reset()
			})
		} else if (code == 600) {
			//唤醒刮刮卡
			getSC().then(function () {})
		} else if (code == 700) {
			//唤醒问答验证码
			getLC()
		} else if (code == 100 || code == 200) {
			//注册成功
			nvcReset()
			console.log("register success!")
			resolve("code send success")
		} else if (code == 800 || code == 900) {
			//直接拦截
			nvcReset()
			console.log("register failed!")
		} else if (code === 0) {
			resolve("code send success")
		}
		reject("nvc code failed")
	})
}

/**
 * @description: 登录接口
 * @param {type}
 * @return:
 */
interface IFetchLoginProps {
	phone: string
	code: string
	sourceCategory: string | number
	source: string
}
interface IFetchLoginReturn {
	jwtToken: string
	openId: string
	userId: string
	isNew: boolean
}
export function fetchLogin(loginProps: IFetchLoginProps): Promise<IReturn<IFetchLoginReturn>> {
	return serviceDeconstruct(
		HTTP({
			method: "POST",
			baseURL: isBrowser() ? IDENTITY_BASE_URL : SERVER_IDENTITY_BASE_URL,
			url: "/login/sms-login",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			data: qs.stringify({
				...loginProps,
				adUrl: encodeURI(window.location.href),
			}),
		})
	)
}

/**
 * @description: 创建订单
 * @param {type}
 * @return:
 */
type ICreateOrderProps =
	| {
			isMerchant: true
			merchantProId: string | number
	  }
	| {
			isMerchant: false
			productId: string
			source: string
	  }
export function createOrder(props: ICreateOrderProps) {
	const { isMerchant, ...otherProps } = props
	const url = isMerchant ? "/order/info/create/merchant" : "/order/info/create"
	return serviceDeconstruct(
		HTTP.post(url, {
			...otherProps,
			adUrl: encodeURI(window.location.href),
		}),
		{
			successCodes: [0, 10201],
		}
	)
}

/**
 * @description: 机会分配接口
 * @param {type}
 * @return:
 */
type IFetchSaleChanceProps =
	| {
			isMerchant: true
			orderId: string
			sourceCategory: string
	  }
	| {
			isMerchant: false
			orderId: string
			source: string
	  }
export interface IFetchSaleChanceReturn {
	content: string
	phone: string
	qrcodeUrl: string
	targetKey: string
	targetType: string
}
export async function fetchSaleChance(
	props: IFetchSaleChanceProps
): Promise<IReturn<IFetchSaleChanceReturn>> {
	const { isMerchant, ...otherProps } = props
	return serviceDeconstruct(
		HTTP.get("/sale-chance/get", {
			params: {
				...otherProps,
				adUrl: encodeURI(window.location.href),
			},
		})
	)
}

/**
 * @description: 添加用户动作日志
 * @param {type}
 * @return:
 */
export function customerActionLog(detail: string) {
	console.log("上报的用户留言", detail)
	return serviceDeconstruct(
		HTTP.post("/customer/action/log/create", {
			bizKey: "form-note",
			detail,
		})
	)
}
