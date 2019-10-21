<template>
  <div :class="['node-ports', {in: !out, out: out}]">
    <div :class="['port', p.type]" v-for="p in ports" :key="p.name"
    :title="`${p.name}: ${p.value}`"
    :style="{
      top: `${p.relativePos[1] - 0.5 * port.D}px`,
      width: `${port.D}px`,
      height: `${port.D}px`,
      borderRadius: `${port.D}px`,
    }"
    @click="() => $emit('connect', p.name)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'node-ports',
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
  }
}
</style>