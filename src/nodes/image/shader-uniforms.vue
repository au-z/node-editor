<template>
  <div class="shader-uniforms">
    <div class="input" v-for="(uniform, key) of value" :key="key">
      <label>{{key}}</label>
      <input v-if="valueType(uniform.value) === 'number'" type="number" step="0.01" v-model.number="value[key].value"/>
      <div v-else-if="valueType(uniform.value) === 'vector2'">
        {{uniform.value}}
      </div>
      <input v-else type="text" v-model="value[key].value"/>
    </div>
    {{value}}
  </div>
</template>

<script>
export default {
  name: 'shader-uniforms',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    valueType(value) {
      if(typeof value === 'number') return 'number'
      if(value && value.x && value.y) return 'vector2'
      return 'object'
    },
  },
  created() {
    this.$watch('value', (value) => this.$emit('input', value), {deep: true})
  },
}
</script>

<style lang="stylus" scoped>
.shader-uniforms {
  div.input {
    & > * {
      margin: 2px 0
    }
    & > div {
      display: inline-block
    }
    & > input, input[type=number] {
      width: 5em
    }
  }
}
</style>