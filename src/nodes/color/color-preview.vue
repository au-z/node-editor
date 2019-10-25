<template>
  <div class="color-preview" :style="{background: hex}">
    <span>{{hex}}</span>
  </div>
</template>

<script>
export default {
  name: 'color-preview',
  props: {
    hex: {
      type: String,
      default: '#000000',
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.color-preview {
  flexXY(center, center)
  absPos(0, auto, auto, 1px)
  wh(calc(100% - 2px), 5px)
  overflow: hidden
  transition: 0.4s height ease
  &::after {
    content: '\f141'
    font-family: 'Font Awesome 5 Free'
    font-weight: 900
    color: rgba(0, 0, 0, 0.5)
    font-size: 0.7em
    absPos(auto, auto, -0.34em, 50%)
    transform: translate(-50%, 0)
  }
  &:hover {
    height: calc(100% - 1px)
    span {
      display: inline-block
      color: rgba(0, 0, 0, 0.5)
    }
  }
  span {
    display: none
    font-weight: bold
    transition: 0.3s opacity ease
  }
}
</style>