<template>
  <div class="node-color-polyad" v-preserve="form">
    <select v-model="form.model">
      <option :value="2">Dyad</option>
      <option :value="3">Triad</option>
      <option :value="4">Tetrad</option>
    </select>
    <br>
    <div class="input">
      Deg <input type="number" step="1" v-model.number="form.angle" v-input.wrap="wrapHue"/>
    </div>
    <br>
  </div>
</template>

<script>
import PortBinding from '../PortBinding'
import useColorProperties from './useColorProperties.ts'
import Preserve from '../../directives/v-preserve.ts'
import useLocalStorage from '../../storage/useLocalStorage.ts'

const OffsetAngles = Object.freeze({
  2: 180,
  3: 120,
  4: 90,
})

export default {
  name: 'node-color-polyad',
  directives: {Preserve},
  mixins: [PortBinding({
    inputs: {color: {type: 'rgb', value: [0, 0, 0]}},
    outputs: {
      A: {type: 'rgb', default: [0, 0, 0], binding: 'poly.A'},
      B: {type: 'rgb', default: [0, 0, 0], binding: 'poly.B'},
      C: {type: 'rgb', default: [0, 0, 0], binding: 'poly.C'},
      D: {type: 'rgb', default: [0, 0, 0], binding: 'poly.D'},
    },
  })],
  data: () => ({
    form: {
      model: 4,
      angle: OffsetAngles[4],
    },
  }),
  computed: {
    wrapHue() {return {value: this.form.angle, range: [0, 360]}},
    hsl() {return this.rgb_hsl(this.color)},
    poly() {
      switch (this.form.model) {
        case 2: return {
          A: this.color,
          B: this.hsl_rgb(this.hue(this.hsl, (this.form.angle / 360))),
        }
        case 3: return {
          A: this.color,
          B: this.hsl_rgb(this.hue(this.hsl, (this.form.angle / 360))),
          C: this.hsl_rgb(this.hue(this.hsl, -1 * (this.form.angle / 360))),
        }
        case 4:
        default: return {
          A: this.color,
          B: this.hsl_rgb(this.hue(this.hsl, (this.form.angle / 360))),
          C: this.hsl_rgb(this.hue(this.hsl, 0.5)),
          D: this.hsl_rgb(this.hue(this.hsl, 0.5 + (this.form.angle / 360))),
        }
      }
    },
  },
  setup(props, ctx) {
    const {rgb_hsl, hue, hsl_rgb} = useColorProperties()
    const {nodeState} = useLocalStorage.getInstance(ctx)

    return {
      rgb_hsl,
      hsl_rgb,
      hue,
      nodeState,
    }
  },
  created() {
    const saveState = this.nodeState(this.node.id)
    if (saveState.value.form) {
      this.form = saveState.value.form
    }
    this.$watch('form.model', (model) => this.form.angle = OffsetAngles[model])
  },
}
</script>

<style lang="stylus" scoped>
.node-color-polyad {
  flexXY(center, center)
  flex-direction: column
  input, select {
    margin: 2px 0
  }
  input {
    width: 3.3em
    &:before {
      content: '\00b0'
      position: absolute
      left: 0
      color: white
      z-index 100
    }
  }
}
</style>
