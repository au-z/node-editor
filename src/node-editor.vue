<template>
  <div class="node-editor">
    <node-toolbar/>
    <menu-add-node/>

    <ne-grid>
      <ne-node :id="n.id" v-for="n in $store.getters.nodes" :key="`${n.type}_${n.id}`"></ne-node>
    </ne-grid>

    <gl-viewport id="preview"/>
  </div>
</template>

<script>
import NodeToolbar from 'src/toolbar/node-toolbar.vue'
import MenuAddNode from 'src/interface/menu-add-node.vue'

import GlViewport from 'src/gl/gl-viewport.vue'

export default {
  name: 'node-editor',
  components: {NodeToolbar, MenuAddNode, GlViewport},
}
</script>
