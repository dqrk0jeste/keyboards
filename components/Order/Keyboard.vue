<script setup lang="ts">
const cameFromForm = useRoute().params.form === "true"

const formKeyboards = cameFromForm ? useFormData().value.response.matchingKeyboards : null
const formSwitches = cameFromForm ? useFormData().value.response.matchingSwitches : null
const formKeycaps = cameFromForm ? useFormData().value.response.matchingKeycaps : null

const { 
  data: keyboards, 
  error: keyboardsError, 
  pending: keyboardsPending,
  execute: fetchKeyboards,
} = await useFetch("/api/keyboards", {
  immediate: !cameFromForm,
})

const { 
  data: switches, 
  error: switchesError, 
  pending: switchesPending,
  execute: fetchSwitches,
} = await useFetch("/api/switches", {
  immediate: !cameFromForm,
})

const { 
  data: keycaps, 
  error: keycapsError, 
  pending: keycapsPending,
  execute: fetchKeycaps,
} = await useFetch("/api/keycaps", {
  immediate: !cameFromForm,
})
</script>

<template>
  <h2 class="text-3xl sm:text-4xl md:text-5xl ">
    Tastatura
  </h2>
  <div class="max-w-screen-xs">
    <OrderSelectModal :items="keyboards!">
      <p>
        Izaberi telo tastature:
      </p>
    </OrderSelectModal>
  </div>
</template
