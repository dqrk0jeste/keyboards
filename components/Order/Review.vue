<script setup lang="ts">
import { useToast } from '../ui/toast'

const emit = defineEmits<{
  prev: [],
}>()

const order = useOrder()

const keyboardPrice = computed(() => order.value.keyboardColor!.price + order.value.keycaps!.price + order.value.switches!.price)

const modsPrice = computed(() => {
  return mods.reduce((current, mod) => {
    if(!mod.key) return current;
    if(order.value[mod.key]) {
      return current + mod.price
    }
    return current
  }, 0)
})

const price = computed(() => keyboardPrice.value + modsPrice.value)

const note = ref("")
const hasOrdered = ref(false)

const loading = ref(false)
async function placeOrder() {
  loading.value = true
  const {
    keyboardColor,
    switches,
    keycaps,
    tapeMod,
    handlubedSwitches,
    extraFoam,
    name,
    address,
    phoneNumber,
  } = order.value

  const orderBody = {
    keyboardColorId: keyboardColor?.id,
    keycapId: keycaps?.id,
    switchId: switches?.id,
    tapeMod, 
    handlubedSwitches,
    extraFoam,
    name,
    address,
    phoneNumber,
    note: note.value,
    checkoutPrice: price.value,
  }

  const { id } = await $fetch("/api/orders", {
    method: "POST",
    body: orderBody,
  })

  loading.value = false
  hasOrdered.value = true
  const { toast } = useToast()
  toast({
    title: "Hvala Vam na poverenju!",
    description: "Vaša porudžbina je primljenja. Preusmeravamo...",
  })
  setTimeout(() => navigateTo(`/orders/${ id }`, {
    replace: true,
  }), 3000)
}
</script>

<template>
  <div class="space-y-8">
    <div class="border-black sm:border-2 rounded-2xl sm:p-8 space-y-4">
      <div class="flex gap-4 lg:gap-8 flex-col lg:flex-row">
        <div class="flex-1 flex flex-col gap-2">
          <h4 class="text-2xl font-bold pl-3">
            Tastatura
          </h4>
          <div class="flex-1 space-y-4 p-4 border-2 border-black rounded-2xl bg-white shadow-md">
            <OrderSelectItem 
              type="keyboards"
              :item="order.keyboardColor!"
              locked
              class="border-2 border-black bg-white"
            />
            <OrderSelectItem 
              type="switches"
              :item="order.switches!"
              locked
              class="border-2 border-black bg-white"
            />
            <OrderSelectItem 
              type="keycaps"
              :item="order.keycaps!"
              locked
              class="border-2 border-black bg-white"
            />
            <Accordion
              type="single"
              collapsible
              :disabled="true"
              class="bg-white"
            >
              <OrderMod v-for="(mod, index) in mods" :mod :index locked/>
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
                {{ order.name }}
              </p>
              <p class="text-xl">
                {{ order.address }}
              </p>
              <p class="text-xl">
                {{ order.phoneNumber }}
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
    </div>
    <div class="flex justify-between">
      <Button 
        type="button"
        @click="emit('prev')"
        class="font-bold text-lg py-6 px-6 sm:ml-8"
      >
        Prethodno
      </Button>
      <Button 
        type="button"
        :disabled="loading || hasOrdered"
        @click="placeOrder"
        class="font-bold text-lg py-6 px-6 sm:mr-8"
      >
        <span v-if="loading">
          Loading
        </span>
        <span v-else>
          Naruči
        </span>
      </Button>
    </div>
  </div>
</template>
