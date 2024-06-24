<script setup lang="ts">
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="px-8 flex flex-col gap-3 items-center">
      <h1 class="text-3xl md:text-4xl lg:text-5xl text-black font-bold text-center">
        Sastavite svoju novu mehaničku tastaturu!
      </h1>
      <h2 class="text-center text-lg md:text-2xl text-gray-700">
        Upitnik će Vam pomoći u odabiru. Ostalo prepustite nama.
      </h2>
      <NuxtLink to="/">
        <Button class="font-bold py-6">
          <span class="text-lg">
            Započni upitnik
          </span>
        </Button>
      </NuxtLink> 
    </div>
  </div>
</template>
