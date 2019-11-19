<template>
  <div :class="['menu menu-add-node', {show}]" v-keybind="keybind"
    :style="{
      left: `${pos[0]}px`,
      top: `${pos[1]}px`,
    }"
    @click="show = false">
    <div class="header">Add</div>
    <div class="content">
      <ul>
        <li v-for="(nodes, type) of nodeTypes" :key="type" @mouseover="showSubMenu(type)">{{type}}
          <div class="submenu nodes" v-show="submenuShow[type]">
            <button v-for="n in nodes" :key="n.is" @click="createNode(n.name, n.is)">
              <i class="far fa-dot-circle"/>{{n.name}}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {groupBy} from 'lodash'
import useMouse from './useMouse.ts'
import Keybind from '../directives/v-keybind.ts'

export default {
  name: 'menu-add-node',
  directives: {Keybind},
  data: (vm) => ({
    submenuShow: {},
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
  computed: {
    nodeTypes() {
      const groups = groupBy(this.$store.state.nodeTemplates, 'type')
      // eslint-disable-next-line guard-for-in
      for(const key in groups) {
        Vue.set(this.submenuShow, key, false)
      }
      return groups
    },
  },
  methods: {
    createNode(name, type) {
      this.$store.commit('node:create', {type, name, pos: this.mouseState.pos})
    },
    showSubMenu(type) {
      Object.keys(this.submenuShow).forEach((key) => this.submenuShow[key] = (key === type))
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
  boxShadow(26, 26, 30, 0.3)
  display: none
  z-index: 2
  &.show {
    display: flex
  }
  & > div.content {
    width: 100%
    background: darken($color-grid, 10%)
    flexXY(center, start)
    flex-direction: column
  }
  ul {
    width: 100%
    list-style none
    margin: 0
    padding: 0
    font-family 'Consolas', monospace
    li {
      position relative
      cursor: pointer
      div.submenu {
        absPos(0, auto, auto, 100%)
        width: 200px
      }
    }
  }
  button, li {
    flexXY(start, center)
    width: 100%
    padding: 3px 6px
    text-align: left
    font-family 'Consolas', monospace
    font-size: 0.8rem
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