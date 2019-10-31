export default (function() {
	const boundInputs = {}

	const wrap = (el, binding, range) => {
		if(binding.oldValue.value <= binding.value.value && binding.value.value >= range[1]) {
			el.value = range[0]
		} else if (binding.oldValue.value >= binding.value.value && binding.value.value < range[0]) {
			el.value = range[1] - 1
		}
	}

	return {
		bind(el, binding, vnode) {
			Object.keys(binding.modifiers).forEach((key) => {
				boundInputs[el] = {fn: key, args: binding.value}
			})
		},

		update(el, binding, vnode) {
			switch(boundInputs[el].fn) {
				case 'wrap':
				default:
					wrap(el, binding, boundInputs[el].args.range)
					break
			}
		}
	}
})()
