export default (() => {
  let canvas = null
  let instance = null

  const resize = (w, h) => {
    canvas.width = w
    canvas.height = h
  }

  const easeControls = (from, to) => [
    [from[0] + 0.5 * (to[0] - from[0]), from[1]],
    [from[0] + 0.5 * (to[0] - from[0]), to[1]],
  ]

  const bezier = (from, to) => {
    const ctx = canvas.getContext('2d')
    const ctrls = easeControls(from, to)

    ctx.beginPath()
    ctx.strokeStyle = '#888'
    ctx.moveTo(...from)
    ctx.bezierCurveTo(...ctrls[0], ...ctrls[1], ...to)
    ctx.stroke()

    ctx.fillStyle = '#888'
    ctx.beginPath()
    ctx.arc(...from, 4, 0, 2 * Math.PI)
    ctx.arc(...to, 4, 0, 2 * Math.PI)
    ctx.fill()
  }

  const prepare = () => {
    resize(window.innerWidth, window.innerHeight)

    return canvas.getContext('2d')
  }

  const wipe = () => canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

  const init = (el) => {
    canvas = el
    window.addEventListener('resize', () => resize(window.innerWidth, window.innerHeight))

    instance = {
      prepare,
      bezier,
      wipe,
    }

    return instance
  }

  return {
    getInstance: (el) => instance ? instance : init(el),
  }
})()
