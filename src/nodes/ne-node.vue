<template>
  <div :class="['node ne-node', {selected: node.display.selected}]" ref="el" v-draggable="{stopDragging, onPositionChange}"
    :style="{
      left: `${node.pos[0]}px`,
      top: `${node.pos[1]}px`,
    }"
    @mousedown="$store.commit('node:select', node.id)">
    <div class="header">{{node.name}}</div>
    <node-ports :ports="inputs" :node-id="node.id"
      :incoming="connectedInputs"
      @connect="(port) => $store.commit('cmd:edge:create', {node: node.id, port, type: 'to'})"
      @disconnect="(port) => $store.commit('edge:disconnect', {node: node.id, port})"
      @mouseover="() => stopDragging = false" @mouseleave="() => stopDragging = true"/>

    <div class="content">
      <component :is="node.type" :node="node"
        v-bind="inputBindings"
        v-model="outputBindings"
        v-on="events"/>
    </div>

    <node-ports :ports="outputs" :node-id="node.id" out
      @connect="(port) => $store.commit('cmd:edge:create', {node: node.id, port, type: 'from'})"
      @mouseover="() => stopDragging = false" @mouseleave="() => stopDragging = true" />
  </div>
</template>

<script>
import usePorts from './usePorts.ts'
import useNode from './useNode.ts'
import NodePorts from './node-ports.vue'

export default {
  name: 'ne-node',
  components: {NodePorts},
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: (vm) => ({
    events: {
      initInputs: (ports) => vm.$store.commit('node:initInputPorts', {id: vm.node.id, ports}),
      initOutputs: (ports) => vm.$store.commit('node:initOutputPorts', {id: vm.node.id, ports}),
    },
    stopDragging: false,
  }),
  setup(props, ctx) {
    const {rNode, onPositionChange, deleteNode} = useNode(ctx, props.id)
    const {inputs, inputBindings, outputBindings, outputs, connectedInputs} = usePorts(ctx, rNode.value.id)

    return {
      node: rNode.value,
      connectedInputs,
      onPositionChange,
      deleteNode,
      inputs,
      inputBindings,
      outputs,
      outputBindings,
    }
  },
}
</script>
