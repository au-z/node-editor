import {onMounted, computed, ref, watch, Ref} from '@vue/composition-api'
import {Node} from './useNode'
import {Datatype, DatatypeProperties, mapToType} from './Datatype'
import Vue from 'vue'

interface Port {
  name: string,
  type: Datatype,
  relativePos: [number, number],
  default?: any,
  value?: any,
  connected: boolean,
}

export default function usePorts(ctx, nodeId: string) {
  const store = ctx.root.$store

  const rNode = computed(() => store.getters.nodeById(nodeId))

  const inputs: Ref<Port[]> = computed(() => store.getters.nodeInputs(rNode.value.id))

  const outputs: Ref<Port[]> = computed(() => Object.values(rNode.value.out))

  const inputBindings: Ref<Record<string, any>> = computed(() => inputs.value.reduce((acc, port) => {
    if(port.value != null) {
      const inputType = mapToType(port.type)
      acc[port.name] = tryConvert(port.value, typeof inputType, inputType)
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

  const tryConvert = (val: any, type: string, constructor: Function) => {
    if(type !== 'boolean') return val

    try {
      const converted = constructor(val)
      if(converted != null) {
        return converted
      }
    } catch {
      return val
    }
  }

  const positionPorts = (node: Node) => {
    if (!node.el) return
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

  watch(outputBindings, (bindings) => Object.entries(bindings).forEach(([port, binding]) => {
    console.log(port, binding)
    rNode.value.out[port] && store.commit('port:set', {
      id: rNode.value.id,
      port,
      value: clamp(rNode.value.out[port], binding),
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
