import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {Port} from '../nodes/usePorts'
import {Node} from '../nodes/useNode'

interface Edge {
  node: string,
  port: string,
}

interface NodeTemplate {
  type: string,
  name: string,
  is: string,
}

function insertAssignById(obj, value) {
  if (obj[value.id]) {
    obj[value.id] = value
  } else {
    Vue.set(obj, value.id, value)
  }
}

function buildNode(node): Node {
  return {
    type: node.type,
    id: node.id || Math.random().toString(36).substr(2, 9),
    name: node.name,
    el: null,
    pos: node.pos,
    in: node.in ? node.in.map((port) => ({...port, value: null})) : {},
    out: node.out ? node.out.map((port) => ({...port, value: null})) : {},
    display: {
      dirty: false,
      selected: false,
    },
    state: {},
  }
}

export default new Vuex.Store({
  state: {
    nodes: {} as Record<string, Node>,
    edges: {},
    nodeTemplates: [] as NodeTemplate[],
    cmd: {
      edge: {from: null, to: null},
    },
    ui: {
      'gl-viewport': {
        show: false,
      },
    },
  },
  getters: {
    nodes: (state) => Object.values(state.nodes),
    nodeById: (state, getters) => (id) => getters.nodes.find((n) => n.id === id),
    nodeByName: (state, getters) => (name) => getters.nodes.find((n) => n.name === name),
    selectedNodes: (state, getters) => getters.nodes.filter((n) => n.display.selected),
    dirtyNodes: (state, getters) => getters.nodes.filter((n) => n.display.dirty),
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
    edgesByNodeId: (state, getters) => (nodeId) => {
      const node = getters.nodeById(nodeId)
      const inEdges = Object.keys(node.in).map((key) => getters.edge(node.id, key))
      const outEdges = Object.keys(node.out).map((key) => getters.edgesOut(node.id, key).map(([key, value]) => key)).flat()
      return [...inEdges, ...outEdges]
    },

    cmd: (state) => (type) => state.cmd[type],
  },
  mutations: {
    'node:register': (state, template: NodeTemplate) => state.nodeTemplates.push(template),
    'node:create': (state, node) => insertAssignById(state.nodes, buildNode(node)),
    'node:persistState': (state, {id, key, value}) => Vue.set(state.nodes[id].state, key, value),
    'node:setPosition': (state, {id, pos}) => {
      state.nodes[id].pos = pos
      state.nodes[id].display.dirty = true
    },
    'node:initInputPorts': (state, {id, ports}) => {
      Object.entries(ports).forEach(([name, port]) => Vue.set(state.nodes[id].in, name, {name, ...port}))
    },
    'node:initOutputPorts': (state, {id, ports}) => {
      Object.entries(ports).forEach(([name, port]) => Vue.set(state.nodes[id].out, name, {name, ...port}))
    },
    'node:attachElement': (state, {id, el}) => state.nodes[id].el = el,

    'node:select': (state, id) => {
      Object.values(state.nodes).forEach((n) => n.display.selected = n.id === id)
    },
    'node:selectAll': (state, value) => {
      if(Object.values(state.nodes).every((n) => n.display.selected) || value === false) {
        Object.values(state.nodes).forEach((n) => n.display.selected = false)
      } else {
        Object.values(state.nodes).forEach((n) => n.display.selected = true)
      }
    },

    'node:clean': (state, id) => state.nodes[id].display.dirty = false,

    'node:disconnect': (state, edges) => edges.forEach((e) => Vue.delete(state.edges, e)),
    'node:deleteSelected': (state, nodeIds) => nodeIds.forEach((id) => Vue.delete(state.nodes, id)),

    'port:setRelativePos': (state, {id, port, pos, isInput}) => state.nodes[id][isInput ? 'in' : 'out'][port].relativePos = pos,
    'port:set': (state, {id, port, value}) => state.nodes[id].out[port].value = value,

    'edges:import': (state, edges) => state.edges = edges,
    'edge:connect': (state, {from, to}) => {
      console.log(state.edges, from, to)
      const edgeId = `${to.node}.${to.port}`
      if (state.edges[edgeId]) {
        state.edges[edgeId] = from
      } else {
        Vue.set(state.edges, edgeId, from)
      }

      state.nodes[from.node].out[from.port].connected = true
      state.nodes[to.node].in[to.port].connected = true

      state.nodes[from.node].display.dirty = true
      state.nodes[to.node].display.dirty = true

      state.cmd.edge.from = null
      state.cmd.edge.to = null
    },
    'edge:disconnect': (state, {node, port}) => {
      Vue.delete(state.edges, `${node}.${port}`)
      state.nodes[node].display.dirty = true
    },

    'cmd:edge:create': (state, {node, port, type}) => {
      state.cmd.edge[type] = {node, port}
    },

    'ui:set': (state, {name, ...properties}) => Object.entries(properties)
      .forEach(([key, value]) => Vue.set(state.ui[name], key, value)),
  },
})
