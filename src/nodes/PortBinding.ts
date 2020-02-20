import {Datatype} from './usePorts'
import {DatatypeProperties, mapToType} from './Datatype'

interface PortConfig {
	type: Datatype
	relativePos: [number, number]
}

interface InputPortConfig extends PortConfig {
	default?: any
}

interface OutputPortConfig extends PortConfig {
	value?: any
	binding?: string
}

interface BindingOptions {
	inputs: Record<string, InputPortConfig>
	outputs: Record<string, OutputPortConfig>
	reactive: string[]
}

export default function PortBinding(options: BindingOptions) {
	const propDefault = (val: any) => (typeof val === 'object') ? () => (val) : val

	const datatypeProperties = (datatype) => {
		let properties = DatatypeProperties[datatype]
		if(!properties) {
			console.warn(`[PortBinding] unrecognized datatype provided: '${datatype}'`)
			properties = ({range: null, default: null} as any)
		}
		return properties
	}

	let inputs = {} as Record<string, InputPortConfig>
	let outputs = {} as Record<string, OutputPortConfig>

	let props = {
		node: {} as any,
	}

	options.inputs && Object.entries(options.inputs).forEach(([name, config]) => {
		let properties = datatypeProperties(config.type)

		inputs[name] = {...config, relativePos: [0, 0]}

		props[name] = {
			type: mapToType(config.type),
			default: propDefault(config.default),
		}
	})

	options.outputs && Object.entries(options.outputs).forEach(([name, config]) => {
		let properties = datatypeProperties(config.type)

		outputs[name] = {
			...config,
			value: (config.value != null) ? config.value : properties?.default,
		}
	})

	function mounted() {
		if(options.outputs) {
			if(Object.values(options.outputs).every((config) => !config.binding) && options.inputs) {
				Object.entries(options.inputs).forEach(([name, config]) => {
					this.$watch(name, (val) => this.$emit('input', {[name]: val}), {
						deep: true,
						immediate: true,
					})
				})
			}

			Object.entries(outputs).forEach(([name, output]) => {
				if(output.binding) {
					this.$watch(output.binding, (val) => this.$emit('input', {[name]: val}), {
						deep: true,
						immediate: true
					})
				}
			})
		}

		this.$emit('initInputs', inputs)
		this.$emit('initOutputs', outputs)
	}

	return {
		data: () => ({
			inputs,
			outputs,
		}),
		props,
		mounted,
	}
}