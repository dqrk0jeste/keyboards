<script setup lang="ts">
const emit = defineEmits<{
  next: [],
  prev: [],
}>()

const selected = defineModel<{
  stabilisers: boolean,
  handlubedSwitches: boolean,
  extraFoam: boolean,
  tapeMod: boolean,
}>({
  required: true
})
</script>

<template>
  <div class="space-y-8">
    <div class="border-black sm:border-2 rounded-2xl sm:p-8 sm:bg-white sm:shadow-md">
      <div class="space-y-4">
        <div class="space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold">
            A sada najbitniji deo!
          </h2>
          <h3 class="text-xl">
            Ono što custom tastature čini tako dobrim jeste modovanje - ručno doterivanje tastature do željenih performansi.
          </h3>
        </div>
        <Accordion
          type="single"
          defaultValue="0"
          collapsible
          class="bg-white"
        >
          <OrderMod
            v-for="(mod, index) in mods"
            :mod
            :index
            v-model="selected[mod.key]"
          />
        </Accordion>
      </div>
    </div>
    <div class="flex justify-between">
      <Button 
        variant="outline"
        type="button"
        @click="emit('prev')"
        class="font-bold text-lg py-6 px-6 sm:ml-8 border-black border-2 shadow-md"
      >
        Prethodno
      </Button>
      <Button 
        variant="outline"
        type="button"
        @click="emit('next')"
        class="font-bold text-lg py-6 px-6 sm:ml-8 border-black border-2 shadow-md"
      >
        Sledeće
      </Button>
    </div>
  </div>
</template>
