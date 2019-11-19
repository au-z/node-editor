<template>
  <div class="gl-image" v-preserve="url">
    <div class="input">
      <input type="text" v-model="url" placeholder="URL">
    </div>
    <div class="preview">
      <img v-if="blob && blob.size > 380" :src="img"/>
    </div>
  </div>
</template>

<script>
import PortBinding from '../PortBinding.ts'
import Preserve from '../../directives/v-preserve.ts'
import useLocalStorage from '../../storage/useLocalStorage'

import useImageLoader from './useImageLoader'

export default {
  name: 'gl-image',
  directives: {Preserve},
  mixins: [PortBinding({
    outputs: {img: {type: 'blob', binding: 'blob'}},
  })],
  setup(props, ctx) {
    const {url, blob, img} = useImageLoader(ctx)
    const {nodeState} = useLocalStorage.getInstance(ctx)

    return {
      url,
      blob,
      img,
      nodeState,
    }
  },
  created() {
    const saveState = this.nodeState(this.node.id)
    if(saveState.value.url) {
      this.url = saveState.value.url
    }
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.gl-image {
  input {
    max-width: 8em
  }
  .preview {
    padding: 4px
    flexXY(center, center)
    img {
      whMin(60px, 60px)
      whMax(8em, 8em)
      border-radius: 4px
    }
  }
}
</style>