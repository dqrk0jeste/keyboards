<script setup lang="ts">
import { type Color } from '~/server/utils/enums'

const mainColor = defineModel<Color | null>("mainColor", {
  default: null,
}) 
const otherColor = defineModel<Color | null>("otherColor", {
  default: null,
}) 
const pudding = defineModel("pudding", {
  default: false,
}) 

const emit = defineEmits<{
  prev: [],
  next: [],
}>()

const { data: colors, error } = await useFetch("/api/keycaps/colors")
if(error.value) {
  throw createError({
    statusCode: 500,
  })
}

const valid = computed(() => mainColor.value)
</script>

<template>
  <div class="space-y-8">
    <h2 class="font-bold text-4xl">
      Izgled
    </h2>
    <div class="m-auto space-y-8">
      <div class="space-y-2">
        <p class="text-xl">
          Odaberite boju tastature koju želite.
        </p>
        <div>
          <option
            v-for="color in colors"
            :key="color"
            class="inline-block w-8 md:w-12 aspect-square rounded-full cursor-pointer mr-2"
            :style="{
              backgroundColor: color,
              opacity: mainColor === color ? 1 : 0.5,
              border: mainColor === color ? '4px solid black' : '2px solid black',
            }"
            @click="mainColor = color as Color"
          >
          </option>
        </div>
      </div>
      <div v-if="mainColor" class="space-y-2">
        <p class="text-xl">
          Ukoliko želite, možete izabrati još jednu boju. <span class="text-gray-600 text-lg">(nije obavezno)</span>
        </p>
        <div>
          <option
            v-for="color in colors"
            :key="color"
            class="inline-block w-8 md:w-12 aspect-square rounded-full cursor-pointer mr-2"
            :style="{
              backgroundColor: color,
              opacity: otherColor === color ? 1 : 0.5,
              border: otherColor === color ? '4px solid black' : '2px solid black',
            }"
            @click="otherColor = color as Color"
          >
          </option>
        </div>
        <p class="text-lg text-gray-600">
          Napomena: Imajte u vidu da ova boja manje utiče u algoritmu od one prve.
        </p>
      </div>
      <div class="space-y-2">
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <img
            src="@/assets/images/keyboard_1.jpg"
            alt="puding kapice"
            class="w-[90%] sm:max-w-[200px] rounded-2xl"
          >
          <div class="space-y-4">
            <p class="text-xl">
              U ponudi imamo i puding kapice koje sa RGB-om izgledaju odlično.
            </p>
            <div class="flex gap-4 items-center">
              <Switch @update:checked="pudding = !pudding"/>
              <p class="text-xl text-gray-600">
                Želim puding kapice.
              </p>
            </div>
          </div>
        </div>
      </div>
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
        :disabled="!valid"
        @click="emit('next')"
        class="font-bold text-lg py-6 px-6 sm:mr-8 border-2 border-black shadow-md"
      >
        Sledeće
      </Button>
    </div>
  </div>
</template>
