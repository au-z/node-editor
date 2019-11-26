import Cable from './canvas/Cable'

export default (() => {
  let canvas
  let ctx
  let instance = null

  const drawables = []

  const resize = (w, h) => {
    canvas.width = w
    canvas.height = h
  }

  const bezier = (from, to, color = '#888') => drawables.push(new Cable(from, to, color))

  const prepare = () => {
    resize(window.innerWidth, window.innerHeight)

    return ctx
  }

  const onRender = (fn) => {
    drawables.push(fn.bind(null, ctx))
  }

  function render() {
    requestAnimationFrame(render)

    wipe()
    drawables.forEach((draw) => draw())
  }

  const wipe = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

  const init = (el) => {
    canvas = el
    ctx = canvas.getContext('2d')
    window.addEventListener('resize', () => resize(window.innerWidth, window.innerHeight))

    instance = {
      prepare,
      bezier,
      wipe,
      onRender,
    }

    render()
    return instance
  }

  return {
    getInstance: (el) => instance ? instance : init(el),
  }
})()
