function getMeta(vm) {
	const { meta } = vm.$options
	if (meta) {
		return typeof meta === "function"
		? meta.call(vm)
		: meta
	} else {
		return null
	}
}

const serverMetaInfoMixin = {
	created() {
		const meta = getMeta(this)
		if (meta) {
			this.$root.$options.ssrContext.meta = meta
		}
	}
}

const clientMetaInfoMixin = {
	mounted() {
		const meta = getMeta(this)
		if (meta) {
			document.title = `${meta.title} - SiteName`
		}
	}
}

export default process.env.VUE_ENV === "server"
? serverMetaInfoMixin
: clientMetaInfoMixin
