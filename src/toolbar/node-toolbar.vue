<template>
  <div class="node-toolbar">
    <div class="tools">
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
    </div>
    <cmd-tool/>
    <node-tool/>
  </div>
</template>

<script>
import CmdTool from './cmd-tool.vue'
import NodeTool from './node-tool.vue'

export default {
  name: 'node-toolbar',
  components: {CmdTool, NodeTool},
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
  flexXY(center, space-between)
  background: $color-grid
  .tools {
    flexXY(center, center)
    wh(auto, 100%)
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
}
</style>