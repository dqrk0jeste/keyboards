<script setup lang="ts">
import type { Color, Format, SwitchType } from '~/server/utils/enums'

const currentPart = ref(0)

const format = ref(null as Format | null)
const pudding = ref(false)
const mainColor = ref(null as Color | null)
const otherColor = ref(null as Color | null)
const switchType = ref(null as SwitchType | null)
const bluetooth = ref(false)
const wireless = ref(false)

async function submitForm() {

}
</script>

<template>
  <div class="max-w-screen-xl m-auto py-16 px-4">
    <h1 class="hidden">
      Ovaj upitnik će Vas sprovesti kroz ceo izbor Vaše nove tastature. Na kraju ćete dobiti nekoliko različitih tastatura koje odgovaraju Vašim odgovorima.
    </h1>
    <form @submit.prevent="submitForm">
      <KeepAlive>
        <FormFormat v-model="format" v-if="currentPart === 0" @next="currentPart++"/>
        <FormSwitches v-model="switchType" v-else-if="currentPart === 1" @prev="currentPart--" @next="currentPart++"/>
      </KeepAlive>
    </form>
  </div>
</template>
