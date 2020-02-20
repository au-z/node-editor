<template>
  <div class="img-filter" v-preserve="form">
    <div class="header">
      <!-- <i class="fas fa-redo" @click="refreshFilter"></i> -->
    </div>
    <select v-model="filter" v-preserve="filter">
      <option value="PASS-THROUGH">Pass Through</option>
      <option value="DOT-SCREEN">Dot Screen</option>
    </select>
    <!-- <shader-uniforms v-model="uniforms"/> -->
  </div>
</template>

<script>
import PortBinding from '../PortBinding'
import useGlFilter from './useGlFilter.ts'
import Preserve from '../../directives/v-preserve.ts'
import useLocalStorage from '../../storage/useLocalStorage'
import ShaderUniforms from './shader-uniforms.vue'

export default {
  name: 'img-filter',
  components: {ShaderUniforms},
  directives: {Preserve},
  mixins: [PortBinding({
    inputs: {
      input: {type: 'array', default: []},
    },
    outputs: {
      output: {type: 'array', value: [], binding: 'filterArray'},
    },
  })],
  data: () => ({
    form: {},
  }),
  computed: {
    filterArray() {
      return this.filter === 'PASS-THROUGH' ? [...this.input] : [...this.input, this.passId]
    },
  },
  setup(props, ctx) {
    const {filter, uniforms, passId} = useGlFilter(ctx, props)
    const {nodeState} = useLocalStorage.getInstance(ctx)

    return {
      filter,
      uniforms,
      nodeState,
      passId,
    }
  },
  created() {
    const saveState = this.nodeState(this.node.id)
    if(saveState.value.form) {
      this.form = saveState.value.form
    }
    if(saveState.value.filter) {
      this.filter = saveState.value.filter
    }
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.img-filter {
  position relative
  div.header {
    absPos(-24px, 0, auto, auto)
    flexXY(flex-end, center)
    height: 16px
    i {
      padding: 0 4px
      font-size: 0.6rem
      &:hover {
        color: $color-light
      }
    }
  }
}
</style>
