import {ShaderMaterial, UniformsUtils} from 'three/build/three.module.js'
import {Pass} from 'three/examples/jsm/postprocessing/Pass.js'

const CustomPass = function(shader, meta) {
  Pass.call(this)

  this.meta = meta

  this.reset(shader)
}

CustomPass.prototype = Object.assign(Object.create(Pass.prototype), {
  constructor: CustomPass,

  render: function(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    this.uniforms['tDiffuse'].value = readBuffer.texture
    this.uniforms['tSize'].value.set(readBuffer.width, readBuffer.height)

    if(this.renderToScreen) {
      renderer.setRenderTarget(null)
      this.fsQuad.render(renderer)
    } else {
      renderer.setRenderTarget(writeBuffer)
      if(this.clear) renderer.clear()
      this.fsQuad.render(renderer)
    }
  },

  reset: function(shader) {
    this.uniforms = UniformsUtils.clone(shader.uniforms)
    this.material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shader.vs,
      fragmentShader: shader.fs,
    })

    this.fsQuad = new Pass.FullScreenQuad(this.material)
  }
})

export {CustomPass}
