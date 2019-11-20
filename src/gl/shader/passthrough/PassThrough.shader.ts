import {IShader, Uniform} from '../IShader'
import { Vector2 } from 'three'

export default function PassThroughShader(_uniforms: any = {}): IShader {
  return {
    uniforms: {
      tDiffuse: new Uniform(null),
      tSize: new Uniform(new Vector2(256, 256)),
    },
    fs: require('./passThrough.frag'),
    vs: require('./passThrough.vert'),
  }
}