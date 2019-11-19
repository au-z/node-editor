import {computed, watch, ref, Ref} from '@vue/composition-api'
import * as THREE from 'three'
import GL from 'src/gl/GL'

export default function useAsTexture(ctx, props) {
  const glContext = GL.useContext(ctx, props)

  let material = new THREE.MeshBasicMaterial()
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
  plane.rotateZ(Math.PI)
  glContext.scene.value.add(plane)

  const url: Ref<string> = computed(() => (!props.blob) ? '' : URL.createObjectURL(props.blob))
  const aspectRatio: Ref<number> = ref(1)

  const onTextureLoad = (texture) => {
    aspectRatio.value = texture.image.naturalWidth / texture.image.naturalHeight
  }

  watch(url, (url) => {
    const texture = new THREE.TextureLoader().load(url, onTextureLoad)
    material.map = texture
  })

  return {
    url,
    aspectRatio,
  }
}