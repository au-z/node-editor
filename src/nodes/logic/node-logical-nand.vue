<template>
  <div class="node-logical-nand">
  </div>
</template>

<script>
import PortBinding from '../PortBinding'

export default {
  name: 'node-logical-nand',
  mixins: [PortBinding({
    inputs: {
      A: {type: 'boolean', default: false},
      B: {type: 'boolean', default: false},
    },
    outputs: {
      nand: {type: 'boolean', binding: 'result'},
    },
  })],
  computed: {
    result() {return !(this.A && this.B)},
  },
}
</script>
