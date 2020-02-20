export default (function() {

  const bind = (el, binding, vnode) => {
    const state = {
      dragging: false,
    }

    binding.value.onCableDrag = binding.value.onCableDrag || function(){}
    const onCableDrag = binding.value.onCableDrag.bind(vnode, el, binding)

    binding.value.onCableMouseUp = binding.value.onCableMouseUp || function(){}
    const onCableMouseUp = binding.value.onCableMouseUp.bind(vnode, el, binding)

    const connect = binding.value.connect

    const onDocumentMouseUp = (e) => {
      document.removeEventListener('mousemove', onCableDrag)
      state.dragging = false

      onCableMouseUp(e)
    }

    const onMouseDown = (e, el, binding) => {
      document.addEventListener('mouseup', onDocumentMouseUp)
      state.dragging = true

      const port = binding.value.port
      binding.value.isOutput && connect(port.name, state.dragging)
      binding.value.isOutput && document.addEventListener('mousemove', onCableDrag)
    }

    const onMouseUp = (e, el, binding) => {
      state.dragging = false

      const port = binding.value.port
      !binding.value.isOutput && connect(port.name, state.dragging)
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