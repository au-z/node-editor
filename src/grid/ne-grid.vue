<template>
  <div class="base-grid">
    <node-toolbar/>
    <canvas ref="canvas" v-keybind="keybind" @click="() => $store.commit('node:selectAll', false)"></canvas>
    <menu-add-node/>
    <slot></slot>
  </div>
</template>

<script>
import Canvas from './Canvas.js'
import Keybind from '../directives/v-keybind.ts'
import NodeToolbar from '../toolbar/node-toolbar.vue'
import MenuAddNode from '../interface/menu-add-node.vue'

export default {
  name: 'base-grid',
  components: {NodeToolbar, MenuAddNode},
  directives: {Keybind},
  data: (vm) => ({
    canvas: null,
    keybind: {
      bindings: [
        {key: 'a', fn(e) {vm.$store.commit('node:selectAll')}},
        {key: 'x', fn(e) {
          vm.selectedNodeIds.forEach((id) => {
            const edges = vm.$store.getters.edgesByNodeId(id)
            vm.$store.commit('node:disconnect', edges)
          })
          vm.$store.commit('node:deleteSelected', vm.selectedNodeIds)
        }},
      ],
    },
  }),
  computed: {
    dirtyNodes() {
      return this.$store.getters.dirtyNodes
    },
    selectedNodeIds() {
      return this.$store.getters.selectedNodes.map((n) => n.id)
    },
  },
  methods: {
    redraw() {
      this.canvas.wipe()
      this.$store.getters.nodes.forEach((nodeTo) => {
        const edges = Object.values(nodeTo.in).map((port) => {
          const edge = this.$store.getters.edge(nodeTo.id, port.name)
          return {
            from: edge && this.$store.getters.portPos(edge.node, edge.port, false),
            to: this.$store.getters.portPos(nodeTo.id, port.name, true),
          }
        }).filter(({from, to}) => !!from)

        edges.forEach(({from, to}) => this.canvas.bezier(from, to))
      })
    },
  },
  mounted() {
    this.canvas = Canvas.getInstance(this.$refs.canvas)
    this.canvas.prepare()

    this.$watch('dirtyNodes', (nodes) => {
      nodes.forEach((n) => this.$store.commit('node:clean', n.id))
      this.redraw()
    })
    window.addEventListener('resize', this.redraw)
  },
  updated() {
    this.redraw()
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.base-grid{
  absPos(0, 0, 0, 0)
  max-height: 100vh
  background: $color-bg
  background-image: radial-gradient(circle, $color-grid 1px, rgba(0, 0, 0, 0) 1px), radial-gradient(circle, $color-grid 1px, rgba(0, 0, 0, 0) 1px)
  background-size: $grid-unit $grid-unit
  & > canvas {
    wh(100%)
  }
}
</style>
