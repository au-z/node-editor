<template>
  <div class="node-value">
    <div class="input">
      <input type="number" step="0.01" v-model.number="out.value">
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PortBinding from '../PortBinding.ts'

export default {
  name: 'node-value',
  mixins: [PortBinding({
    outputs: {val: {type: 'float', value: 0.500, binding: 'out.value'}},
  })],
  data: () => ({
    out: {
      value: 0.500,
    },
  }),
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-value{
  input {
    min-width: 5em
  }
}
</style>