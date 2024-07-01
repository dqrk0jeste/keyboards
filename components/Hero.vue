<script setup lang="ts">
</script>

<template>
  <section class="px-4 h-screen flex items-center justify-center">
    <div class="flex flex-col gap-3 items-center">
      <h1 class="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-black font-bold text-center">
        Sastavite svoju novu mehaničku tastaturu
      </h1>
      <h2 class="text-balance text-center text-lg md:text-2xl text-gray-700">
        Upitnik će Vam pomoći u odabiru. Ostalo prepustite nama.
      </h2>
      <div class="pt-3 flex gap-3">
        <NuxtLink to="/">
          <Button class="text-lg font-bold py-6">
            Započni upitnik
          </Button>
        </NuxtLink> 
        <NuxtLink to="/">
          <Button variant="outline" class="text-lg font-bold py-6">
            Sastavi sam
          </Button>
        </NuxtLink> 
      </div>
    </div>
  </section>
</template>
