import {ref, watch} from '@vue/composition-api'
import GL from 'src/gl/GL'
import {CustomPass} from 'src/gl/postprocessing/CustomPass'
import DotScreenShader from 'src/gl/shader/dotscreen/DotScreen.shader'
import { Pass } from 'three/examples/jsm/postprocessing/Pass'

export default function useGLFilter(ctx, props) {
  const {composer} = GL.useContext(ctx, props)

  const filter = ref('PASS-THROUGH')
  let glFilter: Pass

  const applyFilter = (filter, nodeId) => {
    switch(filter.toUpperCase()) {
      case 'DOT-SCREEN':
        if(glFilter) {
          glFilter.enabled = true
        } else {
          glFilter = new CustomPass(DotScreenShader(), {nodeId})
          // glFilter = new DotScreenPass(new Vector2(0, 0), 1.57, 100)
          composer.value.addPass(glFilter)
        }
        break
      case 'PASS-THROUGH':
      default:
        glFilter.enabled = false
        break
    }
  }

  watch(filter, (filter) => applyFilter(filter, props.node.id))

  return {
    filter,
  }
}