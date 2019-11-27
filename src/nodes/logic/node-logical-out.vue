<template>
  <div class="node-logical-out">
    <p>{{val}}</p>
  </div>
</template>

<script>
import PortBinding from '../PortBinding'

export default {
  name: 'node-logical-out',
  mixins: [PortBinding({
    inputs: {
      val: {type: 'boolean', default: false},
    },
  })],
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-logical-out {
  flexXY(center, center)
  text-transform uppercase
  p {
    margin: 8px
  }
}
</style>