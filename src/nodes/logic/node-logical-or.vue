<template>
  <div class="node-logical-or">
  </div>
</template>

<script>
import PortBinding from '../PortBinding'

export default {
  name: 'node-logical-or',
  mixins: [PortBinding({
    inputs: {
      A: {type: 'boolean', default: false},
      B: {type: 'boolean', default: false},
    },
    outputs: {
      or: {type: 'boolean', binding: 'result'},
    },
  })],
  computed: {
    result() {return !!(this.A || this.B)},
  },
}
</script>
