<script setup lang="ts">
const wireless = defineModel("wireless", { default: false })  
const bluetooth = defineModel("bluetooth", { default: false })  

const emit = defineEmits<{
  prev: [],
  next: [],
}>()

</script>

<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h2 class="font-bold text-4xl">
        Povezivanje
      </h2>
      <p class="text-xl">
        Ukoliko Vam je neophodna bežična funkcionalnost, označite sledeće opcije.
      </p>
    </div>
    <div class="space-y-2">
      <div class="flex flex-col sm:flex-row gap-4 items-center sm:pl-4">
        <Switch @update:checked="wireless = !wireless"/>
        <p class="text-xl">
          Želim bežičnu tastaturu.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 items-center sm:pl-4">
        <Switch @update:checked="bluetooth = !bluetooth"/>
        <p class="text-xl">
          Želim bluetooth tastaturu.
        </p>
      </div>
    </div>
    <div class="flex justify-between">
      <Button 
        type="button"
        @click="emit('prev')"
        class="font-bold text-lg py-6 px-6 sm:ml-8"
      >
        Prethodno
      </Button>
      <Button 
        type="button"
        @click="emit('next')"
        class="font-bold text-lg py-6 px-6 sm:mr-8"
      >
        Završi
      </Button>
    </div>
  </div>
</template>
