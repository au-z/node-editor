<template>
  <div class="node-hsl" :id="id" :ref="id" v-preserve="form">
    <color-preview :hex="rgb_hex(rgb)"/>
    <div class="input" :style="{opacity: connectedInputs.H ? 0 : 1}">
      H <input type="number" v-model.number="form.H" v-input.wrap="wrapHue"/>
    </div>
    <div class="input" :style="{opacity: connectedInputs.S ? 0 : 1}">
      S <input type="number" min="0" max="100" v-model.number="form.S"/>
    </div>
    <div class="input" :style="{opacity: connectedInputs.L ? 0 : 1}">
      L <input type="number" min="0" max="100" v-model.number="form.L"/>
    </div>
  </div>
</template>

<script>
import ColorPreview from './color-preview.vue'

import PortBinding from '../PortBinding'
import usePorts from '../usePorts.ts'
import useColorProperties from './useColorProperties.ts'
import Preserve from '../../directives/v-preserve.ts'
import useLocalStorage from '../../storage/useLocalStorage.ts'

export default {
  name: 'node-hsl',
  components: {ColorPreview},
  directives: {Preserve},
  mixins: [PortBinding({
    inputs: {
      H: {type: 'number', default: 20},
      S: {type: 'number', default: 100},
      L: {type: 'number', default: 50},
    },
    outputs: {color: {type: 'rgb', binding: 'rgb'}},
  })],
  props: {
    id: String,
  },
  data: () => ({
    form: {H: 20, S: 100, L: 50},
  }),
  computed: {
    wrapHue() {return {value: this.form.H, range: [0, 360]}},
    rgb() {
      return this.hsl_rgb([
        (this.connectedInputs.H ? this.H : this.form.H) / 360,
        (this.connectedInputs.S ? this.S : this.form.S) / 100,
        (this.connectedInputs.L ? this.L : this.form.L) / 100,
      ])
    },
  },
  setup(props, ctx) {
    const {connectedInputs} = usePorts(ctx, props.node.id)
    const {hsl_rgb, rgb_hex} = useColorProperties()
    const {nodeState} = useLocalStorage.getInstance(ctx)

    return {
      connectedInputs,
      nodeState,
      hsl_rgb,
      rgb_hex,
    }
  },
  created() {
    const saveState = this.nodeState(this.node.id)
    if (saveState.value.form) {
      this.form = saveState.value.form
    }
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-hsl {
  padding: 2px
  flexXY(center, center)
  flex-direction: column
  .input {
    flexXY(start, center)
    margin: 2px 0
    input {
      width: 3.3em
    }
  }
}
</style>