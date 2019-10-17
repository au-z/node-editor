<template>
  <div class="cmd-tool">
    <div class="active-cmd">
      <div :title="cmd.from ? cmd.from.port : ''">
        <i class="far fa-circle" :class="{'active': cmd.from}">
          <i class="fas fa-circle" :class="{'active': cmd.from}"></i>
        </i>
      </div>
      <i class="fas fa-angle-right"></i>
      <div :title="cmd.to ? cmd.to.port : ''">
        <i class="far fa-circle" :class="{'active': cmd.to}">
          <i class="fas fa-circle" :class="{'active': cmd.to}"></i>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cmd-tool',
  computed: {
    cmd() {
      const cmd = this.$store.getters.cmd('edge')
      if (cmd.from && cmd.to) {
        this.$store.commit('edge:connect', {...cmd})
      }
      return cmd
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~style/variables.styl'
@require '~style/mixins.styl'

.cmd-tool {
  wh(auto, 100%)
  padding: 4px
  flexXY(center, center)
  .active-cmd {
    background: rgba(0, 0, 0, 0.3)
    padding: 4px 8px
    border-radius: 12px
    flexXY(center, center)
    & > * {
      margin: 0 8px
      &:first-child {
        margin-left: 0
      }
      &:last-child {
        margin-right: 0
      }
    }
    i.fas, i.far {
      position relative
      color: $color-med
      i {
        absPos(50%, auto, auto, 50%)
        transform: translate(-50%, -50%)
        font-size: 0.4em
        color: rgba($color-med, 0.3)
        &.active {
          color: $color-active
        }
      }
      &.active {
        color: $color-active
      }
    }
  }
  button {
    flexXY(center, center)
    wh(40px)
    border: 0
    background: none
    color: $color-med
    cursor: pointer
  }
}
</style>