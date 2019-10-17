import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {Port} from '../nodes/usePorts'

interface Edge {
  node: string
  port: string
}

function insertAssign(obj, key, value) {
  if (obj[key]) {
    obj[key] = value
  } else {
    Vue.set(obj, key, value)
  }
}

function Node(node) {
  return {
    type: node.type,
    id: node.id || Math.random().toString(36).substr(2, 9),
    name: node.name,
    el: null,
    pos: node.pos,
    in: node.in ? node.in.map((port) => ({...port, value: null})) : {},
    out: node.out ? node.out.map((port) => ({...port, value: null})) : {},
    dirty: false,
    selected: false,
  }
}

export default new Vuex.Store({
  state: {
    nodes: {},
    edges: {},
    cmd: {
      edge: {from: null, to: null},
    },
  },
  getters: {
    nodes: (state) => Object.values(state.nodes),
    nodeById: (state, getters) => (id) => getters.nodes.find((n) => n.id === id),
    nodeByName: (state, getters) => (name) => getters.nodes.find((n) => n.name === name),
    dirtyNodes: (state, getters) => getters.nodes.filter((n) => n.dirty),
    nodeInputs: (state, getters) => (id) => {
      const node = getters.nodeById(id)
      return (Object.values(node.in) as Port[]).map((port: Port) => {
        const from = getters.edge(id, port.name)
        if(from) {
          return {...node.in[port.name], value: getters.nodeById(from.node).out[from.port].value}
        } else {
          return node.in[port.name]
        }
      })
    },

    portPos: (state, getters) => (nodeId, portName, isInput) => {
      const node = getters.nodeById(nodeId)
      const port = node[isInput ? 'in' : 'out'][portName]

      if(!port.relativePos) {
        return [node.pos[0], node.pos[1]]
      }

      return [node.pos[0] + port.relativePos[0], node.pos[1] + port.relativePos[1]]
    },

    edge: (state) => (node, port) => state.edges[`${node}.${port}`],
    edgesOut: (state) => (node, port) => (Object.entries(state.edges) as [string, Edge][])
      .filter(([key, value]) => value && value.node === node && value.port === port),

    cmd: (state) => (type) => state.cmd[type],
  },
  mutations: {
    'node:create': (state, node) => {
      const n = Node(node)
      insertAssign(state.nodes, n.id, n)
    },
    'node:select': (state, id) => {
      Object.values(state.nodes).forEach((n) => n.selected = n.id === id)
    },
    'node:selectAll': (state, value) => {
      if(Object.values(state.nodes).every((n) => n.selected) || value === false) {
        Object.values(state.nodes).forEach((n) => n.selected = false)
      } else {
        Object.values(state.nodes).forEach((n) => n.selected = true)
      }
    },
    'node:setPosition': (state, {id, pos}) => {
      state.nodes[id].pos = pos
      state.nodes[id].dirty = true
    },
    'node:initPorts': (state, {id, areInputs, ports}) => {
      Object.keys(ports).forEach((port) => {
        Vue.set(state.nodes[id][areInputs ? 'in' : 'out'], port, {name: port, ...ports[port]})
      })
    },
    'node:attachElement': (state, {id, el}) => state.nodes[id].el = el,
    'node:clean': (state, id) => state.nodes[id].dirty = false,
    'node:deleteSelected': (state, id) => {
      Object.entries(state.nodes).forEach(([id, node]) => {
        if(node.selected) {
          Vue.delete(state.nodes, id)
        }
      })
    },

    'port:set': (state, {id, port, value}) => state.nodes[id].out[port].value = value,

    'edge:connect': (state, {from, to}) => {
      const edgeId = `${to.node}.${to.port}`
      if (state.edges[edgeId]) {
        state.edges[edgeId] = from
      } else {
        Vue.set(state.edges, edgeId, from)
      }

      state.nodes[from.node].dirty = true
      state.nodes[to.node].dirty = true

      state.cmd.edge.from = null
      state.cmd.edge.to = null
    },

    'cmd:edge:create': (state, {node, port, type}) => {
      state.cmd.edge[type] = {node, port}
    },
  },
})
