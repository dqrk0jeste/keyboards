<script setup lang="ts">
import type { Keycap, Switch } from '~/server/db/schema'
import type { SwitchType } from '~/server/utils/enums'
import type { KeyboardsJoinedColorsRow } from '~/server/utils/translate'

const props = defineProps<{
  item: KeyboardsJoinedColorsRow,
  type: "keyboards",
} | {
  item: Switch,
  type: "switches",
} | {
  item: Keycap,
  type: "keycaps",
}>()

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
  <div class="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50">
    <img 
      src="@/assets/images/keyboard_1.jpg" 
      class="w-20 sm:w-28 rounded-md"
    >
    <div class="flex-1">
      <div class="flex items-start justify-between">
        <p class="xs:text-md sm:text-lg md:text-2xl font-bold whitespace-normal">
          <span>
            {{ props.item.name }}
          </span>
          <div 
            v-if="props.type === 'keycaps'"
            class="inline-block ml-2 rounded-full aspect-square w-6 border-black border-2" 
            :style="{ backgroundColor: props.item.mainColor }"
          >
          </div>
          <div 
            v-else-if="props.type === 'keyboards'"
            class="inline-block ml-2 rounded-full aspect-square w-6 border-black border-2" 
            :style="{ backgroundColor: props.item.color }"
          >
          </div>
          <span
            v-else-if="props.type === 'switches'"
            class="ml-2 px-3 rounded-full font-normal text-md sm:text-lg" 
            :style="{
              backgroundColor: colorBasedOnSwitchType(props.item.type)
            }"
          >
            {{ props.item.type }}
          </span>
        </p>
        <NuxtLink
          :to="`/${ props.type }/${ props.item.id }`" 
          class="text-2xl"
          @click.stop
        >
          <IconInfo />     
        </NuxtLink>
      </div>
      <p class="text-2xl md:text-3xl font-bold text-end mt-2">
        {{ props.item.price }} din
      </p>
    </div>
  </div>
</template>
