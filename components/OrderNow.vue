<template>
  <section class="max-w-screen-xl m-auto px-4 py-16 flex flex-col-reverse lg:flex-row gap-12 lg:gap-6 items-center">
    <div class="flex-1 flex flex-col gap-6 items-center">
      <h3 class="text-center text-balance text-2xl md:text-3xl lg:text-4xl font-bold">
        Vaša nova tastatura čeka na Vas!
      </h3>
      <NuxtLink to="/">
        <Button class="text-lg font-bold py-6">
          Započni upitnik
        </Button>
      </NuxtLink> 
    </div>
    <div class="flex-1 max-w-screen-sm">
      <img src="~/assets/images/keyboard_1.jpg" alt="" class="rounded-2xl">
    </div>
  </section>
</template>
