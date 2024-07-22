<script setup lang="ts">
const props = defineProps<{
  index: number,
  mod: Mod,
  locked?: boolean,
}>()

const state = defineModel<boolean>()

// default value
state.value = state.value || props.mod.required
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
          {{ props.mod.price }} din
        </p>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <p class="text-lg">
        {{ props.mod.desc }}
      </p>
    </AccordionContent>
  </AccordionItem>
</template>
