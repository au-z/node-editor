import {Datatype, Port} from './usePorts'
import { DatatypeProperties } from './Datatype'
import store from 'src/store'

interface PortConfig {
	type: Datatype
	value?: any
	default: any
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
		case Datatype.rgbchannel:
			return Number
		case Datatype.string:
		case Datatype.url:
			return String
		case Datatype.vec2:
		case Datatype.vec3:
		case Datatype.vec4:
		case Datatype.rgb:
			return Array
		case Datatype.blob:
			return Blob
		case Datatype.arraybuffer:
			return ArrayBuffer
		case Datatype.object:
		default:
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

	let props = {
		node: Object,
	}

	if(options.inputs) {
		Object.entries(options.inputs).forEach(([name, config]) => {
			inputs[name] = {
				...config,
				relativePos: config.relativePos,
			},
			props[name] = {
				type: mapPropType(config.type),
				required: false,
				default: propDefault(config.value || config.default),
			}
		})
	}

	if(options.outputs) {
		Object.entries(options.outputs).forEach(([name, config]) => {
			let dtProperties = DatatypeProperties[config.type]
			if(!dtProperties) {
				console.warn(`[PortBinding] unrecognized datatype provided: '${config.type}'`)
				dtProperties = ({range: null, default: null} as any)
			}
			// set default output datatype values
			outputs[name] = {
				...config,
				value: (config.value !== undefined) ? config.value : (DatatypeProperties[config.type] || {default: null}).default,
			}
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