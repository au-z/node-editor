<template>
  <div :class="['node-ports', {in: !out, out: out}]">
    <div :class="['port', p.type, {connected: incoming[p.name]}]" v-for="p in ports" :key="p.name"
    :title="`${p.name}: ${p.value}`"
    :style="{
      top: `${p.relativePos[1] - 0.5 * port.D}px`,
      width: `${port.D}px`,
      height: `${port.D}px`,
      borderRadius: `${port.D}px`,
    }"
    v-drag-connect="{isOutput: out, port: p, connect, onCableDrag, onCableMouseUp}">
    </div>
  </div>
</template>

<script>
import DragConnect from './v-drag-connect.ts'
import Canvas from 'src/grid/Canvas'
import Cable from 'src/grid/canvas/Cable'

export default {
  name: 'node-ports',
  directives: {DragConnect},
  props: {
    ports: {
      type: Array,
      required: true,
      default: () => [],
    },
    nodeId: {
      type: String,
      required: true,
    },
    incoming: {
      type: Object,
      default: () => ({}),
    },
    out: {
      type: Boolean,
      default: false,
    },
  },
  data: (vm) => ({
    port: {
      D: 12,
    },
    canvas: null,
    tempCable: Cable([0, 0], [0, 0], '#888'),
  }),
  computed: {
    node() {return this.$store.getters.nodeById(this.nodeId)},
  },
  methods: {
    connect(port) {
      if (this.incoming[port]) {
        this.$emit('disconnect', port)
      } else {
        this.$emit('connect', port)
      }
    },
    onCableDrag(el, binding, e) {
      this.canvas.wipe()
      const portPos = this.$store.getters.portPos(this.nodeId, binding.value.port.name, false)
      this.tempCable.setFrom(portPos)
      this.tempCable.setTo([e.clientX, e.clientY])
      this.tempCable.toggle(true)
    },
    onCableMouseUp(el, binding, e) {
      this.tempCable.toggle(false)
    },
  },
  mounted() {
    this.canvas = Canvas.getInstance()
    this.canvas.onRender((ctx) => {
      this.tempCable.draw(ctx)
    })
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-ports{
  absPos(0, auto, auto, auto)
  wh(0, 100%)
  display: flex
  flex-direction column
  align-items: center
  z-index: 1
  &.in {
    left: 0
  }
  &.out {
    right: 0
  }

  .port {
    position: absolute
    border: 3px solid $color-bg
    cursor: pointer
    &.connected {
      &:hover::before {
        // content: '\f00d'
        content: "\f00d"
        font-family: "Font Awesome 5 Free"
        font-weight: 900
        font-size: 50%
        padding: 3px 4px
        absPos(-4px, 0, 0, -4px)
        circle(calc(100% + 8px))
        background: #E54040
        color: white
      }
    }
  }
}
</style>