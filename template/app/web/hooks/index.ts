/*
 * @Author: Harrison
 * @Date: 2021-01-02 17:30:14
 * @LastEditors: Harrison
 * @LastEditTime: 2021-01-04 14:38:51
 * @FilePath: /merchant-ssr/app/web/hooks/index.ts
 * @Description: file content
 */
import React, { useEffect } from "react"
import { checkLogin } from "@/http"
import { history } from "umi"

interface IUseWechatAuthProps {
	isWechat: boolean
}

export const useAuth = ({ isWechat }: IUseWechatAuthProps) => {
	const auth = async () => {
		try {
			const {
				code,
				data: { jwtToken, userId, openId },
			} = await checkLogin()
			console.log("jwtToken userId openId", jwtToken, userId, openId)
			// console.log("history", history)
			const wechatRedirectURI = getWechatRedirectURI(openId)
			if (wechatRedirectURI) {
				// !IS_PROD && alert(wechatRedirectURI)
				window.location.href = wechatRedirectURI
				return
			}
			if (jwtToken) {
				localStorage.setItem("jwtToken", jwtToken + "")
				gio && gio("setUserId", userId)
			}
		} catch (e) {
			console.log("login/current error", e)
		}
	}

	const getWechatRedirectURI = (openId: any) => {
		if (!isWechat || openId) return null
		console.log("准备微信重定向授权")
		const appId = history.location.query.fromAppId || APPID
		const redirect_uri = `${encodeURIComponent(
			window.btoa(window.location.origin + window.location.pathname)
		)}${window.location.search}`
		
		const result = `${ID_URL}/mp/jump/auth/${appId}/${redirect_uri}`

		if (IS_TEST) {
			alert('重定向地址' + result)
		}
		return result
	}

	useEffect(() => {
		auth()
	}, [])
}
