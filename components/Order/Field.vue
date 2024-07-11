<script setup lang="ts">
const props = defineProps<{
  name: string,
  title: string,
  type: string,
}>()  
</script>

<template>
  <FormField v-slot="{ componentField }" :name="props.name">
    <FormItem>
      <FormLabel>
        <span class="text-lg font-bold">
          {{ props.title }}
        </span>
      </FormLabel>
      <FormControl>
        <Input :type="props.type" v-bind="componentField"/>
      </FormControl>
      <FormDescription />
      <FormMessage />
    </FormItem>
  </FormField>
</template>
