<script setup lang="ts">
import type { Keycap, Switch } from '~/server/db/schema'
import type { KeyboardsJoinedColorsRow } from '~/server/utils/translate'

const emit = defineEmits<{
  next: [],
}>()

const selected = defineModel<{
  keyboard: KeyboardsJoinedColorsRow | null,
  switches: Switch | null,
  keycaps: Keycap | null,
}>({
  required: true
})

const valid = computed(() => 
  selected.value.keyboard
  && selected.value.switches
  && selected.value.keycaps
)
</script>

<template>
  <div class="space-y-8">
    <div class="border-black sm:border-2 rounded-2xl sm:p-8">
      <div class="max-w-screen-sm m-auto space-y-4">
        <OrderSelectModal
          type="keyboards"
          v-model="selected.keyboard"
        >
          Odaberi svoju tastaturu
        </OrderSelectModal>
        <OrderSelectModal
          type="switches"
          v-model="selected.switches"
        >
          Odaberi svoje svičeve
        </OrderSelectModal>
        <OrderSelectModal
          type="keycaps"
          v-model="selected.keycaps"
        >
          Odaberi svoje kapice
        </OrderSelectModal>
      </div>
    </div>
    <div class="flex justify-end">
      <Button 
        type="button"
        :disabled="!valid"
        @click="emit('next')"
        class="font-bold text-lg py-6 px-6 sm:mr-8"
      >
        Sledeće
      </Button>
    </div>
  </div>
</template>
