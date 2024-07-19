<script setup lang="ts">
import { type Keycap, type Switch } from '~/server/db/schema'
import { type KeyboardsJoinedColorsRow } from '~/server/utils/translate'

const currentPart = ref(0)

const keyboard = ref({
  keyboard: null as KeyboardsJoinedColorsRow | null,
  switches: null as Switch | null,
  keycaps: null as Keycap | null,
})

const modsRef = ref<{
  stabilisers: true,
  handlubedSwitches: boolean,
  extraFoam: boolean,
  tapeMod: boolean,
}>({
  stabilisers: true,
  handlubedSwitches: false,
  extraFoam: false,
  tapeMod: false,
})

const personal = ref({
  name: "",
  phoneNumber: "",
  address: "",
})

const note = ref("")
const price = ref(0)

async function placeOrder() {
  const orderBody = {
    keyboardColorId: keyboard.value.keyboard?.id,
    keycapId: keyboard.value.keycaps?.id,
    switchId: keyboard.value.switches?.id,
    tapeMod: modsRef.value.tapeMod, 
    handlubedSwitches: modsRef.value.handlubedSwitches,
    extraFoam: modsRef.value.extraFoam,
    name: personal.value.name,
    address: personal.value.address,
    phoneNumber: personal.value.phoneNumber,
    note: note.value,
    checkoutPrice: price.value,
  }

  const { start, finish} = useLoadingIndicator({
    duration: 500,
    throttle: 200,
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50),
  })

  start()

  const { id } = await $fetch("/api/orders", {
    method: "POST",
    body: orderBody,
  })

  const formResult = useFormResult()
  formResult.value = null

  finish()
  navigateTo("/orders/" + id)
}
</script>

<template>
  <div class="max-w-screen-xl m-auto py-16 px-4">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold">
      Vaša narudžba
    </h1>
    <form class="py-8" @submit.prevent="placeOrder">
      <OrderTopBar :currentPart/>
      <main class="pt-8">
        <KeepAlive>
          <OrderPartKeyboard
            v-model="keyboard"
            v-if="currentPart === 0"
            @next="currentPart++"
          />
          <OrderPartMods
            v-model="modsRef"
            v-else-if="currentPart === 1"
            @prev="currentPart--"
            @next="currentPart++"
          />
          <OrderPartPersonal
            v-model="personal"
            v-else-if="currentPart === 2"
            @prev="currentPart--"
            @next="currentPart++"
          />
          <OrderPartReview
            v-model="note"
            v-model:price="price"
            :keyboard
            :modsProp="modsRef"
            :personal
            v-else
            @prev="currentPart--"
          />
        </KeepAlive>
      </main>
    </form>
  </div>
</template>
