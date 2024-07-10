<script setup lang="ts">
import type { Keycap, Switch } from '~/server/db/schema'
import type { KeyboardsJoinedColorsRow } from '~/server/utils/translate'

const emit = defineEmits<{
  next: [],
}>()

const order = useOrder()

const {
  hasCompletedForm,
  response,
} = useFormStatus().value

const keyboards = ref([] as KeyboardsJoinedColorsRow[])
const switches = ref([] as Switch[])
const keycaps = ref([] as Keycap[])

const otherKeyboards = ref([] as KeyboardsJoinedColorsRow[])
const otherSwitches = ref([] as Switch[])
const otherKeycaps = ref([] as Keycap[])

if(hasCompletedForm) {
  keyboards.value = response.keyboards.matching
  switches.value = response.switches.matching
  keycaps.value = response.keycaps.matching
} else {
  await Promise.all([
    (async () => keyboards.value = await $fetch("/api/keyboards"))(),
    (async () => switches.value = await $fetch("/api/switches"))(),
    (async () => keycaps.value = await $fetch("/api/keycaps"))(),
  ])
}

const valid = computed(() => 
  order.value.keyboardColorId 
  && order.value.switchId
  && order.value.keycapId  
)

function loadOtherKeyboards() {
  if(response) {
    otherKeyboards.value = response.keyboards.other
  }
}

function loadOtherSwitches() {
  if(response) {
    otherSwitches.value = response.switches.other
  }

}
function loadOtherKeycaps() {
  if(response) {
    otherKeycaps.value = response.keycaps.other
  }
}
</script>

<template>
  <div class="space-y-8">
    <div class="max-w-screen-sm m-auto space-y-4">
      <OrderSelectModal
        type="keyboards"
        :items="keyboards"
        :other="otherKeyboards"
        :hasCompletedForm
        @loadAll="loadOtherKeyboards"
        @selected="(item) => order.keyboardColorId = item.id"
      >
        Odaberi svoju tastaturu
      </OrderSelectModal>
      <OrderSelectModal
        type="switches"
        :items="switches"
        :other="otherSwitches"
        :hasCompletedForm
        @loadAll="loadOtherSwitches"
        @selected="(item) => order.switchId = item.id"
      >
        Odaberi svoje svičeve
      </OrderSelectModal>
      <OrderSelectModal
        type="keycaps"
        :items="keycaps"
        :other="otherKeycaps"
        :hasCompletedForm
        @loadAll="loadOtherKeycaps"
        @selected="(item) => order.keycapId = item.id"
      >
        Odaberi svoje kapice
      </OrderSelectModal>
    </div>
    <div class="flex justify-end">
      <Button 
        type="button"
        :disabled="!valid"
        @click="emit('next')"
        class="font-bold text-lg py-6 px-6"
      >
        Sledeće
      </Button>
    </div>
  </div>
</template>
