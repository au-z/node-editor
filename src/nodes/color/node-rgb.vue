<template>
  <div class="node-rgb" :id="id" :ref="id" v-preserve="form">
    <div class="input" :style="{opacity: connectedInputs.R ? 0 : 1}">
      R <input type="number" min="0" max="255" v-model.number="form.R"/>
    </div>
    <div class="input" :style="{opacity: connectedInputs.G ? 0 : 1}">
      G <input type="number" min="0" max="255" v-model.number="form.G"/>
    </div>
    <div class="input" :style="{opacity: connectedInputs.B ? 0 : 1}">
      B <input type="number" min="0" max="255" v-model.number="form.B"/>
    </div>
  </div>
</template>

<script>
import PortBinding from '../PortBinding'
import usePorts from '../usePorts.ts'
import Preserve from '../../directives/v-preserve.ts'
import useLocalStorage from '../../storage/useLocalStorage.ts'

export default {
  name: 'node-rgb',
  directives: {Preserve},
  mixins: [PortBinding({
    inputs: {
    R: {type: 'rgbchannel', default: 0},
      G: {type: 'rgbchannel', default: 0},
      B: {type: 'rgbchannel', default: 0},
    },
    outputs: {color: {type: 'rgb', binding: 'rgb'}},
  })],
  props: {
    id: String,
    something: {
      type: String,
      default: 'wow',
    },
  },
  data: () => ({
    form: {R: 0, G: 0, B: 0},
  }),
  computed: {
    rgb() {
      return [this.R || this.form.R, this.G || this.form.G, this.B || this.form.B]
    },
  },
  setup(props, ctx) {
    const {connectedInputs} = usePorts(ctx, props.node.id)
    const {nodeState} = useLocalStorage.getInstance(ctx)

    return {
      connectedInputs,
      nodeState,
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

.node-rgb{
  padding: 2px 8px
  flexXY(center, center)
  flex-direction: column
  color: $color-med
  font-family 'Consolas', monospace
  .input {
    flexXY(start, center)
    margin: 2px 0
    input {
      width: 3.3em
    }
  }
}
</style>