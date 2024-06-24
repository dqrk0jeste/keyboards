<script setup lang="ts">
</script>

<template>
  <div class="bg h-screen flex items-center justify-center">
    <div class="px-8 flex flex-col gap-3">
      <div class="flex-1 flex flex-col gap-3">
        <h1 class="text-3xl text-black font-bold text-center">
          Sastavite svoju novu mehaničku tastaturu!
        </h1>
        <h2 class="text-center text-lg md:text-2xl lg:text-left text-gray-700">
          Naš upitnik će Vam pomoći u tome - ostalo prepustite nama.
        </h2>
      </div>
      <div class="flex-1 flex flex-col gap-3 items-center justify-center">
        <NuxtLink to="/" class="text-white font-bold bg-black rounded-md px-4 py-2 cursor-pointer">
          Započni upitnik
        </NuxtLink> 
        <NuxtLink to="/" class="text-gray-700 cursor-pointer hover:underline">
          Znam šta radim, sam ću.
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .bg {
    background-image: url('~/assets/images/pattern.svg');
    background-repeat: repeat;
  } 
</style>
