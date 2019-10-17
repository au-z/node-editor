<template>
  <div class="node-vec3-combine">
  </div>
</template>

<script>
/* eslint-disable new-cap */
import PortBinding from '../PortBinding'

export default {
  name: 'node-vec3-combine',
  mixins: [PortBinding({
    inputs: {
      num0: {type: 'float', value: 0},
      num1: {type: 'float', value: 0},
      num2: {type: 'float', value: 0},
    },
    outputs: {vec3: {type: 'vec3', value: [0, 0, 0], binding: 'vec3'}},
  })],
  computed: {
    vec3() {
      return [this.num0, this.num1, this.num2]
    },
  },
}
</script>