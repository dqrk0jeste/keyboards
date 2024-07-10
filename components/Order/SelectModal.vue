<script setup lang="ts">
import type { Keycap, Switch } from '~/server/db/schema'
import type { KeyboardsJoinedColorsRow } from '~/server/utils/translate'
 
const props = defineProps<({
  items: KeyboardsJoinedColorsRow[],
  other: KeyboardsJoinedColorsRow[],
  type: "keyboards",
} | {
  items: Switch[],
  other: Switch[],
  type: "switches",
} | {
  items: Keycap[],
  other: Keycap[],
  type: "keycaps",
}) & {
  hasCompletedForm: boolean,
}>()

type Item = typeof props.items[number]

const emit = defineEmits<{
  selected: [item: Item],
  loadAll: [],
}>()

const hasLoadedAll = ref(false)
const isActive = ref(false)
const selected: Ref<Item | undefined> = ref()

function select(item: Item) {
  emit("selected", item)
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
    class="border-2 border-black bg-white"
  />
  <button 
    v-else 
    type="button"
    @click="isActive = true"
    class="w-full flex items-center gap-3 p-2 rounded-lg border-2 border-black hover:bg-gray-50 bg-white"
  >
    <p class="text-4xl font-bold px-8 py-4">
      ?
    </p>
    <p class="text-lg md:text-2xl font-bold">
      <slot />
    </p>
  </button>
  <BaseModal 
    :isActive="isActive" 
    @clicked-outside="isActive = false"
    class="sm:min-w-[450px] border-2 border-black rounded-2xl p-5 bg-white drop-shadow-lg shadow-gray-500 space-y-4"
  >
  <div class="text-center rounded-full border-black border-2 px-2 py-5">
    <h3 class="xs:text-md sm:text-xl md:text-3xl font-bold px-4">
      <template v-if="hasCompletedForm">
        Odgovaraju Vašoj pretrazi
      </template>
      <template v-else>
        <slot />
      </template>
    </h3>
  </div> 
    <div>
      <OrderSelectItem 
        v-for="item in props.items" 
        :item="item" 
        :type="props.type"
        @click="select(item)"
        class="border-transparent border-2 hover:border-black"
      />
    </div>
    <template v-if="hasCompletedForm && hasLoadedAll">
      <div class="text-center rounded-full border-black border-2 px-2 py-5">
        <h3 class="xs:text-md sm:text-xl md:text-3xl font-bold px-4">
          Ostale opcije
        </h3>
      </div>
      <div>
        <OrderSelectItem 
          v-for="item in props.other" 
          :item="item" 
          :type="props.type"
          @click="select(item)"
          class="border-transparent border-2 hover:border-black"
        />
      </div>
    </template>
    <button
      class="text-center rounded-full border-black border-2 px-2 py-5 w-full hover:bg-gray-50"
      v-else-if="props.hasCompletedForm"
      @click="emit('loadAll'); hasLoadedAll = true"
    >
      <h3 class="xs:text-md sm:text-xl md:text-3xl font-bold px-4">
        Pogledaj ostale
      </h3>
    </button>
  </BaseModal>
</template>
