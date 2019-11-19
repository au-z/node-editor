<template>
  <div v-show="ui.show" class="node ne-node gl-viewport" v-draggable="draggable">
    <div class="header">
      <span>Preview</span>
      <ul class="window-fn">
        <li @click="hide"><i class="fas fa-times"></i></li>
      </ul>
    </div>
    <div class="container" @mouseover="toggleDrag(false)" @mouseleave="toggleDrag(true)" ref="container"></div>
  </div>
</template>

<script>
import GL from 'src/gl/GL.ts'

export default {
  name: 'gl-viewport',
  data: () => ({
    draggable: {
      stopDragging: false,
    },
  }),
  computed: {
    ui() {
      return this.$store.state.ui['gl-viewport']
    },
  },
  methods: {
    toggleDrag(enabled) {
      this.draggable.stopDragging = !enabled
    },
    hide() {
      this.$store.commit('ui:set', {name: 'gl-viewport', show: false})
    },
  },
  setup(props, ctx) {
    GL.init(ctx, props)
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.gl-viewport {
  wh(420px, 420px)
  absPos(80px, 16px, auto, auto)
  flexXY(start, start)
  flex-direction column
  z-index: 1
  border: 1px solid #333
  .container {
    wh(100%, 100%)
    position relative
  }
  .header {
    flexXY(space-between, center)
    ul {
      flexXY(center, center)
      margin: 0
      padding: 0
      list-style: none
      li {
        cursor: pointer
        padding: 0 6px
        &:hover {
          color: $color-light
        }
        &:last-child {
          padding-right: 0
        }
      }
    }
  }
}
</style>

<style lang="stylus">
.gl-viewport canvas {
  width: 100%
  height: 100%
}
</style>