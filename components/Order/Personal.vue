<script setup lang="ts">
import { z } from "zod"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"

const emit = defineEmits<{
  prev: [],
  next: [],
}>() 

const order = useOrder()

const schema = toTypedSchema(z.object({
  name: z
    .string({
      message: "Obavezno!"
    })
    .max(255, "Blago tvojim roditeljima!"),
  surname: z
    .string({
      message: "Obavezno!"
    })
    .max(255, "Blago tvojim roditeljima!"),
  postalCode: z
    .number({
      message: "Obavezno!"
    })
    .min(0, "Poštanski broj mora veći od 0")
    .max(1000000, "Stroke?"),
  city: z
    .string({
      message: "Obavezno!"
    })
    .max(255, "Sigurni ste da taj grad postoji?!"),
  street: z
    .string({
      message: "Obavezno!"
    })
    .max(255, "Sigurni ste da ta ulica postoji?!"),
  phoneNumber: z
    .string({
      message: "Obavezno!"
    })
    .max(255, "Sigurni ste da da je ovo Vaš broj telefona?")
}))

const form = useForm({
  validationSchema: schema,
})

const submitPart = form.handleSubmit((values) => {
  order.value.name = values.name + " " + values.surname
  order.value.address = values.street + ", " + values.postalCode + ", " + values.city
  order.value.phoneNumber = values.phoneNumber
  emit("next")
})
</script>

<template>
  <form class="space-y-8" @submit="emit('next')">
    <div class="border-black sm:border-2 rounded-2xl sm:p-8 space-y-4">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">
        Vaši podaci
      </h2>
      <div class="flex gap-6 flex-col sm:flex-row sm:gap-16">
        <div class="space-y-4 max-w-screen-xs">
          <OrderField name="name" title="Ime" type="text"/>
          <OrderField name="surname" title="Prezime" type="text"/>
          <OrderField name="phoneNumber" title="Broj telefona" type="text"/>
        </div>
        <div class="space-y-4 max-w-screen-xs">
          <OrderField name="postalCode" title="Poštanski broj" type="number"/>
          <OrderField name="city" title="Grad" type="text"/>
          <OrderField name="street" title="Ulica i broj" type="text"/>
        </div>
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
        type="submit"
        @click.prevent="submitPart"
        class="font-bold text-lg py-6 px-6 sm:mr-8"
      >
        Sledeće
      </Button>
    </div>
  </form>
</template>
