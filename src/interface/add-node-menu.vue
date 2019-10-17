<template>
  <div :class="['menu add-node-menu', {show}]" v-keybind="keybind"
    :style="{
      left: `${pos[0]}px`,
      top: `${pos[1]}px`,
    }"
    @click="show = false">
    <div class="header">Add</div>
    <div class="content">
      <button @click="createNode('RGB Color', 'node-rgb')">
        <i class="far fa-dot-circle"/>RGB Color
      </button>
      <button @click="createNode('Hue', 'node-hue')">
        <i class="far fa-dot-circle"/>Hue
      </button>
      <button @click="createNode('Preview', 'node-out')">
        <i class="far fa-dot-circle"/>Preview
      </button>
      <button @click="createNode('Slice', 'node-vec3-slice')">
        <i class="far fa-dot-circle"/>Slice
      </button>
      <button @click="createNode('Combine', 'node-vec3-combine')">
        <i class="far fa-dot-circle"/>Combine
      </button>
    </div>
  </div>
</template>

<script>
import useMouse from './useMouse.ts'
import Keybind from '../directives/v-keybind.ts'

export default {
  name: 'add-node-menu',
  directives: {Keybind},
  data: (vm) => ({
    show: false,
    pos: [400, 400],
    keybind: {
      bindings: [
        {key: 'shift+a', fn(e) {
          vm.pos = vm.mouseState.pos
          vm.show = true
        }},
      ],
    },
  }),
  methods: {
    createNode(name, type) {
      this.$store.commit('node:create', {type, name, pos: this.mouseState.pos})
    },
  },
  setup(props, ctx) {
    const {mouseState} = useMouse.getInstance()

    return {
      mouseState,
    }
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.add-node-menu {
  absPos(0, auto, auto, 0)
  min-width: 5em
  flexXY(center, center)
  flex-direction column
  boxShadow(26, 26, 30, 4)
  display: none
  z-index: 2
  &.show {
    display: flex
  }
  & > div.content {
    background: darken($color-grid, 10%)
    flexXY(center, start)
    flex-direction: column
  }
  button {
    flexXY(start, center)
    width: 100%
    padding: 3px 6px
    text-align: left
    font-family 'Consolas', monospace
    font-size: 0.8em
    border: 0
    border-bottom: 1px solid $color-grid
    background: $color-med
    color: $color-bg
    &:hover {
      background: darken($color-active, 10%)
    }
    &:last-child {
      border-bottom: none
    }
    & > i {
      margin-right: 8px
      font-size: 0.6em
    }
  }
}
</style>