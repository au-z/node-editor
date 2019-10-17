import Vue from 'vue'
import CompositionApi, {reactive} from '@vue/composition-api'
Vue.use(CompositionApi)

export default (function useMouse() {
	let instance: any = null

	const mouseState = reactive({
		pos: [0, 0],
	})

	function init() {
		document.addEventListener('mousemove', (e) => {
			mouseState.pos = [e.clientX, e.clientY]
		})

		instance = {
			mouseState,
		}

		return instance
	}

	return {
		getInstance: () => instance ? instance : init(),
	}
})()
