<script setup lang="ts">
const props = withDefaults(defineProps<{
  index: number,
  mod: Mod,
  locked?: boolean,
}>(),
{
  locked: false,
})

const order = useOrder()
const state = ref(props.mod.required || order.value[props.mod.key])

watch(state, () => {
  if(props.mod.key) {
    order.value[props.mod.key] = state.value
  }
})
</script>

<template>
  <AccordionItem
    :value="props.index.toString()"
    class="bg-white"
  >
    <AccordionTrigger class="hover:no-underline">
      <div class="flex items-center gap-3">
        <h3 class="text-xl sm:text-2xl font-bold">
          {{ props.mod.title }}
        </h3>
        <Switch
          @click.stop
          :disabled="props.mod.required || locked"
          v-model:checked="state"
        />
        <p class="text-lg">
          {{ props.mod.price ? `+ ${ props.mod.price } din` : "besplatno"}}
        </p>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <p class="text-lg sm:text-xl">
        {{ props.mod.desc }}
      </p>
    </AccordionContent>
  </AccordionItem>
</template>
