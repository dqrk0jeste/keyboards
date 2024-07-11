<script setup lang="ts">
import { z } from "zod"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate";
import { NumberField } from "../ui/number-field";

const emit = defineEmits<{
  prev: [],
  next: [],
}>() 

const order = useOrder()

const valid = computed(() => {
  if(order.value.name) {
    return true
  }
  return false
})

const schema = toTypedSchema(z.object({
  name: z
    .string({
      message: "Obavezno!"
    })
    .min(2, "Ime mora biti duže od 1 karaktera")
    .max(255, "Blago tvojim roditeljima!"),
  surname: z
    .string({
      message: "Obavezno!"
    })
    .min(2, "Prezime mora biti duže od 1 karaktera")
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
    .min(2, "Ime grada mora biti duže od 1 karaktera")
    .max(255, "Sigurni ste da taj grad postoji?!"),
  street: z
    .string({
      message: "Obavezno!"
    })
    .min(2, "Ime mora biti duže od 1 karaktera")
    .max(255, "Sigurni ste da ta ulica postoji?!"),
  houseNumber: z
    .number({
      message: "Obavezno!"
    })
    .min(1, "Ulični broj mora biti veći od 1")
    .max(1000000, "To je jedna dugačka ulica!"),
  phoneNumber: zPhone,
}))

const form = useForm({
  validationSchema: schema,
})
</script>

<template>
  <form class="space-y-8" @submit="emit('next')">
    <div class="border-black sm:border-2 rounded-2xl sm:p-8 space-y-6">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">
        Vaši podaci
      </h2>
      <div class="flex gap-6 flex-col sm:flex-row w-full">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>
              <span class="text-lg font-bold">
                Ime
              </span>
            </FormLabel>
            <FormControl>
              <Input placeholder="shadcn" v-bind="componentField"/>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="surname">
          <FormItem>
            <FormLabel>
              <span class="text-lg font-bold">
                Prezime
              </span>
            </FormLabel>
            <FormControl>
              <Input placeholder="shadcn" v-bind="componentField"/>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div>
        <div class="flex gap-6 flex-col sm:flex-row">
          <FormField v-slot="{ componentField }" name="postalCode">
            <FormItem>
              <FormLabel>
                <span class="text-lg font-bold">
                  Poštanski broj
                </span>
              </FormLabel>
              <NumberField>
                <NumberFieldContent>
                  <FormControl>
                    <NumberFieldInput @update:model-value="(value) => form.setFieldValue('postalCode', value)" class="max-w-36"/>
                  </FormControl>
                </NumberFieldContent>
              </NumberField>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="city">
            <FormItem>
              <FormLabel>
                <span class="text-lg pl-3 font-bold">
                  Grad
                </span>
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" v-bind="componentField"/>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <FormField v-slot="{ componentField }" name="street">
          <FormItem>
            <FormLabel>
              <span class="text-lg pl-3 font-bold">
                Ulica
              </span>
            </FormLabel>
            <FormControl>
              <Input placeholder="shadcn" v-bind="componentField"/>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="houseNumber">
          <FormItem>
            <FormLabel>
              <span class="text-lg pl-3 font-bold">
                Broj
              </span>
            </FormLabel>
            <FormControl>
              <Input placeholder="shadcn" v-bind="componentField"/>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
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
  </form>
</template>
