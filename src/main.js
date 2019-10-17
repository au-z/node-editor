import '@fortawesome/fontawesome-free/css/all.css'
import 'style/main.styl'

import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

import store from 'src/store/index.ts'
import App from './App.vue'

import './nodes/color/index.js'
import './nodes/vector/index.js'
import BaseGrid from './grid/base-grid.vue'
Vue.component(BaseGrid.name, BaseGrid)
import NodeBase from './nodes/node-base'
Vue.component(NodeBase.name, NodeBase)

import {Draggable} from 'draggable-vue-directive'
Vue.directive('draggable', Draggable)

new Vue({
  el: '#app',
  store,
  render: (h) => h(App),
})
