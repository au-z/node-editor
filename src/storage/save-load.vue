<template>
  <div class="save-load">
    <button title="Save" @click="saveProgress">
      <i class="fas fa-save" style="color: #8fc"></i>
    </button>
    <button title="Load" @click="() => loadFromToken(saveState.token)">
      <i class="fas fa-upload" style="color: #8cf"></i>
    </button>
    <input type="text" v-model="saveState.token"/>
  </div>
</template>

<script>
import useLocalStorage from './useLocalStorage.ts'

export default {
  name: 'save-load',
  setup(props, ctx) {
    const {saveState, saveProgress, loadFromToken} = useLocalStorage(ctx)

    return {
      saveState,
      saveProgress,
      loadFromToken,
    }
  },
  created() {
    if (this.$route.query.session) {
      this.loadFromToken(this.$route.query.session)
    }

    this.$watch('saveState.token', (token) => {
      this.$router.replace({query: {session: token}})
    })
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.save-load{
  flexXY(center, center)
  input {
    width: 9em
  }
}
</style>