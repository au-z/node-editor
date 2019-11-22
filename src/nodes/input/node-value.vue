<template>
  <div class="node-value" v-preserve="value">
    <div class="header">
      <i class="fa fa-redo"></i>
    </div>
    <div class="input">
      <input type="number" step="0.1" v-model.number="value">
    </div>
  </div>
</template>

<script>
import PortBinding from '../PortBinding.ts'
import Preserve from '../../directives/v-preserve.ts'
import useLocalStorage from '../../storage/useLocalStorage.ts'

export default {
  name: 'node-value',
  directives: {Preserve},
  mixins: [PortBinding({
    outputs: {val: {type: 'float', binding: 'value'}},
  })],
  data: (vm) => ({
    value: 1,
  }),
  setup(props, ctx) {
    const {nodeState} = useLocalStorage.getInstance(ctx)

    return {
      nodeState,
    }
  },
  created() {
    const saveState = this.nodeState(this.node.id)
    if (saveState.value.value) {
      this.value = saveState.value.value
    }
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-value {
  input {
    max-width: 5em
  }
}
</style>