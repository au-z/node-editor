import Vue from 'vue'

import NodeHue from './node-hue'
import NodeOut from './node-out'
import NodeRGB from './node-rgb'

Vue.component(NodeHue.name, NodeHue)
Vue.component(NodeOut.name, NodeOut)
Vue.component(NodeRGB.name, NodeRGB)