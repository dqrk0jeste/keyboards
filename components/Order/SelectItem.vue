<script setup lang="ts">
import type { Keycap, Switch } from '~/server/db/schema'
import type { SwitchType } from '~/server/utils/enums'
import type { KeyboardsJoinedColorsRow } from '~/server/utils/translate'

const props = defineProps<{
  item: KeyboardsJoinedColorsRow,
  type: "keyboards",
  locked?: boolean,
} | {
  item: Switch,
  type: "switches",
  locked?: boolean,
} | {
  item: Keycap,
  type: "keycaps",
  locked?: boolean,
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
  <div class="flex gap-3 items-center p-2 rounded-lg">
    <img 
      src="@/assets/images/keyboard_1.jpg" 
      class="w-20 sm:w-28 rounded-md"
    >
    <div class="flex-1 space-y-1">
      <div class="flex items-start justify-between">
        <p>
          <span
            v-if="props.type === 'switches'"
            class="mr-2 px-3 rounded-full text-md xs:text-lg" 
            :style="{
              backgroundColor: colorBasedOnSwitchType(props.item.type)
            }"
          >
            {{ props.item.type }}
          </span>
          <div 
            v-else-if="props.type === 'keycaps'"
            class="inline-block mr-2 rounded-full aspect-square w-6 border-black border-2" 
            :style="{ backgroundColor: props.item.mainColor }"
          >
          </div>
          <div 
            v-else-if="props.type === 'keyboards'"
            class="inline-block mr-2 rounded-full aspect-square w-6 border-black border-2" 
            :style="{ backgroundColor: props.item.color }"
          >
          </div>
          <span class="text-md xs:text-xl">
            {{ props.item.name }}
          </span>
        </p>
        <NuxtLink
          v-if="!props.locked"
          :to="`/${ props.type }/${ props.item.id }`" 
          class="text-2xl hidden"
          @click.stop
        >
          <IconInfo />     
        </NuxtLink>
      </div>
      <p class="text-2xl sm:text-3xl font-bold text-end">
        {{ props.item.price }} din
      </p>
    </div>
  </div>
</template>
