export default {
	namespace: "test",
	state: {
		title: null,
	},

	effects: {},

	reducers: {
		test(state, { payload }) {
			state.title = "欢迎使用 林选ssr项目模板"
		},
	},
}
