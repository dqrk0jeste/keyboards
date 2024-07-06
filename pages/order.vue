<script setup lang="ts">
const order = useOrder()

const formPart = ref("keyboard" as "keyboard" | "personal")

async function submitForm() {
  const parsed = orderSchema.safeParse(order)
  if(!parsed.success) {

  }
  parsed.data
  // send order
}
</script>

<template>
  <div class="max-w-screen-lg m-auto py-16 px-4">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold">
      Vaša narudžba
    </h1>
    <form class="space-y-6 py-8" @submit="submitForm">
      <OrderKeyboard v-if="formPart === 'keyboard'"/>
      <OrderPersonal v-else/>
      <Button type="submit">
        Submit
      </Button>
    </form>
  </div>
</template>
