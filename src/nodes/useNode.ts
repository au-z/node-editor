import {ref, onMounted, Ref, computed} from '@vue/composition-api'
import {Port} from './usePorts'

interface Node {
  type: string,
  id: string,
  name: string,
  el: HTMLElement | null,
  pos: [number, number],
  in: Port[],
  out: Port[],
  display: {
    dirty: Boolean,
    selected: Boolean,
  },
  state: Object
}

export default function useNode(ctx, nodeId) {
  const store: any = ctx.root.$store
  const rNode: Ref<Node> = ref(store.state.nodes[nodeId])

  const onPositionChange = (diff, pos, e) => {
    if(!pos || !e) return
    store.commit('node:setPosition', {id: rNode.value.id, pos: [pos.left, pos.top]})
  }

  const deleteNode = (nodeId) => store.commit('node:delete', nodeId)

  onMounted(() => {
    store.commit('node:attachElement', {id: rNode.value.id, el: ctx.refs.el})
  })

  return {
    rNode,
    onPositionChange,
    deleteNode,
  }
}

export {
  Node,
}