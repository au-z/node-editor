<template>
  <div class="app">
    <base-grid>
      <node-base :id="n.id" v-for="n in $store.getters.nodes" :key="n.id"></node-base>
    </base-grid>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="stylus" scoped>
.app{
  border: 1px solid red
}
</style>
