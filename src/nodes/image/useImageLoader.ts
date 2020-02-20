import {watch, ref, Ref, computed, onMounted} from '@vue/composition-api'
import * as THREE from 'three'

interface IImageLoader {
  url: Ref<string>
  blob: Ref<any>
  img: Ref<string>
  [key: string]: any
}

interface IAsTextureEvents {
  onTextureLoad(texture: any),
}

export default function useImageLoader(ctx, props) {
  const store = ctx.root.$store

  const url: Ref<string> = ref('https://w.wallhaven.cc/full/d5/wallhaven-d5x2qj.jpg')

  const blob: Ref<any> = ref(null)

  const loadImage = (url) => fetch(url)
    .then((r) => {
      if(!r.ok) throw new Error(`Error loading image. ${r.statusText}`)
      return r
    })
    .then((r) => r.blob())
    .catch((err) => console.error('Could not convert image to blob.'))

  watch(url, (url) => {
    loadImage(url).then((data) => blob.value = data)
  })

  const img = computed(() => blob.value ? URL.createObjectURL(blob.value) : '')

  /**
   * Loads the image as a WebGL texture
   * @param max_size the maximum texture size in px
   */
  function asTexture(max_size: number, events?: IAsTextureEvents): IImageLoader {
    events = events || {onTextureLoad: () => {}}

    const texture = computed(() => new THREE.TextureLoader().load(img.value, (texture) => {
      onTextureLoad(texture)
      events?.onTextureLoad(texture)
    }))

    function onTextureLoad(texture) {
      const ASPECT = texture.image.naturalWidth / texture.image.naturalHeight
      const width = Math.min(texture.image.naturalWidth, max_size)

      store.commit('ui:set', {
        name: 'gl-viewport',
        aspectRatio: ASPECT,
        width,
        height: width / ASPECT,
      })
    }

    return {
      url,
      blob,
      img,
      texture,
    }
  }

  return {
    asTexture,
  }
}