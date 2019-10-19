<template>
  <div class="node-hue">
    <div class="input" title="Hue">
      H <input type="number" min="0" max="360" v-model="form.h"/>
    </div>
    <div class="input" title="Saturation">
      S <input type="number" min="0" max="1" v-model="form.s"/>
    </div>
    <div class="input" title="Luminance">
      L <input type="number" min="0" max="1" v-model="form.l"/>
    </div>
    <div class="input">
      <input type="number" v-model.number="dividend"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PortBinding from '../PortBinding'

export default {
  name: 'node-hue',
  mixins: [PortBinding({
    inputs: {color: {type: 'rgb', value: [0, 0, 0]}},
    outputs: {color: {type: 'rgb', value: [0, 0, 0], binding: 'outColor'}},
  })],
  data: () => ({
    dividend: 1,
    form: {
      h: 0,
      s: 0,
      l: 0,
    },
  }),
  computed: {
    outColor() {
      return this.hue(this.color || [0, 0, 0])
    },
    inputHsl() {
      const r = this.color[0] / 255
      const g = this.color[1] / 255
      const b = this.color[2] / 255
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h, s, l = (max + min) / 2

      if (max === min) {
        h = s = 0
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch(max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6
      }

      h = parseFloat((h * 360).toFixed(1))
      s = parseFloat(s.toFixed(2))
      l = parseFloat(l.toFixed(2))

      this.form = {h, s, l}
      return [h, s, l]
    },
    outputRgb() {

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
  padding: 2px 8px
  color: $color-med
  font-family 'Consolas', monospace
  .input {
    margin: 2px 0
    input {
      width: 4.5em
    }
  }
}
</style>