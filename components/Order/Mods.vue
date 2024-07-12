<script setup lang="ts">
const emit = defineEmits<{
  next: [],
  prev: [],
}>()
</script>

<template>
  <div class="space-y-8">
    <div class="border-black sm:border-2 rounded-2xl sm:p-8">
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">
            A sada najbitniji deo!
          </h2>
          <h3 class="text-xl sm:text-2xl pt-4">
            Ono što custom tastature čini tako dobrim jeste modovanje - ručno doterivanje tastature do željenih performansi.
          </h3>
        </div>
        <Accordion
          type="single"
          defaultValue="0"
          collapsible
          class="bg-white"
        >
          <OrderMod v-for="(mod, index) in mods" :mod :index />
        </Accordion>
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
        @click="emit('next')"
        class="font-bold text-lg py-6 px-6 sm:mr-8"
      >
        Sledeće
      </Button>
    </div>
  </div>
</template>
