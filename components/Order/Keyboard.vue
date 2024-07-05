<script setup lang="ts">
import { SelectItem } from '../ui/select';
import Select from '../ui/select/Select.vue';
import SelectContent from '../ui/select/SelectContent.vue';
import SelectTrigger from '../ui/select/SelectTrigger.vue';
import SelectValue from '../ui/select/SelectValue.vue';

const cameFromForm = useRoute().params.form === "true"

const formKeyboards = cameFromForm ? useFormData().value.response.matchingKeyboards : null
const formSwitches = cameFromForm ? useFormData().value.response.matchingSwitches : null
const formKeycaps = cameFromForm ? useFormData().value.response.matchingKeycaps : null

const { 
  data: keyboards, 
  error: keyboardsError, 
  pending: keyboardsPending,
  execute: fetchKeyboards,
} = await useFetch("/api/keyboards", {
  immediate: !cameFromForm,
})

const { 
  data: switches, 
  error: switchesError, 
  pending: switchesPending,
  execute: fetchSwitches,
} = await useFetch("/api/switches", {
  immediate: !cameFromForm,
})

const { 
  data: keycaps, 
  error: keycapsError, 
  pending: keycapsPending,
  execute: fetchKeycaps,
} = await useFetch("/api/keycaps", {
  immediate: !cameFromForm,
})
</script>

<template>
  <h2 class="text-3xl sm:text-4xl md:text-5xl ">
    Tastatura
  </h2>
  <FormField v-slot="{ componentField }" name="keyboardColorId">
    <FormItem>
      <FormLabel v-bind="componentField" class="text-xl">
        Telo tastature 
      </FormLabel>
      <FormControl>
        <Select v-bind="componentField">
          <SelectTrigger>
            <SelectValue placeholder="Odaberi opciju"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="keyboard in keyboards" :key="keyboard.id" :value="keyboard.id">
              {{ keyboard.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormDescription>
        This is your public display name.
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
