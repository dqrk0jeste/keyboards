<script setup lang="ts">
const {
  hasCompletedForm,
  response,
  body,
} = useFormStatus().value

const formKeyboards = hasCompletedForm ? response.matchingKeyboards : null
const formSwitches = hasCompletedForm ? response.matchingSwitches : null
const formKeycaps = hasCompletedForm ? response.matchingKeycaps : null

const { 
  data: keyboards, 
  error: keyboardsError, 
  pending: keyboardsPending,
  execute: fetchKeyboards,
} = await useFetch("/api/keyboards", {
  immediate: !hasCompletedForm,
})

const { 
  data: switches, 
  error: switchesError, 
  pending: switchesPending,
  execute: fetchSwitches,
} = await useFetch("/api/switches", {
  immediate: !hasCompletedForm,
})

const { 
  data: keycaps, 
  error: keycapsError, 
  pending: keycapsPending,
  execute: fetchKeycaps,
} = await useFetch("/api/keycaps", {
  immediate: !hasCompletedForm,
})
</script>

<template>
  <h2 class="text-3xl sm:text-4xl md:text-5xl ">
    Tastatura
  </h2>
  <div class="max-w-screen-sm space-y-4">
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
