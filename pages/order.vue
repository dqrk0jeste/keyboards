<script setup lang="ts">
const order = useOrder()

const formParts = [ "Tastatura", "Modovi", "Lični podaci", "Pregled" ] as const
const currentPart = ref(2)

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
    <form class="py-8" @submit.prevent="submitForm">
      <div class="hidden sm:flex items-center border-black border-2 rounded-2xl divide-black divide-x-2 overflow-hidden">
        <div 
          v-for="(name, index) in formParts"
          class="flex-1 font-bold text-lg py-2 transition-colors text-center"
          :style="{
            backgroundColor: currentPart === index ? 'black' : 'white',
            color: currentPart === index ? 'white' : 'black',
          }"
        >
          {{ name }}
        </div>
      </div>
      <div
        v-if="currentPart < formParts.length - 1"
        class="flex sm:hidden items-center border-black border-2 rounded-2xl divide-black divide-x-2 overflow-hidden"
      >
        <div class="flex-1 font-bold text-lg py-2 transition-colors text-center bg-black text-white">
          {{ formParts[currentPart] }}
        </div>
        <div class="flex-1 font-bold text-lg py-2 transition-colors text-center bg-white text-black">
          {{ formParts[currentPart + 1] }}
        </div>
      </div>
      <div
        v-else
        class="flex sm:hidden items-center border-black border-2 rounded-2xl divide-black divide-x-2 overflow-hidden"
      >
        <div class="flex-1 font-bold text-lg py-2 transition-colors text-center bg-white text-black">
          {{ formParts[formParts.length - 2] }}
        </div>
        <div class="flex-1 font-bold text-lg py-2 transition-colors text-center bg-black text-white">
          {{ formParts[formParts.length - 1] }}
        </div>
      </div>
      <main class="pt-8">
        <KeepAlive>
          <OrderKeyboard v-if="currentPart === 0" @next="currentPart++"/>
          <OrderMods v-else-if="currentPart === 1" @prev="currentPart--" @next="currentPart++"/>
          <OrderPersonal v-else-if="currentPart === 2" @prev="currentPart--" @next="currentPart++"/>
          <OrderReview v-else @prev="currentPart--"/>
        </KeepAlive>
      </main>
    </form>
  </div>
</template>
