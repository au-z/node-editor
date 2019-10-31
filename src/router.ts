import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import NodeEditor from './node-editor.vue'

export default new VueRouter({
	mode: 'history',
	routes: [
		{path: '*', name: 'node-editor', component: NodeEditor},
	],
})