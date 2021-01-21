exports.isMobile = (ctx) => {
	const source = ctx.get("user-agent") || ""
	let isMobile = false
	if (/mobile|android|iphone|ipad|phone/i.test(source)) {
		isMobile = true
	}
	return isMobile
}

exports.supportWebp = (ctx) => {
	const accept = ctx.get("accept") || ""
	const ua = ctx.get("user-agent") || ""
	console.log("【Accept】", accept)
	console.log("【user-agent】", ua)
  let supportWebp = false
  // accept里含有image/webp 或 iphone os>= 14 则支持webp
	if (/webp/i.test(accept) || getIphoneOsVersion(ctx) >= 14) {
		supportWebp = true
	}
	return supportWebp
}

exports.isWechat = (ctx) => {
	const ua = ctx.get("user-agent") || ""
	return (/micromessenger/i.test(ua))
}

const getIphoneOsVersion = (ctx) => {
	const ua = ctx.get("user-agent") || ""
	if (/iphone\s+os\s+(\S+)\s+.*/i.test(ua)) {
		const version = RegExp.$1
		console.log("iphone的ios版本", version)
		return parseInt(version)
	}
	return ""
}

exports.parseCookie = (ctx) => {
	let cookies = ctx.get("cookie")
	if (!cookies) {
		return []
	}
	cookies = cookies.split(";")
	const res = {}
	for (const item of cookies) {
		const kv = item.split("=")
		if (kv && kv.length > 0) {
			res[kv[0].trim()] = decodeURIComponent(kv[1])
		}
	}
	return res
}

exports.parseNavLang = (ctx) => {
	// 服务端无法获取navigator.language，所以只能通过Accept-Language来判断浏览器语言。
	let navigatorLang
	const clientLang = ctx.get("Accept-Language")
	if (clientLang.startsWith("zh")) {
		navigatorLang = "zh-CN"
	} else if (clientLang.startsWith("en")) {
		navigatorLang = "en-US"
	}
	return navigatorLang
}
