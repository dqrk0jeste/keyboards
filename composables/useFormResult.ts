import { StorageSerializers } from "@vueuse/core"

type FormResult = {
  chosen: KeyboardBuild,
  response: FormReturn,
}

export default function() {
  return useLocalStorage<FormResult | null>("form-result", null, {
    serializer: StorageSerializers.object,
  })
}
