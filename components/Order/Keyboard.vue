<script setup lang="ts">
import type { Keyboard, Keycap, Switch } from '~/server/db/schema'

const {
  hasCompletedForm,
  response,
} = useFormStatus().value

const keyboards = ref([] as Keyboard[])
const switches = ref([] as Switch[])
const keycaps = ref([] as Keycap[])

if(hasCompletedForm) {
  keyboards.value = response.matchingKeyboards
  switches.value = response.matchingSwitches
  keycaps.value = response.matchingKeycaps
} else {
  const {
    allKeyboards,
    allSwitches,
    allKeycaps,
  } = await getAllEverything()

  keyboards.value = allKeyboards
  switches.value = allSwitches
  keycaps.value = allKeycaps
}

async function getAllEverything() {
  const [
    allKeyboards,
    allSwitches,
    allKeycaps,
  ] = await Promise.all([
    getAllKeyboards(),
    getAllSwitches(),
    getAllKeycaps(),
  ])
  return {
    allKeyboards,
    allSwitches,
    allKeycaps,
  }
}

async function getAllKeyboards() {
  return await $fetch("/api/keyboards")
}
async function getAllSwitches() {
  return await $fetch("/api/switches")
}
async function getAllKeycaps() {
  return await $fetch("/api/keycaps")
}
</script>

<template>
  <h2 class="text-3xl sm:text-4xl md:text-5xl ">
    Tastatura
  </h2>
  <div class="max-w-screen-sm space-y-4">
    <OrderSelectModal type="keyboards" :items="keyboards!">
      <p class="text-lg md:text-2xl font-bold">
        Odaberi svoju tastaturu
      </p>
    </OrderSelectModal>
    <OrderSelectModal type="switches" :items="switches!">
      <p class="text-lg md:text-2xl font-bold">
        Odaberi svoje svičeve
      </p>
    </OrderSelectModal>
    <OrderSelectModal type="keycaps" :items="keycaps!">
      <p class="text-lg md:text-2xl font-bold">
        Odaberi svoje kapice
      </p>
    </OrderSelectModal>
  </div>
</template>
