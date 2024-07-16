<script setup lang="ts">
const id = useRoute().params.id as string
const order = await $fetch(`/api/orders/${ id }`)

const orderStatus = order.shippedAt ? 100 : 50

const orderMessage = order.shippedAt ? "Tastatura je poslata " + order.shippedAt : "Tastatura je trenutno u izradi..."

const shouldShowId = ref(false)
</script>

<template>
  <div class="max-w-screen-xl m-auto py-16 px-4 space-y-8">
    <div>
      <h1 class="font-bold text-3xl md:text-4xl text-center">
        Porudžbina 
        <span v-if="shouldShowId">
          {{ id }}
        </span>
        <button v-else class="hover:underline inline" @click="shouldShowId = true">
          <span class="text-3xl md:text-4xl text-gray-600">
            prikaži id...
          </span>
        </button>
      </h1>
    </div>
    <section class="max-w-screen-sm m-auto ">
      <h2 class="font-bold text-2xl pl-3">
        Primalac
      </h2>
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
        <p class="font-bold text-2xl">
          Cena: {{ order.checkoutPrice }}
        </p>
      </div>
    </section>
    <section class="max-w-screen-sm m-auto relative space-y-4">
      <h3 class="text-center text-xl">
        {{ orderMessage }}
      </h3>
      <Progress :model-value="orderStatus" class="h-8"/>  
      <div
        class="absolute left-0 bottom-0 bg-gray-300 w-8 aspect-square rounded-full"
        :style="{
          backgroundColor: 'hsl(222.2, 47.4%, 11.2%)',
        }"
      >
        <p class="absolute left-1/2 -bottom-8 text-lg text-gray-600 -translate-x-1/4 md:-translate-x-1/2 whitespace-nowrap">
          Primljena 📩
        </p>
      </div>
      <div
        class="absolute left-1/2 bottom-0 bg-gray-300 w-8 aspect-square rounded-full -translate-x-1/2"
        :style="{
          backgroundColor: orderStatus >= 50 ? 'hsl(222.2, 47.4%, 11.2%)' : 'hsl(216, 12.2%, 83.9%)',
        }"
      >
        <p class="absolute left-1/2 whitespace-nowrap -bottom-8 text-lg text-gray-600 -translate-x-1/2">
          U izradi 🔨
        </p>
      </div>
      <div
        class="absolute right-0 bottom-0 bg-gray-300 w-8 aspect-square rounded-full"
        :style="{
          backgroundColor: orderStatus === 100 ? 'hsl(222.2, 47.4%, 11.2%)' : 'hsl(216, 12.2%, 83.9%)',
        }"
      >
        <p class="absolute left-1/2 -bottom-8 text-lg text-gray-600 -translate-x-3/4 md:-translate-x-1/2 whitespace-nowrap">
          Poslata 📨
        </p>
      </div>
    </section>
  </div>
</template>
