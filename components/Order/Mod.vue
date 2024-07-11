<script setup lang="ts">
const { mod } = defineProps<{
  index: number,
  mod: Mod,
}>()

const order = useOrder()
const state = ref(mod.required)

watch(state, () => {
  if(mod.key) {
    order.value[mod.key] = state.value
  }
})
</script>

<template>
  <AccordionItem
    :value="index.toString()"
    class="bg-white"
  >
    <AccordionTrigger class="hover:no-underline ">
      <div class="flex items-center gap-3">
        <h3 class="text-xl sm:text-2xl font-bold">
          {{ mod.title }}
        </h3>
        <Switch
          @click.stop
          :disabled="mod.required"
          v-model:checked="state"
        />
        <p class="text-lg">
          {{ mod.price ? `+ ${ mod.price } din` : "besplatno"}}
        </p>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <p class="text-lg sm:text-xl">
        {{ mod.desc }}
      </p>
    </AccordionContent>
  </AccordionItem>
</template>
