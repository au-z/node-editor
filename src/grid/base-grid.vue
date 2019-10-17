<template>
  <div class="base-grid">
    <node-toolbar/>
    <canvas ref="canvas" v-keybind="keybind" @click="() => $store.commit('node:selectAll', false)"></canvas>
    <add-node-menu/>
    <slot></slot>
  </div>
</template>

<script>
import Canvas from './Canvas.js'
import Keybind from '../directives/v-keybind.ts'
import NodeToolbar from '../toolbar/node-toolbar.vue'
import AddNodeMenu from '../interface/add-node-menu.vue'

export default {
  name: 'base-grid',
  components: {NodeToolbar, AddNodeMenu},
  directives: {Keybind},
  data: (vm) => ({
    canvas: null,
    keybind: {
      bindings: [
        {key: 'a', fn(e) {vm.$store.commit('node:selectAll')}},
        {key: 'x', fn(e) {vm.$store.commit('node:deleteSelected')}},
      ],
    },
  }),
  computed: {
    dirtyNodes() {
      return this.$store.getters.dirtyNodes
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
        this.$store.getters.nodes.forEach((node) => {
          this.$store.commit('node:clean', node.id)
        })
      })
    },
    _absolutePortPos(nodePos, portPos) {
      return [nodePos[0] + portPos[0], nodePos[1] + portPos[1]]
    },
  },
  mounted() {
    this.canvas = Canvas.getInstance(this.$refs.canvas)
    this.canvas.prepare()

    this.$watch('dirtyNodes', this.redraw)
    window.addEventListener('resize', this.redraw)
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
