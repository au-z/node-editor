import {computed, watch, ref, Ref} from '@vue/composition-api'
import * as THREE from 'three'
import GL from 'src/gl/GL'

export default function useAsTexture(ctx, props) {
  const {scene} = GL.useContext()

  let material = new THREE.MeshBasicMaterial()
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
  plane.rotateZ(Math.PI)
  scene.add(plane)

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