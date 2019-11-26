export default (function() {

  const bind = (el, binding, vnode) => {
    binding.value.onCableDrag = binding.value.onCableDrag || function(){}
    const onCableDrag = binding.value.onCableDrag.bind(vnode, el, binding)

    binding.value.onCableMouseUp = binding.value.onCableMouseUp || function(){}
    const onCableMouseUp = binding.value.onCableMouseUp.bind(vnode, el, binding)

    const onDocumentMouseUp = (e) => {
      document.removeEventListener('mousemove', onCableDrag)
      onCableMouseUp(e)
    }

    const onMouseDown = (e, el, binding) => {
      document.addEventListener('mouseup', onDocumentMouseUp)

      const port = binding.value.port
      binding.value.isOutput && binding.value.connect(port.name)
      binding.value.isOutput && document.addEventListener('mousemove', onCableDrag)
    }

    const onMouseUp = (e, el, binding) => {
      const port = binding.value.port
      !binding.value.isOutput && binding.value.connect(port.name)
    }

    el.addEventListener('mouseup', (e) => {
      e.preventDefault()
      onMouseUp(e, el, binding)
    })
    el.addEventListener('mousedown', (e) => {
      e.preventDefault()
      e.stopPropagation()
      onMouseDown(e, el, binding)
    })
  }

  return {
    bind,
  }
})()