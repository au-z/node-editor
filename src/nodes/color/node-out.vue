<template>
  <div class="node-out">
    <div class="preview" :style="{backgroundColor: hexColor}"></div>
    <span>{{hexColor}}</span>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import PortBinding from '../PortBinding'

export default {
  name: 'node-out',
  mixins: [PortBinding({
    inputs: {color: {type: 'rgb', value: [0, 0, 0]}},
  })],
  props: {
    color: {
      type: Array,
      default: () => [0, 0, 0],
    },
  },
  computed: {
    hexColor() {
      return this.rgbToHex(this.color)
    },
  },
  methods: {
    rgbToHex(rgb) {
      return Object.values(rgb).reduce((color, channel) => {
        let hex = channel.toString(16)
        if (hex.length < 2) hex = '0' + hex
        return color + hex
      }, '#')
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-out {
  flexXY(center, center)
  flex-direction: column
  color: $color-med
  font-family: 'Consolas', monospace
}
.preview{
  square(60px)
  border-radius: 3px
  margin: 4px
}
</style>