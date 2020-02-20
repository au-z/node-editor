<template>
  <div class="img-preview">
    <div class="preview" style="backgroundColor: #000">
      <img v-if="textureUrl" :src="textureUrl" style="backgroundColor: #000">
    </div>
  </div>
</template>

<script>
import PortBinding from '../PortBinding.ts'
import usePostProcessing from './usePostProcessing.ts'

export default {
  name: 'img-preview',
  mixins: [PortBinding({
    inputs: {passes: {type: 'array', default: []}},
  })],
  computed: {
    textureUrl() {return this.passes.length > 0 ? this.passes[0].image?.src : ''},
  },
  setup(props, ctx) {
    const {applyTexture, applyFilters} = usePostProcessing(ctx, props)

    return {
      applyTexture,
      applyFilters,
    }
  },
  created() {
    this.$watch('passes', ([texture, ...filters]) => {
      if(texture === 0) return
      this.applyTexture(texture)
      if(filters.length > 0) return
      this.applyFilters(filters)
    }, {immediate: true, deep: true})
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.img-preview {
  .preview {
    square(60px)
    border-radius: 3px
    margin: 4px
    overflow: hidden
    img {
      wh(100%, 100%)
      object-fit: cover
    }
  }
}
</style>