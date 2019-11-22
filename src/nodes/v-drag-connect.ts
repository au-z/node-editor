export default (function() {
  const onMouseDown = (e, el, binding, vnode) => {
    const port = binding.value.port
    binding.value.isOutput && binding.value.connect(port)

    document.addEventListener('mousemove', binding.value.onCableDrag)
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', binding.value.onCableDrag))
  }

  const onMouseUp = (e, el, binding, vnode) => {
    const port = binding.value.port
    !binding.value.isOutput && binding.value.connect(port)

    document.removeEventListener('mousemove', binding.value.onCableDrag)
  }

  const bind = (el, binding, vnode) => {
    binding.value.onCableDrag = binding.value.onCableDrag || function(){}

    el.addEventListener('mouseup', (e) => {
      e.preventDefault()
      e.stopPropagation()
      onMouseUp(e, el, binding, vnode)
    })
    el.addEventListener('mousedown', (e) => {
      e.preventDefault()
      e.stopPropagation()
      onMouseDown(e, el, binding, vnode)
    })
  }

  return {
    bind,
  }
})()