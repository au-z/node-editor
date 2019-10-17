import Mousetrap from 'mousetrap'

export default (function() {
	const mousePos = []

	return {
		bind(el, binding, vnode) {
			binding.value.bindings?.forEach((b) => {
				Mousetrap.bind(b.key, (e) => b.fn(e))
			})
		},
	}
})()
