<script setup lang="ts">
import type { SwitchType } from '~/server/utils/enums'

const selected = defineModel<Set<SwitchType>>({ default: new Set<SwitchType>() })

const emit = defineEmits<{
  prev: [],
  next: [],
}>()

const { data: available, error } = await useFetch("/api/switches/types", {
  transform: (data) => data.map(s => s.type),
})
if(error.value) {
  throw createError({
    statusCode: 500,
  })
}

type SwitchTypeWithDesc = {
  type: SwitchType,
  title: string,
  desc: string,    
}

const switchTypes: SwitchTypeWithDesc[] = [
  {
    type: "silent",
    title: "Tihi",
    desc: "Ukoliko želite odličan osećaj pri kucanju, a da pritom Vaša tastatura bude vrlo tiha, onda su tihi svičevi pravi izbor.",
  },
  {
    type: "tactile",
    title: "Taktilni",
    desc: "Taktilni svičevi pružaju jasan taktilni osećaj pri aktivaciji sviča i zbog toga su mnogima omiljeni tip sviča.",
  },
  {
    type: "linear",
    title: "Linearni",
    desc: "Linearni svičevi pružaju jednoličan osećaj kroz ceo pritisak sviča, te su omiljeni kod gejmera.",
  },
  {
    type: "clicky",
    title: "Clicky",
    desc: "Niko ne voli clicky svičeve.",
  },
]
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h2 class="font-bold text-4xl">
        Tip svičeva
      </h2>
      <p class="text-xl">
        Možete odabrati jedan ili više tipova svičeva. Kratak opis je dat pored svakog od tipova, ali ako niste sigurni oko svog izbora možete pogledati (i poslušati!) ceo izbor <NuxtLink to="/switches" class="text-blue-600">ovde</NuxtLink>.
      </p>
    </div>
    <div class="m-auto space-y-8">
      <button 
        type="button"
        v-for="switchType in switchTypes"
        :key="switchType.type"
        :disabled="!available!.includes(switchType.type)"
        @click="selected.delete(switchType.type) || selected.add(switchType.type)"
        class="w-full rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center bg-white hover:bg-gray-50 transition-all disabled:opacity-30"
        :style="{
          border: selected.has(switchType.type) ? '6px solid black' : '2px solid black',
        }"
      >
        <img
          src="@/assets/images/keyboard_1.jpg"
          alt="100% keyboard format"
          class="w-full max-w-screen-xs rounded-2xl"
        >
        <div class="space-y-2 w-full text-left">
          <h3 class="font-bold text-2xl sm:text-4xl">
            {{ switchType.title }}
          </h3> 
          <p class="text-xl">
            {{ switchType.desc }}
          </p>
        </div>
      </button>
    </div>
    <div class="flex justify-between">
      <Button 
        variant="outline"
        type="button"
        @click="emit('prev')"
        class="font-bold text-lg py-6 px-6 sm:ml-8 border-2 border-black shadow-md"
      >
        Prethodno
      </Button>
      <Button 
        variant="outline"
        type="button"
        :disabled="selected.size === 0"
        @click="emit('next')"
        class="font-bold text-lg py-6 px-6 sm:mr-8 border-2 border-black shadow-md"
      >
        Sledeće
      </Button>
    </div>
  </div>
</template>
