<script setup lang="ts">
import type { KeyboardBuild } from '~/utils/order'

const form = useFormStatus()  
if(!form.value.hasCompletedForm) {
  throw createError({
    statusCode: 400,
  })
}

const {
  keyboards,
  switches,
  keycaps,
} = form.value.response

const bestMatching: KeyboardBuild = {
  keyboardColor: keyboards.matching[0],
  switches: switches.matching[Math.floor(Math.random() * switches.matching.length)],
  keycaps: keycaps.matching[0],
}

const cheaperOption: KeyboardBuild = {
  keyboardColor: findCheapest(keyboards.matching),
  switches: findCheapest(switches.matching),
  keycaps: findCheapest(keycaps.matching),
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

function choose(k: KeyboardBuild) {
  form.value.chosen = k
  navigateTo("/orders")
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
          <OrderSelectItem type="keyboards" :item="bestMatching.keyboardColor" locked/>
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
          <OrderSelectItem type="keyboards" :item="cheaperOption.keyboardColor" locked/>
          <OrderSelectItem type="keycaps" :item="cheaperOption.keycaps" locked/>
          <OrderSelectItem type="switches" :item="cheaperOption.switches" locked/>
        </button>
      </div>
    </div>
  </div>
</template>
