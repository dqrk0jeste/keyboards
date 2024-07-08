<script setup lang="ts" generic="T extends Item">
//@ts-ignore
import type { SwitchType } from '~/server/utils/enums';

interface Item {
  id: string,
  name: string,
  price: number,
}

const props = defineProps<{
  items: T[], 
  type: "switches" | "keycaps",
}>()

const emits = defineEmits<{
  selected: [selectedOption: T],
}>()

const isActive = ref(false)
const selected: Ref<T | undefined> = ref()

function select(item: T) {
  selected.value = item
  isActive.value = false
}

function colorBasedOnSwitchType(type: SwitchType): string {
  switch(type) {
    case "linear": return "#f87171";
    case "tactile": return "#38bdf8";
    case "clicky": return "#2563eb";
    case "silent": return "#4ade80";
  }
}
</script>

<template>
  <div 
    v-if="selected"
    @click="isActive = true"
    class="w-fit flex gap-3 items-center p-2 rounded-lg border-2 border-black hover:bg-gray-50"
  >
    <img 
      src="@/assets/images/keyboard_1.jpg" 
      class="w-28 rounded-md"
    >
    <div class="w-full">
      <div class="flex items-start justify-around">
        <p class="text-lg md:text-2xl font-bold pr-8">
          {{ selected.name }}
        </p>
        <NuxtLink
          :to="`/${ props.type }/${ selected.id }`" 
          class="text-2xl"
        >
          <IconInfo />     
        </NuxtLink>
      </div>
      <p class="text-2xl md:text-3xl font-bold text-end mt-2">
        {{ selected.price }} din
      </p>
    </div>
  </div>
  <button 
    v-else 
    type="button"
    @click="isActive = true"
    class="flex items-center gap-3 p-2 rounded-lg border-2 border-black hover:bg-gray-50"
  >
    <p class="text-4xl font-bold px-8 py-4">
      ?
    </p>
    <slot/>
  </button>
  <BaseModal 
    :isActive="isActive" 
    @clicked-outside="isActive = false"
    class="border-2 border-black rounded-2xl p-5 bg-white drop-shadow-lg shadow-gray-500"
  >
    <div 
      v-for="item in props.items"
      :key="item.id"
      class="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 border-transparent border-2 hover:border-black"
      @click="select(item)"
    >
      <img 
        src="@/assets/images/keyboard_1.jpg" 
        class="w-28 rounded-md"
      >
      <div class="w-full">
        <div class="flex items-start justify-between">
          <p class="text-lg md:text-2xl font-bold pr-8">
            <span>
              {{ item.name }}
            </span>
            <div 
              v-if="'mainColor' in item"
              class="inline-block ml-2 rounded-full aspect-square w-6 border-black border-2" 
              :style="{ backgroundColor: item.mainColor }"
            >
            </div>
            <div 
              v-else-if="'type' in item"
              class="inline-block ml-2 px-3 rounded-full font-normal text-lg" 
              :style="{
                backgroundColor: colorBasedOnSwitchType(item.type)
              }"
            >
              {{ item.type }}
            </div>
          </p>
          <NuxtLink
            :to="`/${ props.type }/${ item.id }`" 
            class="text-2xl"
          >
            <IconInfo />     
          </NuxtLink>
        </div>
        <p class="text-2xl md:text-3xl font-bold text-end mt-2">
          {{ item.price }} din
        </p>
      </div>
    </div>
  </BaseModal>
</template>
