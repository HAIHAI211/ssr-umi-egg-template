// const requireContext = require('require-context')

const requireContext = require.context(".", true, /\.(png|jpe?g|gif|webp)(\?.*)?$/)

const map: { [key: string]: any } = {}
requireContext.keys().forEach((key: string) => {
	const newkey: string = key.replace(/^\.\//, "@/assets/")
	map[newkey] = requireContext(key)
})

const requireImg = (src: string, supportWebp?: boolean) => {
	const key = !supportWebp ? src : src + ".webp"
	return map[key]
}

const requireBgImg = (src: string, supportWebp?: boolean) => {
	// return `url('~${src}${!supportWebp ? "" : ".webp"}')`
	return `url(${requireImg(src, supportWebp)})`
}

export default requireImg
export { requireBgImg }

// console.log('projectImgs', projectImgs)

// files.keys().forEach((key:any) => {
//     // const name = files[key].default.name
//     console.log(`key=${key},file=${files(key)}`)
// })
