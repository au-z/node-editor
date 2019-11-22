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
    v-drag-connect="{isOutput: out, port: p.name, connect, onCableDrag}">
    </div>
  </div>
</template>

<script>
import DragConnect from './v-drag-connect.ts'

export default {
  name: 'node-ports',
  directives: {DragConnect},
  props: {
    ports: {
      type: Array,
      required: true,
      default: () => [],
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
  data: () => ({
    port: {
      D: 12,
    },
  }),
  methods: {
    connect(port) {
      if (this.incoming[port]) {
        this.$emit('disconnect', port)
      } else {
        this.$emit('connect', port)
      }
    },
    onCableDrag(e) {
      console.log(`${e.clientX}, ${e.clientY}`)
    },
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