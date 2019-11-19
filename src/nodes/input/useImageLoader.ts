import {watch, ref, Ref, computed} from '@vue/composition-api'

export default function useImageLoader(ctx, props) {
  const store = ctx.root.$store

  const url: Ref<string> = ref('')
  const blob: Ref<any> = ref(new Blob())

  const loadImage = (url) => fetch(url)
    .then((r) => {
      if(!r.ok) throw new Error(`Error loading image. ${r.statusText}`)
      return r
    })
    .then((r) => r.blob())
    .catch((err) => {
      console.error('Could not convert image to blob.')
    })

  watch(url, (url) => {
    loadImage(url).then((data) => blob.value = data)
  })

  const img = computed(() => URL.createObjectURL(blob.value))

  return {
    url,
    blob,
    img,
  }
}