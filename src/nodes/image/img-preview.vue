<template>
  <div class="img-preview">
    <div class="preview">
      <img :src="url" style="backgroundColor: #000">
    </div>
  </div>
</template>

<script>
import PortBinding from '../PortBinding.ts'
import useAsTexture from './useAsTexture.ts'

export default {
  name: 'img-preview',
  mixins: [PortBinding({
    inputs: {blob: {type: 'blob'}},
  })],
  data: () => ({
    error: false,
  }),
  computed: {
    blobUrl() {
      return URL.createObjectURL(this.img)
    },
  },
  setup(props, ctx) {
    const {aspectRatio, url} = useAsTexture(ctx, props)

    return {
      aspectRatio,
      url,
    }
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