<template>
  <div class="ne-grid">
    <canvas id="grid-canvas" ref="canvas" v-keybind="keybind" @click="() => $store.commit('node:selectAll', false)"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import Canvas from './Canvas.js'
import Cable from './canvas/Cable.ts'
import Keybind from '../directives/v-keybind.ts'

export default {
  name: 'ne-grid',
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
    drawEdges(ctx) {
      this.$store.getters.nodes.forEach((nodeTo) => {
        const edges = Object.values(nodeTo.in).map((port) => {
          const edge = this.$store.getters.edge(nodeTo.id, port.name)
          return {
            from: edge && this.$store.getters.portPos(edge.node, edge.port, false),
            to: this.$store.getters.portPos(nodeTo.id, port.name, true),
          }
        }).filter(({from, to}) => !!from)

        const cables = edges.map(({from, to}) => Cable(from, to, '#aaa'))
        cables.forEach((c) => c.draw(ctx))
      })
    },
  },
  mounted() {
    this.canvas = Canvas.getInstance(this.$refs.canvas)
    this.canvas.prepare()

    this.canvas.onRender((ctx) => this.drawEdges(ctx))
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.ne-grid {
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
