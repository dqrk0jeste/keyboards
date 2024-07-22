<script setup lang="ts">
import type { Keycap, Switch } from '~/server/db/schema'
import type { KeyboardsJoinedColorsRow } from '~/server/utils/translate'

const props = defineProps<{
  keyboard: {
    keyboard: KeyboardsJoinedColorsRow | null,
    switches: Switch | null,
    keycaps: Keycap | null,
  },
  modsProp: {
    stabilisers: true,
    handlubedSwitches: boolean,
    extraFoam: boolean,
    tapeMod: boolean,
  },
  personal: {
    name: string,
    address: string,
    phoneNumber: string,
  },
}>()

const emit = defineEmits<{
  prev: [],
}>()

const note = defineModel<string>({ required: true })
const priceModel = defineModel<number>("price", { required: true })

const keyboardPrice = computed(() =>
  props.keyboard.keyboard!.price
  + props.keyboard.switches!.price
  + props.keyboard.keycaps!.price
)

const modsPrice = computed(() => {
  return mods.reduce((current, mod) => {
    if(props.modsProp[mod.key]) {
      return current + mod.price
    }
    return current
  }, 0)
})

const price = computed(() => keyboardPrice.value + modsPrice.value)

watch(price, (value) => {
  priceModel.value = value
})
</script>

<template>
  <div class="space-y-8">
      <div class="flex gap-4 lg:gap-8 flex-col lg:flex-row">
        <div class="flex-1 flex flex-col gap-2">
          <h4 class="text-2xl font-bold pl-3">
            Tastatura
          </h4>
          <div class="flex-1 space-y-4 p-4 border-2 border-black rounded-2xl bg-white shadow-md">
            <OrderSelectItem 
              type="keyboards"
              :item="props.keyboard.keyboard!"
              locked
              class="border-2 border-black bg-white"
            />
            <OrderSelectItem 
              type="switches"
              :item="props.keyboard.switches!"
              locked
              class="border-2 border-black bg-white"
            />
            <OrderSelectItem 
              type="keycaps"
              :item="props.keyboard.keycaps!"
              locked
              class="border-2 border-black bg-white"
            />
            <Accordion
              type="single"
              collapsible
              :disabled="true"
              class="bg-white"
            >
              <OrderMod
                v-for="(mod, index) in mods"
                :mod
                :index
                locked
                v-model="props.modsProp[mod.key]"
              />
            </Accordion>
          </div>
        </div>
        <div class="flex flex-col gap-4 flex-1">
          <div class="space-y-2">
            <h4 class="text-2xl font-bold pl-3">
              Podaci za slanje
            </h4>
            <div class="space-y-2 p-4 border-2 border-black rounded-2xl bg-white shadow-md">
              <p class="text-xl">
                {{ props.personal.name }}
              </p>
              <p class="text-xl">
                {{ props.personal.address }}
              </p>
              <p class="text-xl">
                {{ props.personal.phoneNumber }}
              </p>
            </div>
          </div>
          <div class="space-y-2">
            <h4 class="font-bold text-2xl pl-3">
              Plaćanje
            </h4>
            <div class="flex flex-col gap-4 p-4 border-2 border-black rounded-2xl bg-white shadow-md">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <p class="text-xl">
                    Tastatura
                  </p>
                  <p class="text-xl">
                    {{ keyboardPrice }} din
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="text-xl">
                    Modovi
                  </p>
                  <p class="text-xl">
                    {{ modsPrice }} din
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="text-xl">
                    Poštarina
                  </p>
                  <p class="text-xl">
                    besplatna
                  </p>
                </div>
              </div>
              <div>
                <div class="flex justify-between">
                <p class="text-xl font-bold">
                  Ukupno
                </p>
                <p class="text-2xl font-bold">
                  {{ price }} din
                </p>
              </div>
              <p class="text-end text-gray-600">
                * plaćate pouzećem
              </p>
            </div>
          </div>
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <h4 class="text-2xl font-bold pl-3">
              Neka napomena?
            </h4>
            <textarea 
              v-model="note"
              name="note"
              id="note"
              class="border-black border-2 rounded-2xl p-2 outline-none w-full shadow-md flex-1 resize-none min-h-32"
              maxlength="1024"
            >
            </textarea>
          </div>
        </div>
    </div>
    <div class="flex justify-between">
      <Button 
        variant="outline"
        type="button"
        @click="emit('prev')"
        class="font-bold text-lg py-6 px-6 sm:ml-8 border-black border-2 shadow-md"
      >
        Prethodno
      </Button>
      <Button 
        type="submit"
        :disabled="false"
        class="font-bold text-lg py-[26px] px-6 sm:mr-8"
      >
        Naruči
      </Button>
    </div>
  </div>
</template>
