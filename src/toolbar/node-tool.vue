<template>
  <div class="node-tool">
    <button class="nodes" title="RGB Color">
      <i class="fas fa-tint" style="color: #8fc"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'node-tool',
  methods: {
    createColorInputNode() {
      this.$store.commit('node:create', {
        type: 'node-rgb',
        // id: 'rgb',
        name: 'RGB Color',
        pos: [100, 100],
      })
    },
    createChannelSplitterNode() {
      this.$store.commit('node:create', {
        type: 'node-slice',
        name: 'Slice',
        pos: [400, 400],
      })
    },
    createChannelCombineNode() {
      this.$store.commit('node:create', {
        type: 'node-vec3-combine',
        name: 'Combine',
        pos: [500, 400],
      })
    },
    createHueNode() {
      this.$store.commit('node:create', {
        type: 'node-hue',
        // id: 'hue',
        name: 'Hue',
        pos: [500, 500],
      })
    },
    createColorOutput() {
      this.$store.commit('node:create', {
        type: 'node-out',
        // id: 'output',
        name: 'Color',
        pos: [300, 100],
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-tool{
  flexXY(center, center)

}
</style>