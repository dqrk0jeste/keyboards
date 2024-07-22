<script setup lang="ts">
import type { Format } from '~/server/utils/enums'

const selected = defineModel<Format | null>({ default: null})

const emit = defineEmits<{
  next: [],
}>()

const { data: available, error } = await useFetch("/api/keyboards/formats", {
  transform: (data) => data.map(f => f.format),
})
if(error.value) {
  throw createError({
    statusCode: 500,
  })
}

type FormatWithDesc = {
  type: Format,
  desc: string,    
}

const formats: FormatWithDesc[] = [
  {
    type: "100%",
    desc: "Standardan format koji podrazumeva numerički deo sa desne strane."
  },
  {
    type: "TKL",
    desc: "Isti raspored kao 100%, ali bez numberičkog dela."
  },
  {
    type: "75%",
    desc: "U odnosu na TKL format, manji broj dugmića sa desne strane iznad strelica."
  },
  {
    type: "65%",
    desc: "Još nedostaju Function dugmići."
  },
  {
    type: "60%",
    desc: "60% gubi još i strelice, što je čini još kompaktnijom."
  },
]
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h2 class="font-bold text-4xl">
        Format
      </h2>
      <p class="text-xl">
        Odaberite format tastature shodno Vašim potrebama.
      </p>
    </div>
    <div class="m-auto space-y-8">
      <button 
        type="button"
        v-for="format in formats"
        :key="format.type"
        :disabled="!available!.includes(format.type)"
        @click="selected = format.type"
        class="w-full rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center bg-white hover:bg-gray-50 transition-all disabled:opacity-30"
        :style="{
          border: selected === format.type ? '6px solid black' : '2px solid black',
        }"
      >
        <img
          src="@/assets/images/keyboard_1.jpg"
          alt="100% keyboard format"
          class="w-full max-w-screen-xs rounded-2xl"
        >
        <div class="space-y-2 w-full text-left">
          <h3 class="font-bold text-2xl sm:text-4xl">
            {{ format.type }}
          </h3> 
          <p class="text-xl">
            {{ format.desc }}
          </p>
        </div>
      </button>
    </div>
    <div class="flex justify-end">
      <Button 
        variant="outline"
        type="button"
        :disabled="!selected"
        @click="emit('next')"
        class="font-bold text-lg py-6 px-6 sm:mr-8 border-2 border-black shadow-md"
      >
        Sledeće
      </Button>
    </div>
  </div>
</template>
