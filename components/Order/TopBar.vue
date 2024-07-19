<script setup lang="ts">
const props = defineProps<{
  currentPart: number,
}>() 

const formParts = [ "Tastatura", "Modovi", "Lični podaci", "Pregled" ] as const
</script>

<template>
  <div class="hidden sm:flex items-center border-black border-2 rounded-2xl divide-black divide-x-2 overflow-hidden">
    <div 
      v-for="(name, index) in formParts"
      class="flex-1 font-bold text-lg py-2 transition-colors text-center"
      :style="{
        backgroundColor: props.currentPart === index ? 'black' : 'white',
        color: props.currentPart === index ? 'white' : 'black',
      }"
    >
      {{ name }}
    </div>
  </div>
  <div
    v-if="props.currentPart < formParts.length - 1"
    class="flex sm:hidden items-center border-black border-2 rounded-2xl divide-black divide-x-2 overflow-hidden"
  >
    <div class="flex-1 font-bold text-lg py-2 transition-colors text-center bg-black text-white">
      {{ formParts[props.currentPart] }}
    </div>
    <div class="flex-1 font-bold text-lg py-2 transition-colors text-center bg-white text-black">
      {{ formParts[props.currentPart + 1] }}
    </div>
  </div>
  <div
    v-else
    class="flex sm:hidden items-center border-black border-2 rounded-2xl divide-black divide-x-2 overflow-hidden"
  >
    <div class="flex-1 font-bold text-lg py-2 transition-colors text-center bg-white text-black">
      {{ formParts[formParts.length - 2] }}
    </div>
    <div class="flex-1 font-bold text-lg py-2 transition-colors text-center bg-black text-white">
      {{ formParts[formParts.length - 1] }}
    </div>
  </div>
</template>
