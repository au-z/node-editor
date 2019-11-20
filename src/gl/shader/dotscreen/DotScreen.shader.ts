import {Vector2} from 'three'
import {IShader, Uniform} from '../IShader'

export default function DotScreenShader(_uniforms: any = {}): IShader {
  const uniforms = {
    tDiffuse: new Uniform(null),
    tSize: new Uniform(new Vector2(256, 256)),
    center: _uniforms.center || new Uniform(new Vector2(0.5, 0.5)),
    angle: _uniforms.angle || new Uniform(1.57),
    scale: _uniforms.scale || new Uniform(1.0),
  }

  const vs = require('./dotScreen.vert')
  const fs = require('./dotScreen.frag')

  return {
    uniforms,
    fs,
    vs,
  }
}