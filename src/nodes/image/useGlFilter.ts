import {ref, watch, Ref, computed} from '@vue/composition-api'
import PostProcessor from 'src/gl/postprocessing/PostProcessor'
import {CustomPass} from 'src/gl/postprocessing/CustomPass'

import DotScreenShader from 'src/gl/shader/dotscreen/DotScreen.shader'
import PassThroughShader from 'src/gl/shader/passthrough/PassThrough.shader'
import {Pass} from 'three/examples/jsm/postprocessing/Pass'
import {IShader} from 'src/gl/shader/IShader'

interface ICustomPass extends Pass {
  reset(shader: IShader)
}

export default function useGLFilter(ctx, props) {
const postProcessor = PostProcessor.getInstance()

  const filter = ref('PASS-THROUGH')
  const shader: Ref<IShader> = ref(getShader(filter.value))
  const passId: Ref<string> = ref(postProcessor.createPass(new CustomPass(shader.value, props.node.id)))

  const uniforms = computed({
    get: () => shader.value.uniforms,
    set: (uniforms) => this.uniforms = uniforms,
  })

  let glFilter: ICustomPass = new CustomPass(shader.value, props.node.id)
  // composer.addPass(glFilter)

  function getShader(filter, uniforms = {}): IShader {
    switch(filter) {
      case 'DOT-SCREEN':
        return DotScreenShader(uniforms)
      case 'PASS-THROUGH':
      default:
        return PassThroughShader(uniforms)
    }
  }

  // const refreshFilter = () => {
  //   shader.value = getShader('DOT-SCREEN', {scale: {value: Math.random() * 4}})
  //   shader.value.uniforms.scale.value = Math.random() * 4
  //   console.log(shader.value.uniforms.scale.value)
  //   glFilter.reset(shader.value)
  // }

  watch(filter, (filter) => {
    shader.value = getShader(filter);
    postProcessor.updatePass(passId.value, new CustomPass(shader.value, props.node.id))

    glFilter.reset(shader.value)
  })

  return {
    filter,
    uniforms,
    passId,
  }
}