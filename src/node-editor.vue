<template>
  <div class="node-editor">
    <base-grid>
      <node-base :id="n.id" v-for="n in $store.getters.nodes" :key="n.id"></node-base>
    </base-grid>
  </div>
</template>

<script>
export default {
  name: 'node-editor',
}
</script>
