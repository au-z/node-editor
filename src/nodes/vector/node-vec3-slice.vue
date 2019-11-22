<template>
  <div class="node-vec3-slice">
  </div>
</template>

<script>
import PortBinding from '../PortBinding'

export default {
  name: 'node-vec3-slice',
  mixins: [PortBinding({
    inputs: {vector: {type: 'vec3', default: [0, 0, 0]}},
    outputs: {
      0: {type: 'float', value: 0, binding: 'slice0'},
      1: {type: 'float', value: 0, binding: 'slice1'},
      2: {type: 'float', value: 0, binding: 'slice2'},
    },
  })],
  computed: {
    slice0() {
      return this.vector[0]
    },
    slice1() {
      return this.vector[1]
    },
    slice2() {
      return this.vector[2]
    },
  },
}
</script>
