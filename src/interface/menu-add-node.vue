<template>
  <div :class="['menu menu-add-node', {show}]" v-keybind="keybind"
    :style="{
      left: `${pos[0]}px`,
      top: `${pos[1]}px`,
    }"
    @click="show = false">
    <div class="header">Add</div>
    <div class="content">
      <button v-for="t in $store.state.nodeTemplates" :key="t.is" @click="createNode(t.name, t.is)">
        <i class="far fa-dot-circle"/>{{t.name}}
      </button>
    </div>
  </div>
</template>

<script>
import useMouse from './useMouse.ts'
import Keybind from '../directives/v-keybind.ts'

export default {
  name: 'menu-add-node',
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

.menu-add-node {
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