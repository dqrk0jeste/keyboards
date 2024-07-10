<script setup lang="ts">
const props = defineProps<{
  index: number,
  mod: {
    title: string,
    desc: string,
    price: number,
    required: boolean,
  },
}>()
</script>

<template>
  <div class="space-y-4">
    <h4 class="flex items-center gap-3">
      <span class="text-4xl border-2 border-black rounded-full aspect-square w-14 flex items-center justify-center">
        {{ index }} 
      </span>
      <span class="text-2xl sm:text-3xl font-bold bg-black text-white w-fit px-4 py-2 rounded-full">
        {{ props.mod.title }}
      </span>
    </h4>
    <p class="text-xl sm:text-2xl">
      {{ props.mod.desc }}
    </p>
    <div v-if="props.mod.required" class="space-x-16 ml-8">
      <button class="border-4 border-black rounded-2xl bg-white text-2xl font-bold px-8 py-4">
        Da 
      </button>
      <button class="border-4 border-black rounded-2xl bg-white text-2xl font-bold px-8 py-4">
        Da
      </button>
    </div>
    <div v-else class="space-x-16 ml-8">
      <button class="border-4 border-black rounded-2xl bg-white text-2xl font-bold px-8 py-4">
        Da ({{ props.mod.price || "besplatno" }})
      </button>
      <button class="border-4 border-black rounded-2xl bg-white text-2xl font-bold px-8 py-4">
        Ne
      </button>
    </div>
  </div>
</template>
