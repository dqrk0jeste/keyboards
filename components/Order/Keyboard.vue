<script setup lang="ts">
import type { Keycap, Switch } from '~/server/db/schema'
import type { KeyboardsJoinedColorsRow } from '~/server/utils/translate'

const {
  hasCompletedForm,
  response,
} = useFormStatus().value

const hasLoadedAllKeyboards = ref(false)
const hasLoadedAllSwitches = ref(false)
const hasLoadedAllKeycaps = ref(false)

const keyboards = ref([] as KeyboardsJoinedColorsRow[])
const switches = ref([] as Switch[])
const keycaps = ref([] as Keycap[])

if(hasCompletedForm) {
  keyboards.value = response.matchingKeyboards
  switches.value = response.matchingSwitches
  keycaps.value = response.matchingKeycaps
} else {
  await getAllEverything()
}

async function getAllEverything() {
  await Promise.all([
    getAllKeyboards(),
    getAllSwitches(),
    getAllKeycaps(),
  ])
}

async function getAllKeyboards() {
  keyboards.value = await $fetch("/api/keyboards")
  hasLoadedAllKeyboards.value = true
}
async function getAllSwitches() {
  switches.value = await $fetch("/api/switches")
  hasLoadedAllSwitches.value = true
}
async function getAllKeycaps() {
  keycaps.value = await $fetch("/api/keycaps")
  hasLoadedAllKeycaps.value = true
}
</script>

<template>
  <div class="max-w-screen-sm space-y-4">
    <OrderSelectModal type="keyboards" :items="keyboards!">
      <template #text>
        <p class="text-lg md:text-2xl font-bold">
          Odaberi svoju tastaturu
        </p>
      </template>
      <template #more v-if="!hasLoadedAllKeyboards">
        <button 
          class="w-full border-black border-2 rounded-2xl hover:bg-gray-50 font-bold py-5 mt-2 text-lg md:text-2xl"
          @click="getAllKeyboards"
        >
          Vidi još
        </button>
      </template>
    </OrderSelectModal>
    <OrderSelectModal type="switches" :items="switches!">
      <template #text>
        <p class="text-lg md:text-2xl font-bold">
          Odaberi svoje svičeve
        </p>
      </template>
      <template #more v-if="!hasLoadedAllSwitches">
        <button @click="getAllSwitches">
          Vidi još
        </button>
      </template>
    </OrderSelectModal>
    <OrderSelectModal type="keycaps" :items="keycaps!">
      <template #text>
        <p class="text-lg md:text-2xl font-bold">
          Odaberi svoje kapice
        </p>
      </template>
      <template #more v-if="!hasLoadedAllKeycaps">
        <button 
          class="w-full border-black border-2 rounded-2xl hover:bg-gray-50 font-bold py-5"
          @click="getAllKeycaps"
        >
          Vidi još
        </button>
      </template>
    </OrderSelectModal>
  </div>
</template>
