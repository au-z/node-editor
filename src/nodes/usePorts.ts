import Vue from 'vue'
import {onMounted, onBeforeUpdate, computed, ref, watch, Ref, onUpdated} from '@vue/composition-api'
import {Node} from './useNode'

enum Datatype {
  boolean,
  int,
  float,
  string,
  vec2,
  vec3,
  vec4,
  color,
  object,
}

interface Port {
  name: string,
  type: Datatype,
  relativePos: [number, number],
  value: any,
}

export default function usePorts(ctx, rNode: Ref<Node>) {
  const node: Ref<Node> = computed(() => ctx.root.$store.getters.nodeById(rNode.value.id))
  const inputs: Ref<Port[]> = computed(() => ctx.root.$store.getters.nodeInputs(rNode.value.id))
  const outputs: Ref<Port[]> = computed(() => Object.values(node.value.out))
  const inputBindings: Ref<Record<string, any>> = computed(() => inputs.value.reduce((acc, port) => {
    Vue.set(acc, port.name, port.value)
    return acc
  }, {}))
  const outputBindings = ref({})

  const positionPorts = (node: Node) => {
    const bbox = node.el.getBoundingClientRect()
    inputs.value.forEach((port, i) => {
      port.relativePos = [0, (bbox.height / (inputs.value.length + 1)) * (i + 1)]
      port.value = port.value || null
    })
    outputs.value.forEach((port, i) => {
      port.relativePos = [bbox.width, (bbox.height / (outputs.value.length + 1)) * (i + 1)]
      port.value = port.value || null
    })
  }

  watch(outputBindings, (outputBindings) => Object.keys(outputBindings).forEach((key) => {
    ctx.root.$store.commit('port:set', {id: rNode.value.id, port: key, value: outputBindings[key]})
  }))

  onMounted(() => {
    positionPorts(rNode.value)
  })

  onBeforeUpdate(() => {
    positionPorts(rNode.value)
  })

  return {
    inputs,
    inputBindings,
    outputs,
    outputBindings,
  }
}

export {
  Port,
  Datatype,
}
