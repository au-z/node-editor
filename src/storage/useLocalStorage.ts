import md5 from 'blueimp-md5'
import { computed, reactive, ref } from '@vue/composition-api'

interface EditorState {
  nodes: any[],
  edges: Object,
}

const ls = (() => {
  const dataToken = (data) => md5(data).substr(0, 12)

  const set = (data: any, token): string => {
    const json = JSON.stringify(data)
    token = token || dataToken(json)
    window.localStorage.setItem(token, json)
    return token
  }

  const get = (token): any => {
    const json = window.localStorage.getItem(token)
    return json && JSON.parse(json)
  }

  const remove = (token): void => window.localStorage.removeItem(token)

  return {
    set,
    get,
    remove,
  }
})()

export default (function useLocalStorage() {
  let instance: any = null

  let ctx: any = null
  let store: any = null
  let nodes: any = null
  let edges: any = null
  let saveState: any = null

  const init = (_ctx) => {
    ctx = _ctx
    store = ctx.root.$store
    nodes = computed(() => store.getters.nodes)
    edges = computed(() => store.state.edges)

    saveState = reactive({
      token: null as string | null,
      state: null as any,
    })

    instance = {
      saveProgress,
      loadFromToken,
      nodeState,
      saveState,
    }

    return instance
  }

  const saveProgress = () => {
    if(!nodes) return console.warn('Nothing to save.')
    saveState.token = ls.set({
      nodes: nodes.value.map((node) => ({...node, el: null})),
      edges: edges.value,
    }, saveState.token)
  }

  const loadFromToken = (token) => {
    const data: EditorState = ls.get(token)
    if(!data) return console.error('Node editor state not found.')

    data.nodes.forEach((n) => store.commit('node:create', {type: n.type, id: n.id, name: n.name, pos: n.pos}))
    if(data.edges) {
      store.commit('edges:import', data.edges)
    }
    saveState.state = data
    saveState.token = token
  }

  const nodeState = (id): Ref<any> => computed(() => {
    const storedNode = saveState?.state?.nodes.find((n) => n.id === id);
    return (storedNode) ? storedNode.state : ref(null)
  })

  return {
    getInstance: (_ctx) => instance ? instance : init(_ctx)
  }
})()