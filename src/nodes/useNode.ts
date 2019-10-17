import {ref, onMounted, Ref} from '@vue/composition-api'
import {Port} from './usePorts'

interface Node {
  type: string,
  id: string,
  name: string,
  el: HTMLElement,
  pos: [number, number],
  in: Port[],
  out: Port[],
  display: {
    dirty: Boolean,
    selected: Boolean,
  }
}

export default function useNode(ctx, nodeId, portState) {
  const rNode: Ref<Node> = ref(ctx.root.$store.state.nodes[nodeId])

  const onPositionChange = (diff, pos, e) => {
    if(!pos || !e) return
    ctx.root.$store.commit('node:setPosition', {id: rNode.value.id, pos: [pos.left, pos.top]})
  }

  onMounted(() => {
    ctx.root.$store.commit('node:attachElement', {id: rNode.value.id, el: ctx.refs.el})
  })

  const deleteNode = (nodeId) => ctx.root.$store.commit('node:delete', nodeId)

  return {
    rNode,
    onPositionChange,
    deleteNode,
  }
}

export {
  Node,
}