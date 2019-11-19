<template>
  <div class="img-filter">
    <select v-model="filter">
      <option value="PASS-THROUGH">Pass Through</option>
      <option value="DOT-SCREEN">Dot Screen</option>
    </select>
  </div>
</template>

<script>
import PortBinding from '../PortBinding'
import useGlFilter from './useGlFilter.ts'

export default {
  name: 'img-filter',
  mixins: [PortBinding({
    inputs: {
      img: {type: 'blob', value: new Blob()},
    },
    outputs: {
      img: {type: 'blob', value: new Blob(), binding: 'img'},
    },
  })],
  setup(props, ctx) {
    const {filter} = useGlFilter(ctx, props)

    return {
      filter,
    }
  },
  created() {
    this.$watch()
  },
}
</script>
