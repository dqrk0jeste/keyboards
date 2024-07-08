<template>
  <section class="px-4 min-h-screen flex items-center justify-center">
    <div class="flex flex-col gap-3 items-center">
      <h1 class="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-black font-bold text-center">
        Sastavite svoju novu mehaničku tastaturu
      </h1>
      <h2 class="text-center text-lg sm:text-2xl text-gray-700">
        <span class="whitespace-nowrap">
          Upitnik će Vam pomoći u odabiru.
        </span>
        <span class="block md:inline">
          Ostalo prepustite nama.
        </span>
      </h2>
      <div class="pt-3 flex gap-3">
        <NuxtLink to="/form" class="w-full">
          <Button class="w-full text-md sm:text-lg font-bold py-6">
            Započni upitnik
          </Button>
        </NuxtLink> 
        <NuxtLink to="/order" class="w-full">
          <Button variant="outline" class="w-full text-md sm:text-lg font-bold py-6">
            Sastavi sam
          </Button>
        </NuxtLink> 
      </div>
    </div>
  </section>
</template>
