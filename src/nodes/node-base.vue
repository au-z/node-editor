<template>
  <div :class="['node node-base', {selected: node.selected}]" ref="el" v-draggable="{onPositionChange}"
    :style="{
      left: `${node.pos[0]}px`,
      top: `${node.pos[1]}px`,
    }"
    @click="$store.commit('node:select', node.id)">
    <div class="header">{{node.name}}</div>
    <node-ports :ports="inputs"
      @connect="(port) => $store.commit('cmd:edge:create', {node: node.id, port, type: 'to'})"/>

    <div class="content">
      <component :is="node.type" v-bind="inputBindings" v-model="outputBindings" v-on="events" :node="node"/>
    </div>

    <node-ports :ports="outputs" out
      @connect="(port) => $store.commit('cmd:edge:create', {node: node.id, port, type: 'from'})"/>
  </div>
</template>

<script>
import usePorts from './usePorts.ts'
import useNode from './useNode.ts'
import Keybind from '../directives/v-keybind.ts'
import NodePorts from './node-ports.vue'

export default {
  name: 'node-base',
  components: {NodePorts},
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: (vm) => ({
    events: {
      initInputs: (ports) => {
        vm.$store.commit('node:initPorts', {id: vm.node.id, areInputs: true, ports})
      },
      initOutputs: (ports) => {
        vm.$store.commit('node:initPorts', {id: vm.node.id, areInputs: false, ports})
      },
    },
  }),
  setup(props, ctx) {
    const {rNode, onPositionChange, deleteNode} = useNode(ctx, props.id)
    const {inputs, inputBindings, outputBindings, outputs} = usePorts(ctx, rNode)

    return {
      node: rNode.value,
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
