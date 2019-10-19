enum Datatype {
  boolean = 'boolean',
  int = 'int',
  float = 'float',
  string = 'string',
  vec2 = 'vec2',
  vec3 = 'vec3',
  vec4 = 'vec4',
  rgb = 'rgb',
  object = 'object',
}

const DatatypeProperties = {
  [Datatype.boolean]: {
    range: null,
  },
  [Datatype.float]: {
    range: null,
  },
  [Datatype.string]: {
    range: null,
  },
  [Datatype.vec2]: {
    range: null,
  },
  [Datatype.vec3]: {
    range: null,
  },
  [Datatype.vec4]: {
    range: null,
  },
  [Datatype.rgb]: {
    range: [0, 255],
  },
  [Datatype.object]: {
    range: null,
  },
}

export {
	Datatype,
	DatatypeProperties,
}
