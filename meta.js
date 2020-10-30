module.exports = {
	helpers: {
		if_or(v1, v2, options) {
			if (v1 || v2) {
				return options.fn(this)
			}
			return options.inverse(this)
		},
	},
	prompts: {
		name: {
			type: "string",
			required: true,
			message: "项目名",
		},
		description: {
			type: "string",
			required: false,
			message: "项目描述",
			default: "ssr-umi-egg项目",
		},
		author: {
			type: "string",
			message: "作者",
			required: false,
			default: "",
		},
		cdn: {
			type: "string",
			message: "生产环境publicPath",
			required: false,
			default: "//lx-cdn.highso.com.cn/lx-gw/",
		},
	},
}
