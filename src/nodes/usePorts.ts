import {onMounted, computed, ref, watch, Ref} from '@vue/composition-api'
import {Node} from './useNode'
import {Datatype, DatatypeProperties} from './Datatype'
import Vue from 'vue'

interface Port {
  name: string,
  type: Datatype,
  relativePos: [number, number],
  value: any,
  connected: boolean,
}

export default function usePorts(ctx, nodeId: string) {
  const store = ctx.root.$store
  const rNode = computed(() => store.getters.nodeById(nodeId))

  const inputs: Ref<Port[]> = computed(() => store.getters.nodeInputs(rNode.value.id))
  const outputs: Ref<Port[]> = computed(() => Object.values(rNode.value.out))
  const inputBindings: Ref<Record<string, any>> = computed(() => inputs.value.reduce((acc, port) => {
    if(port.value != null) {
      acc[port.name] = port.value
    }
    return acc
  }, {}))
  const outputBindings = ref({})

  const connectedInputs = computed(() => {
    return (Object.values(rNode.value.in) as Port[]).reduce((acc: Object, port: Port) => {
      Vue.set(acc, port.name, !!store.getters.edge(rNode.value.id, port.name))
      return acc
    }, {})
  })

  const positionPorts = (node: Node) => {
    const bbox = node.el.getBoundingClientRect()
    inputs.value.forEach((port, i) => {
      store.commit('port:setRelativePos', {
        id: node.id,
        port: port.name,
        pos: [0, (bbox.height / (inputs.value.length + 1)) * (i + 1)],
        isInput: true,
      })
      port.value = port.value || null
    })
    outputs.value.forEach((port, i) => {
      store.commit('port:setRelativePos', {
        id: node.id,
        port: port.name,
        pos: [bbox.width, (bbox.height / (outputs.value.length + 1)) * (i + 1)],
        isInput: false,
      })
      port.value = port.value || null
    })
  }

  const clamp = (port, value) => {
    if(DatatypeProperties[port.type].range && Array.isArray(value)) {
      const range = DatatypeProperties[port.type].range
      return value.map((num) => Math.max(range[0], Math.min(range[1], num)))
    }
    return value
  }

  watch(outputBindings, (outputBindings) => Object.keys(outputBindings).forEach((key) => {
    store.commit('port:set', {
      id: rNode.value.id,
      port: key,
      value: clamp(rNode.value.out[key], outputBindings[key]),
    })
  }))

  onMounted(() => {
    positionPorts(rNode.value)
  })

  return {
    inputs,
    inputBindings,
    outputs,
    outputBindings,
    connectedInputs,
  }
}

export {
  Port,
  Datatype,
}
