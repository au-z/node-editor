import Vue from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'

import {onMounted} from '@vue/composition-api'
import useContext from './useContext'

export default {
  store: {
    namespaced: true,
    state: {
      camera: null,
      scene: null,
      light: null,
      renderer: null,
      controls: null,
      composer: null,
    },
    mutations: {
      assignState: (state, obj) => Object.entries(obj).forEach(([key, value]) => {
        if (state[key] == null) Vue.set(state, key, value)
      }),
    },
  },
  init(ctx, props) {
    const store = ctx.root.$store
    let el

    onMounted(() => {
      el = ctx.refs.container
      if(!el) throw new Error('No container ref found.')

      const ASPECT_RATIO = el.clientWidth / el.clientHeight
      const W = el.clientWidth
      const H = el.clientHeight
      // const camera = new THREE.PerspectiveCamera(60, ASPECT_RATIO, 1, 1000)
      const camera = new THREE.OrthographicCamera(-0.5, 0.5, -0.5, 0.5, 0.01, 1000)
      camera.position.set(0, 0, -1)

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x343537)

      const light = new THREE.HemisphereLight(0xffffff, 0xffffff)
      scene.add(light)

      // scene.add(new THREE.AxesHelper(1))

      const renderer = new THREE.WebGLRenderer({antialias: true})
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(el.clientWidth, el.clientHeight)
      renderer.gammaOutput = false
      el.appendChild(renderer.domElement)

      const composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))

      const controls = new OrbitControls(camera, renderer.domElement)
      // controls.target.set(0, 0, 0)
      // controls.update()

      store.commit('gl/assignState', {camera, scene, light, renderer, composer})

      animate()

      function animate() {
        requestAnimationFrame(animate)
        composer.render()
      }
    })
  },
  useContext,
}
