import { Pass } from 'three/examples/jsm/postprocessing/Pass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import GL from 'src/gl/GL'

interface IPostProcessor {
  composer: any
  createPass(pass: Pass)
  updatePass(passId: string, pass: Pass)
  removePass(passId: string)
  passes: any[]
}

export default (function PostProcessor() {
  const {scene, camera, renderer} = GL.useContext()
  let instance: IPostProcessor

  const passes = [] as any[]

  const composer = (function() {
    let instance: any
    let value: EffectComposer

    const init = () => {
      value = new EffectComposer(renderer)
      value.addPass(new RenderPass(scene, camera))

      instance = {
        value,
        refresh: init
      }

      return instance
    }

    return {
      getInstance: () => instance ? instance : init()
    }
  })()

  const createPass = (pass: Pass) => {
    const passId = Math.random().toString(36).substr(2, 7)
    passes.push({passId, pass})
    return passId
  }

  const updatePass = (passId: string, pass: Pass) => {
    const existingPass = passes.find((p) => p.passId === passId)
    if(!existingPass) return
    existingPass.pass = pass
  }

  const removePass = (passId: string) => {
    const passIdx = passes.findIndex((p) => p.passId === passId)
    if(passIdx < 0) return false
    passes.splice(passIdx, 1)
    return true
  }

  const init = () => {
    instance = {
      composer: composer.getInstance(),
      createPass,
      updatePass,
      removePass,
      passes,
    }

    return instance
  }

  return {
    getInstance: (): IPostProcessor => instance ?  instance : init()
  }
})()
