import {Datatype} from './usePorts'

interface PortConfig {
	type: Datatype
	value: any
	binding: string
}

interface BindingOptions {
	inputs: Record<string, PortConfig>
	outputs: Record<string, PortConfig>
	reactive: string[]
}

function mapPropType(type: Datatype) {
	switch(type) {
		case Datatype.boolean:
			return Boolean
		case Datatype.int:
		case Datatype.float:
			return Number
		case Datatype.string:
			return String
		case Datatype.vec2:
		case Datatype.vec3:
		case Datatype.vec4:
		case Datatype.rgb:
			return Array
		case Datatype.object:
			return Object
	}
}

function propDefault(value: any) {
	if(typeof value === 'object') {
		return () => value
	} else {
		return value
	}
}

export default function PortBinding(options: BindingOptions) {
	let inputs = {}
	let outputs = {}

	let props = {}

	if(options.inputs) {
		Object.entries(options.inputs).forEach(([name, config]) => {
			inputs[name] = config
			props[name] = {
				type: mapPropType(config.type),
				default: propDefault(config.value),
			}
		})
	}

	if(options.outputs) {
		Object.entries(options.outputs).forEach(([name, config]) => {
			outputs[name] = config
		})
	}

	function created() {
		this.$emit('initInputs', inputs)
		this.$emit('initOutputs', outputs)

		if(options.outputs) {
			if(Object.values(options.outputs).every((config) => !config.binding) && options.inputs) {
				Object.entries(options.inputs).forEach(([name, config]) => {
					this.$watch(name, (val) => {
						this.$emit('input', {[name]: val})
					})
				})
			}
			Object.entries(options.outputs).forEach(([name, config]) => {
				if(config.binding) {
					this.$watch(config.binding, (val) => {
						this.$emit('input', {[name]: val})
					}, {deep: true, immediate: true})
				}
			})
		}
	}

	return {
		data: () => ({
			inputs,
			outputs,
		}),
		props,
		created,
	}
}