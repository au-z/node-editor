<template>
  <div class="node-toolbar">
    <save-load/>
    <!-- <div class="tools">
      <button class="nodes" @click="addNode" title="Add Node">
        <i class="fas fa-plus"></i>
      </button>
      <button class="nodes" @click="copyNodes" title="Copy Nodes">
        <i class="fas fa-project-diagram"></i>
      </button>
      <button class="nodes" title="Not Implemented">
        <i class="fas fa-lock"></i>
      </button>
      <button class="nodes" title="Not Implemented">
        <i class="fas fa-unlock"></i>
      </button>
    </div> -->
    <div class="spacer"></div>
    <ul class="viewports">
      <li @click="() => $store.commit('ui:set', {name: 'gl-viewport', show: true})">
        <i class="fas fa-window-maximize"></i>
      </li>
    </ul>
    <cmd-tool/>
  </div>
</template>

<script>
import CmdTool from './cmd-tool.vue'
import SaveLoad from '../storage/save-load.vue'

export default {
  name: 'node-toolbar',
  components: {CmdTool, SaveLoad},
  methods: {
    copyNodes() {
      const nodes = this.$store.getters.nodes.map((n) => ({name: n.name, pos: JSON.stringify(n.pos)}))
      console.log(nodes)
    },
    addNode() {
      console.warn('Not Implemented!')
    },
  },
}
</script>

<style lang="stylus">
@require '~style/variables.styl'
@require '~style/mixins.styl'

.node-toolbar {
  absPos(0, auto, auto, 0)
  wh(100%, 40px)
  flexXY(space-between, space-between)
  background: $color-grid
  z-index: 1
  .tools {
    flexXY(center, center)
    wh(auto, 100%)
  }
  div.spacer {
    flex: 1
  }
  button {
    flexXY(center, center)
    wh(40px)
    border: 0
    background: none
    border-right: 2px solid $color-dark-1
    color: $color-med
    cursor: pointer
    &:hover {
      background: rgba($color-dark-1, 0.5)
    }
    &:first-child {
      border-left: 0
    }
    &:last-child {
      border-right: 0
    }
  }
  & > * {
    border-right: 2px solid $color-dark-1
    &:first-child {
      border-left: 2px solid $color-dark-1
    }
  }
  ul.viewports {
    wh(auto, 100%)
    flexXY(center, center)
    list-style: none
    margin: 0
    padding: 0 36px
    li {
      padding: 8px
      color: $color-bg
      cursor: pointer
    }
  }
}
</style>