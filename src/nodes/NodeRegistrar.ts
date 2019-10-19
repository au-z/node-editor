import Vue from 'vue'

export default function NodeRegistrar(store: any) {
  registerNode([
    {type: 'color', node: require('./color/node-rgb').default},
    {type: 'color', node: require('./color/node-hue').default},
    {type: 'color', node: require('./math/node-blend').default},
    {type: 'color', node: require('./color/node-out').default},

    {type: 'vector', node: require('./vector/node-vec3-slice').default},
    {type: 'vector', node: require('./vector/node-vec3-combine').default},
  ])

  function registerNode(components) {
    components.forEach(({type, node}) => {
      store.commit('node:register', {type, name: node.name, is: node.name})
      Vue.component(node.name, node)
    })
  }
}
