<script setup lang="ts">
import type { Keycap, Switch } from '~/server/db/schema'
import type { KeyboardsJoinedColorsRow } from '~/server/utils/translate'
 
const props = defineProps<{
  items: KeyboardsJoinedColorsRow[],
  type: "keyboards",
} | {
  items: Switch[],
  type: "switches",
} | {
  items: Keycap[],
  type: "keycaps",
}>()

const emits = defineEmits<{
  selected: [selectedOption: typeof props.items[number]],
  showAll: [],
}>()

const isActive = ref(false)
const selected: Ref<typeof props.items[number] | undefined> = ref()

function select(item: typeof props.items[number]) {
  selected.value = item
  isActive.value = false
}

</script>

<template>
  <OrderSelectItem 
    v-if="selected"
    :type="props.type"
    :item="selected"
    @click="isActive = true"
    class="border-2 border-black"
  />
  <button 
    v-else 
    type="button"
    @click="isActive = true"
    class="w-full flex items-center gap-3 p-2 rounded-lg border-2 border-black hover:bg-gray-50"
  >
    <p class="text-4xl font-bold px-8 py-4">
      ?
    </p>
    <slot name="text"/>
  </button>
  <BaseModal 
    :isActive="isActive" 
    @clicked-outside="isActive = false"
    class="sm:min-w-[450px] border-2 border-black rounded-2xl p-5 bg-white drop-shadow-lg shadow-gray-500"
  >
    <OrderSelectItem 
      v-for="item in props.items" 
      :item="item" 
      :type="props.type"
      @click="select(item)"
      class="border-transparent border-2 hover:border-black"
    />
    <slot name="more"/>
  </BaseModal>
</template>
