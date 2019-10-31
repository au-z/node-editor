<template>
  <div class="node-editor">
    <base-grid>
      <ne-node :id="n.id" v-for="n in $store.getters.nodes" :key="`${n.type}_${n.id}`"></ne-node>
    </base-grid>
  </div>
</template>

<script>
export default {
  name: 'node-editor',
}
</script>
