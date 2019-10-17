<template>
  <div class="node-rgb" :id="id" :ref="id">
    <div class="input">
      R <input type="number" min="0" max="255" v-model.number="color[0]"/>
    </div>
    <div class="input">
      G <input type="number" min="0" max="255" v-model.number="color[1]"/>
    </div>
    <div class="input">
      B <input type="number" min="0" max="255" v-model.number="color[2]"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import PortBinding from '../PortBinding'

export default {
  name: 'node-rgb',
  mixins: [PortBinding({
    outputs: {color: {type: 'rgb', value: [255, 255, 255], binding: 'color'}},
  })],
  props: {
    id: String,
    r: {
      type: Number,
      default: 255,
    },
    g: {
      type: Number,
      default: 255,
    },
    b: {
      type: Number,
      default: 255,
    },
  },
  data: (vm) => ({
    color: [vm.r, vm.g, vm.b],
  }),
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-rgb{
  padding: 2px 8px
  flexXY(center, center)
  flex-direction: column
  color: $color-med
  font-family 'Consolas', monospace
  .input {
    flexXY(start, center)
    margin: 2px 0
    flex-wrap: nowrap
    input {
      width: 3.3em
    }
  }
}
</style>