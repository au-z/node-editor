import { computed } from '@vue/composition-api'
import { Port } from './usePorts'

export default function useNodeContext(ctx, props) {
	const node = props.node || ctx.root.$store.getters.nodeById(props.nodeId)

	const connectedInputs = computed(() => {
		return (Object.values(node.in) as Port[]).reduce((inputs: Object, port: Port) => {
			inputs[port.name] = !!ctx.root.$store.getters.edge(node.id, port.name)
			return inputs
		}, {})
	})

	return {
		connectedInputs,
	}
}