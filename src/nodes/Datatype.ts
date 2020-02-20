enum Datatype {
  boolean = 'boolean',
  int = 'int',
  float = 'float',
  string = 'string',
  url = 'url',

  array = 'array',
  vec2 = 'vec2',
  vec3 = 'vec3',
  vec4 = 'vec4',
  rgb = 'rgb',

  rgbchannel = 'rgbchannel',
  object = 'object',

  arraybuffer = 'arraybuffer',
  blob = 'blob',
}

const DatatypeProperties = {
  [Datatype.boolean]: {
    range: null,
    default: false,
  },
  [Datatype.int]: {
    range: null,
    default: 0,
  },
  [Datatype.float]: {
    range: null,
    default: 0.0,
  },
  [Datatype.string]: {
    range: null,
    default: '',
  },
  [Datatype.url]: {
    range: null,
    default: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Icon_Images.svg',
  },

  [Datatype.array]: {
    range: null,
    default: [],
  },
  [Datatype.vec2]: {
    range: null,
    default: [0, 0],
  },
  [Datatype.vec3]: {
    range: null,
    default: [0, 0, 0],
  },
  [Datatype.vec4]: {
    range: null,
    default: [0, 0, 0, 0],
  },
  [Datatype.rgb]: {
    range: [0, 255],
    default: [0, 0, 0],
  },
  [Datatype.rgbchannel]: {
    range: [0, 255],
    default: 0,
  },
  [Datatype.object]: {
    range: null,
    default: {},
  },

  [Datatype.arraybuffer]: {
    range: null,
    default: new ArrayBuffer(0),
  },
  [Datatype.blob]: {
    range: null,
    default: new Blob(),
  },
}

function mapToType(type: Datatype) {
  switch(type) {
    case Datatype.boolean:
      return Boolean
    case Datatype.int:
    case Datatype.float:
    case Datatype.rgbchannel:
      return Number
    case Datatype.string:
    case Datatype.url:
      return String
    case Datatype.array:
    case Datatype.vec2:
    case Datatype.vec3:
    case Datatype.vec4:
    case Datatype.rgb:
      return Array
    case Datatype.blob:
      return Blob
    case Datatype.arraybuffer:
      return ArrayBuffer
    case Datatype.object:
    default:
      return Object
  }
}

export {
  Datatype,
  DatatypeProperties,
  mapToType,
}
