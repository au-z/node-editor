import '@fortawesome/fontawesome-free/css/all.css'
import 'style/main.styl'

import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

import store from 'src/store/index.ts'
import router from 'src/router.ts'
import App from './App.vue'

import BaseGrid from './grid/base-grid.vue'
Vue.component(BaseGrid.name, BaseGrid)
import NodeBase from './nodes/node-base.vue'
Vue.component(NodeBase.name, NodeBase)
import NodeRegistrar from './nodes/NodeRegistrar.ts'
new NodeRegistrar(store)

import {Draggable} from 'draggable-vue-directive'
Vue.directive('draggable', Draggable)
import Input from './directives/v-input.ts'
Vue.directive('input', Input)

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
})
