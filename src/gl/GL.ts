import Vue from 'vue'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'

export default (() => {
  let context: any

  function animate() {
    requestAnimationFrame(animate)
    context.composer.render()
  }

  function init(el) {
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
    controls.enabled = false

    context = {camera, scene, light, renderer, controls, composer}

    animate()
    return context
  }

  return {
    useContext: (el?) => context ? context : init(el)
  }
})()
