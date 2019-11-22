<template>
  <div class="node-blend">
    <select v-model="operation">
      <option value="sum">Add</option>
      <option value="sub">Subtract</option>
    </select>
  </div>
</template>

<script>
/* eslint-disable */
import PortBinding from '../PortBinding'
import {Datatype, DatatypeProperties} from '../usePorts'

export default {
  name: 'node-blend',
  mixins: [PortBinding({
    inputs: {
      A: {type: 'rgb', default: [0, 0, 0]},
      B: {type: 'rgb', default: [0, 0, 0]},
    },
    outputs: {sum: {type: 'rgb', value: [0, 0, 0], binding: 'result'}}
  })],
  data: () => ({
    operation: 'sum',
  }),
  computed: {
    result() {
      return this[this.operation](this.A, this.B)
    },
  },
  methods: {
    sum(a, b) {
      return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
    },
    sub(a, b) {
      return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
    },
  },
}
</script>
