import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { Pass } from 'three/examples/jsm/postprocessing/Pass'

interface RegisteredPass {
  passId: string
  pass: Pass
}

interface PostProcessorArguments {
  composer: EffectComposer,
  [prop: string]: any,
}

export default function PostProcessor() {
  let instance
  let composer: EffectComposer

  const passes = [] as any[]

  const registerPass = (pass: Pass) => {
    const passId = Math.random().toString(36).substr(2, 7)
    passes.push({passId, pass})
    return
  }

  const removePass = (passId: string) => {
    const passIdx = passes.findIndex((p) => p.passId === passId)
    if(passIdx < 0) return false
    passes.splice(passIdx, 1)
    return true
  }

  const init = (composer: EffectComposer) => {
    this.composer = composer

    instance = {
      registerPass,
      removePass,
      passes,
    }

    return instance
  }

  return {getInstance: (...args: PostProcessorArguments) => instance ?  instance : init(...args)}
}
