<template>
  <div class="node-out">
    <div class="preview" :style="{background: hex}"></div>
    <span>{{hex}}</span>
  </div>
</template>

<script>
import PortBinding from '../PortBinding.ts'
import useColorProperties from './useColorProperties.ts'

export default {
  name: 'node-out',
  mixins: [PortBinding({
    inputs: {color: {type: 'rgb', value: [0, 0, 0]}},
  })],
  computed: {
    hex() {return this.rgb_hex(this.color)},
  },
  setup(props, ctx) {
    const {rgb_hex} = useColorProperties()

    return {
      rgb_hex,
    }
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-out {
  flexXY(center, center)
  flex-direction: column
}
.preview{
  square(60px)
  border-radius: 3px
  margin: 4px
}
</style>