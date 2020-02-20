import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const waitImpatiently = () => new Promise((res) => requestAnimationFrame(res))

export default (function GL() {
  let context: any
  let el: HTMLElement

  const onRenderFns: Function[] = []
  function onRender(fn) {
    onRenderFns.push(fn)
  }

  function animate(dt) {
    requestAnimationFrame(animate)
    // context.composer.render()

    onRenderFns.forEach((fn) => fn())
  }

  function resize(W, H) {
    context.camera.aspect = W / H
    context.camera.updateProjectionMatrix()
    context.renderer.setSize(W, H)
  }

  function registerElement(id: string, renderer: THREE.WebGLRenderer) {

    const el = document.getElementById(id)
    if(!el) return waitImpatiently().then(() => registerElement(id, renderer))

    console.log(id, el, renderer)
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    return Promise.resolve(el)
  }

  function init() {
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, -0.5, 0.5, 0.01, 1000)
    camera.position.set(0, 0, -1)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x343537)

    const light = new THREE.HemisphereLight(0xffffff, 0xffffff)
    scene.add(light)

    // scene.add(new THREE.AxesHelper(1))

    const renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.gammaOutput = false

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enabled = true

    context = {
      camera,
      scene,
      light,
      renderer,
      controls,
      resize,
      onRender,
    }

    animate(performance.now())
    return context
  }

  return {
    useContext: (id?) => {
      const ctx = context ? context : init()
      if(id && ctx) {
        registerElement(id, ctx.renderer).then(() => {
          console.log('mounted')
        })
      }
      return ctx
    },
  }
})()
