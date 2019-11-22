<template>
  <div class="node-logical-xor">
  </div>
</template>

<script>
import PortBinding from '../PortBinding'

export default {
  name: 'node-logical-xor',
  mixins: [PortBinding({
    inputs: {
      A: {type: 'boolean', default: false},
      B: {type: 'boolean', default: false},
    },
    outputs: {
      xor: {type: 'boolean', binding: 'result'},
    },
  })],
  computed: {
    result() {return (this.A && !this.B) || (!this.A && this.B)},
  },
}
</script>
