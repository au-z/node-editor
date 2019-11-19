class Uniform {
  constructor(public value: any) {}
}

interface UniformMap {
  [name: string]: Uniform
}

interface IShader {
  uniforms: UniformMap,
  fs: string,
  vs: string,
}

export {
  Uniform,
  UniformMap,
  IShader,
}