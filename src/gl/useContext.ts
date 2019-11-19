import {ref} from '@vue/composition-api'

export default function useContext(ctx, props) {
  const store = ctx.root.$store
  const camera = ref(store.state.gl.camera)
  const composer = ref(store.state.gl.composer)
  const renderer = ref(store.state.gl.renderer)
  const scene = ref(store.state.gl.scene)

  return {
    camera,
    composer,
    renderer,
    scene,
  }
}