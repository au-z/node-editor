export default (function() {
  const storeState = (store, id, key, value) => store.commit('node:persistState', {id, key, value})

  function persistBinding(binding, vnode) {
    const store = vnode.context.$store
    const node = vnode.context.node
    if(store && node && binding.expression) {
      storeState(store, node.id, binding.expression, binding.value)
    }
  }

  return {
    bind(el, binding, vnode) {persistBinding(binding, vnode)},
    update(el, binding, vnode) {persistBinding(binding, vnode)},
  }
})()
