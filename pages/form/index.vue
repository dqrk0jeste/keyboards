<script setup lang="ts">
import type { Color, Format, SwitchType } from '~/server/utils/enums'

const currentPart = useState("current-part", () => 0)

const format = useState("form-format", () => null as Format | null)
const pudding = useState("form-pudding", () => false)
const mainColor = useState("form-main-color", () => null as Color | null)
const otherColor = useState("form-other-color", () => null as Color | null)
const switchTypes = useState("form-switch-types", () => new Set<SwitchType>())
const bluetooth = useState("form-bluetooth", () => false)
const wireless = useState("form-wireless", () => false)

async function submitForm() {
  if(!format.value || !mainColor.value || switchTypes.value.size === 0) {
    throw createError({
      statusCode: 400,
    })
  }

  const { start, finish} = useLoadingIndicator({
    duration: 500,
    throttle: 200,
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50),
  })

  start()

  const body = {
    format: format.value,
    pudding: pudding.value,
    mainColor: mainColor.value,
    otherColor: otherColor.value,
    switchTypes: Array.from(switchTypes.value),
    bluetooth: bluetooth.value,
    wireless: wireless.value,
  }

  const response = await $fetch("/api/form", {
    method: "POST",
    body,
  })

  const formResponse = useFormResponse()
  formResponse.value = response

  finish()
  navigateTo("/form/results")
}
</script>

<template>
  <div class="max-w-screen-xl m-auto py-16 px-4">
    <h1 class="hidden">
      Ovaj upitnik će Vas sprovesti kroz ceo izbor Vaše nove tastature. Na kraju ćete dobiti nekoliko različitih tastatura koje odgovaraju Vašim odgovorima.
    </h1>
    <form @submit.prevent="submitForm">
      <KeepAlive>
        <FormFormat
          v-model="format"
          v-if="currentPart === 0"
          @next="currentPart++"
        />
        <FormSwitches
          v-model="switchTypes"
          v-else-if="currentPart === 1"
          @prev="currentPart--"
          @next="currentPart++"
        />
        <FormColors
          v-model:mainColor="mainColor"
          v-model:otherColor="otherColor"
          v-model:pudding="pudding"
          v-else-if="currentPart === 2"
          @prev="currentPart--"
          @next="currentPart++"
        />
        <FormConnect
          v-model:wireless="wireless"
          v-model:bluetooth="bluetooth"
          v-else-if="currentPart === 3"
          @prev="currentPart--"
          @next="submitForm"
        />
      </KeepAlive>
    </form>
  </div>
</template>
