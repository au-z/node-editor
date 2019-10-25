export default function useColorProperties() {

	const hue_rgb = (p, q, t) => {
		if(t < 0) t += 1
		if(t > 1) t -= 1
		if(t < 1/6) return p + (q - p) * 6 * t
		if(t < 1/2) return q
		if(t < 2/3) return p + (q - p) * (2/3 - t) * 6
		return p
	}

	const hsl_rgb = (h, s, l) => {
		let rgb: [number, number, number] = [0, 0, 0]
		if (s === 0) {
			rgb = [1, 1, 1]
		} else {
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s
			const p = 2 * l - q
			rgb = [hue_rgb(p, q, h + 1/3), hue_rgb(p, q, h), hue_rgb(p, q, h - 1/3)]
		}

		return rgb.map((c) => Math.round(c * 255))
	}

	const rgb_hex = (rgb) => rgb.reduce((color, channel) => {
		let hex = channel.toString(16)
		if (hex.length < 2) hex = '0' + hex
		return color + hex
	}, '#')

	return {
		hsl_rgb,
		rgb_hex,
	}
}