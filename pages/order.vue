<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate';
import { z } from 'zod';

const order = useOrder()
const form = useForm({
  validationSchema: toTypedSchema(z.object({ name: z.string().min(2) }))
})

const submitForm = form.handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <div class="max-w-screen-lg m-auto py-16 px-4">
    {{ order }}
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold">
      Vaša narudžba
    </h1>
    <form class="space-y-6" @submit="submitForm">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">
        Submit
      </Button>
    </form>
  </div>
</template>
