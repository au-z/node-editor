import {watch, onMounted} from '@vue/composition-api'
import * as THREE from 'three'
import GL from 'src/gl/GL'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import PostProcessor from 'src/gl/postprocessing/PostProcessor'

export default function usePostProcessing(ctx, props) {
  const {scene, renderer, camera, onRender} = GL.useContext()
  const postProcessor = PostProcessor.getInstance()

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1))
  plane.rotateZ(Math.PI)

  function applyTexture(texture) {
    plane.material = new THREE.MeshBasicMaterial({map: texture})
    if(texture) {
      scene.add(plane)
    } else {
      scene.remove(plane)
    }
  }

  function applyFilters(filters) {
    postProcessor.composer.refresh()
    postProcessor.composer.value.addPass(new RenderPass(scene, camera))

    filters.forEach((f) => {
      postProcessor.composer.value.addPass(f)
    })

    onRender(postProcessor.composer.value.render)
  }

  return {
    applyTexture,
    applyFilters,
  }
}