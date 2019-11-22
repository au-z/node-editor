<template>
  <div class="node-logical-and">
    {{A}} {{B}}
    <br>
    {{result}}
  </div>
</template>

<script>
import PortBinding from '../PortBinding'

export default {
  name: 'node-logical-and',
  mixins: [PortBinding({
    inputs: {
      A: {type: 'boolean', default: false},
      B: {type: 'boolean', default: false},
    },
    outputs: {
      and: {type: 'boolean', binding: 'result'},
    },
  })],
  computed: {
    result() {return !!(this.A && this.B)},
  },
}
</script>
