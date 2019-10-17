<template>
  <div class="node-hue">
    <div class="input">
      <input type="number" v-model.number="dividend"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import PortBinding from '../PortBinding'

export default {
  name: 'node-hue',
  mixins: [PortBinding({
    inputs: {color: {type: 'rgb', value: [0, 0, 0]}},
    outputs: {color: {type: 'rgb', value: [0, 0, 0], binding: 'outColor'}},
  })],
  data: () => ({
    dividend: 1,
  }),
  computed: {
    outColor() {
      return this.hue(this.color || [0, 0, 0])
    },
  },
  methods: {
    hue(color) {
      return color.map((c) => Math.floor(c / this.dividend))
    },
  },
}
</script>

<style lang="stylus" scoped>
.node-hue{
  input {
    width: 4em
  }
}
</style>