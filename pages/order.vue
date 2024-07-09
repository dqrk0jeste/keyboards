<script setup lang="ts">
const order = useOrder()

const formPart = ref(0)

async function submitForm() {
  const parsed = orderSchema.safeParse(order)
  if(!parsed.success) {

  }
  parsed.data
  // send order
}
</script>

<template>
  <div class="max-w-screen-xl m-auto py-16 px-4">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold">
      Vaša narudžba
    </h1>
    <form class="space-y-6 py-8" @submit="submitForm">
      <div class="flex items-center justify-between gap-3 w-full">
        <button>
          <IconArrow class="rotate-180"/>
        </button>
        <div class="hidden flex-1 md:flex items-center border-black border-2 rounded-2xl divide-black divide-x-2 overflow-hidden">
          <button 
            type="button" 
            class="flex-1 font-bold text-lg py-2 transition-colors"
            :style="{
              backgroundColor: formPart === 0 ? 'black' : 'white',
              color: formPart === 0 ? 'white' : 'black',
            }"
            @click="formPart = 0"
          >
            Tastatura
          </button>
          <button
            type="button"
            class="flex-1 font-bold text-lg py-2 transition-colors"
            :style="{
              backgroundColor: formPart === 1 ? 'black' : 'white',
              color: formPart === 1 ? 'white' : 'black',
            }"
            @click="formPart = 1"
          >
            Modovi
          </button>
          <button
            type="button"
            class="flex-1 font-bold text-lg py-2 transition-colors"
            :style="{
              backgroundColor: formPart === 2 ? 'black' : 'white',
              color: formPart === 2 ? 'white' : 'black',
            }"
            @click="formPart = 2"
          >
            Lični podaci
          </button>
          <button
            type="button"
            class="flex-1 font-bold text-lg py-2 transition-colors"
            :style="{
              backgroundColor: formPart === 3 ? 'black' : 'white',
              color: formPart === 3 ? 'white' : 'black',
            }"
            @click="formPart = 3"
          >
            Pregled
          </button>
        </div>
        <button>
          <IconArrow />
        </button>
      </div>
      <KeepAlive>
        <OrderKeyboard v-if="formPart === 0" @next="formPart++"/>
        <OrderMods v-else-if="formPart === 1" @prev="formPart--" @next="formPart++"/>
        <OrderPersonal v-else-if="formPart === 2" @prev="formPart--" @next="formPart++"/>
        <OrderReview v-else @prev="formPart--"/>
      </KeepAlive>
      <Button 
        type="submit" 
        v-if="formPart === 3"
      >
        Submit
      </Button>
    </form>
  </div>
</template>
