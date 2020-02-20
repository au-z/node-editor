<template>
  <div v-show="ui.show" class="node ne-node gl-viewport" v-draggable="draggable"
    :style="{
      width: `${ui.width || 512}px`,
      height: `${ui.height || 512}px`,
    }">
    <div class="header">
      <span>Post Processing</span>
      <ul class="window-fn">
        <li @click="hide" title="Close Window"><i class="fas fa-times"></i></li>
      </ul>
    </div>
    <div id="gl-viewport" class="container" @mouseover="toggleDrag(false)" @mouseleave="toggleDrag(true)"></div>
  </div>
</template>

<script>
import GL from 'src/gl/GL.ts'

export default {
  name: 'gl-viewport',
  data: () => ({
    gl: null,
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
  mounted() {
    this.gl = GL.useContext('gl-viewport')
    this.$watch('ui', (ui) => {
      if(!this.gl || !ui.width || !ui.height) return
      this.gl.resize(ui.width, ui.height)
    }, {deep: true})
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.gl-viewport {
  absPos(80px, 16px, inherit, inherit)
  flexXY(start, start)
  flex-direction column
  z-index: 1
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