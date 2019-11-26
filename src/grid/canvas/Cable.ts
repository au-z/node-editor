interface IToggleable {
  toggle(enable?: boolean | null),
}

interface IDrawable extends IToggleable {
  draw: Function,
  [propName: string]: any
}

export default function Cable(_from: [number, number], _to: [number, number], _color = '#888'): IDrawable {
  let from = _from
  let to = _to
  let color = _color
  let enabled = true

  const easeControls = (from, to) => [
    [from[0] + 0.5 * (to[0] - from[0]), from[1]],
    [from[0] + 0.5 * (to[0] - from[0]), to[1]],
  ]

  const draw = (ctx) => {
    if(!enabled) return
    const ctrls = easeControls(from, to)

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(...from)
    ctx.bezierCurveTo(...ctrls[0], ...ctrls[1], ...to)
    ctx.stroke()

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(...from, 4, 0, 2 * Math.PI)
    ctx.arc(...to, 4, 0, 2 * Math.PI)
    ctx.fill()
  }

  return {
    draw,
    setFrom: (_from) => from = _from,
    setTo: (_to) => to = _to,
    toggle: (enable) => enabled = (enable === true) ? true : (enable === false) ? false : !enabled,
  }
}

export {IDrawable}