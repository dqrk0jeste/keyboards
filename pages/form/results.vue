<script setup lang="ts">
import type { KeyboardBuild } from '~/utils/order'

const formResponse = useFormResponse()
if(!formResponse.value) {
  throw createError({
    statusCode: 400,
  })
}

const {
  keyboards,
  switches,
  keycaps,
} = formResponse.value

const bestMatching: KeyboardBuild = {
  keyboard: keyboards.matching[0],
  switches: switches.matching[Math.floor(Math.random() * switches.matching.length)],
  keycaps: keycaps.matching[0],
}

const cheaperOption: KeyboardBuild = {
  keyboard: findCheapest(keyboards.matching),
  switches: findCheapest(switches.matching),
  keycaps: findCheapest(keycaps.matching),
}

function choose(k: KeyboardBuild) {
  const form = useFormResult()
  form.value = {
    chosen: k,
    response: formResponse.value!,
  }

  navigateTo("/orders")
}

interface TWithPrice {
  price: number
}

function findCheapest<T extends TWithPrice>(a: T[]): T {
  let min: T | null = null
  a.forEach((el) => {
    if(!min || el.price < min.price) {
      min = el
    }
  })
  // typescript thinks that min is null after this???
  //@ts-ignore
  return min
}

</script>

<template>
  <div class="max-w-screen-xl m-auto py-16 px-4 space-y-8">
    <div class="space-y-2">
      <h1 class="font-bold text-3xl">
        Tastature koje smo sastavili na osnovu Vaših odgovora.
      </h1>
      <h2 class="text-xl">
        Odaberite jednu kao početnu tačku, a onda možete proveriti i ostale opcije i promeniti bilo šta što Vam se više dopada.
      </h2>
    </div>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex-1 space-y-2">
        <h3 class="pl-3 text-2xl font-bold">
          Najbolje odgovora 💯
        </h3>
        <button
          @click="choose(bestMatching)"
          class="p-4 border-2 border-black rounded-2xl bg-white hover:bg-gray-50 w-full"
        >
          <OrderSelectItem type="keyboards" :item="bestMatching.keyboard" locked/>
          <OrderSelectItem type="keycaps" :item="bestMatching.keycaps" locked/>
          <OrderSelectItem type="switches" :item="bestMatching.switches" locked/>
        </button>
      </div>
      <div class="flex-1 space-y-2">
        <h3 class="pl-3 text-2xl font-bold">
          Jeftinija varijanta 👀
        </h3>
        <button
          @click="choose(cheaperOption)"
          class="p-4 border-2 border-black rounded-2xl bg-white hover:bg-gray-50 w-full"
        >
          <OrderSelectItem type="keyboards" :item="cheaperOption.keyboard" locked/>
          <OrderSelectItem type="keycaps" :item="cheaperOption.keycaps" locked/>
          <OrderSelectItem type="switches" :item="cheaperOption.switches" locked/>
        </button>
      </div>
    </div>
  </div>
</template>
