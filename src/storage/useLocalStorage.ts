import md5 from 'blueimp-md5'
import { computed, reactive } from '@vue/composition-api'

interface EditorState {
	nodes: any[],
}

const ls = (() => {
	const dataToken = (data) => md5(data).substr(0, 12)

	const set = (data: any, token): string => {
		const json = JSON.stringify(data)
		token = token || dataToken(json)
		window.localStorage.setItem(token, json)
		return token
	}

	const get = (token): any => {
		const json = window.localStorage.getItem(token)
		return json && JSON.parse(json)
	}

	const remove = (token): void => window.localStorage.removeItem(token)

	return {
		set,
		get,
		remove,
	}
})()

export default function useLocalStorage(ctx) {
	const nodes = computed(() => ctx.root.$store.getters.nodes)
	const edges = computed(() => ctx.root.$store.state.edges)

	const saveState = reactive({
		token: null as string | null,
	})

	const saveProgress = () => {
		if(!nodes) return console.warn('Nothing to save.')
		console.log(nodes.value)
		saveState.token = ls.set({
			nodes: nodes.value.map((node) => ({...node, el: null})),
		}, saveState.token)
	}

	const loadFromToken = (token) => {
		const data: EditorState = ls.get(token)
		if(!data) return console.error('Node editor state not found.')

		data.nodes.forEach((n) => ctx.root.$store.commit('node:create', {type: n.type, name: n.name, pos: n.pos}))

		saveState.token = token
	}

	return {
		saveProgress,
		loadFromToken,
		saveState,
	}
}