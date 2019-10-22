<template>
  <div class="node-data" v-preserve="form">
    <textarea ref="textarea" v-model="form.input" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
import PortBinding from '../PortBinding.ts'
import Preserve from '../../directives/v-preserve.ts'
import useLocalStorage from '../../storage/useLocalStorage'

export default {
  name: 'node-data',
  directives: {Preserve},
  mixins: [PortBinding({
    outputs: {json: {type: 'object', binding: 'json'}},
  })],
  data: () => ({
    form: {input: ''},
  }),
  computed: {
    json() {
      return JSON.parse(JSON.stringify(this.form.input))
    },
  },
  setup(props, ctx) {
    const {nodeState} = useLocalStorage.getInstance(ctx)

    return {
      nodeState,
    }
  },
  created() {
    const saveState = this.nodeState(this.node.id)
    if (saveState.value.form) {
      this.form = saveState.value.form
    }
  },
  mounted() {
    /* eslint-disable no-invalid-this */
    this.$refs.textarea.addEventListener('keydown', function(e) {
      if (e.keyCode === 9 || e.which === 9) {
        e.preventDefault()
        const s = this.selectionStart
        this.value = this.value.substring(0, this.selectionStart) + '    ' + this.value.substring(this.selectionEnd)
        this.selectionEnd = s+1
      }
    })
  },
}
</script>

<style lang="stylus" scoped>
.node-data{

}
</style>