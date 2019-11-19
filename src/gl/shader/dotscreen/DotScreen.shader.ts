import {Vector2} from 'three'
import {IShader, Uniform} from '../IShader'

export default function DotScreenShader(): IShader {
  const uniforms = {
    tDiffuse: new Uniform(null),
    tSize: new Uniform(new Vector2(256, 256)),
    center: new Uniform(new Vector2(0.5, 0.5)),
    angle: new Uniform(1.57),
    scale: new Uniform(1.0),
  }

  const vs = require('./dotScreen.vert')
  const fs = require('./dotScreen.frag')

  return {
    uniforms,
    fs,
    vs,
  }
}