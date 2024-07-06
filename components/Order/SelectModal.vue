<script setup lang="ts" generic="T extends Option">
// @ts-ignore
  interface Option {
    id: string,
    name: string,
    price: number,
  }

  const props = defineProps<{
    items: T[], 
  }>()

  const emits = defineEmits<{
    selected: [selectedOption: T],
  }>()

  const active = ref(false)
  const selected: Ref<T | undefined> = ref()
  const modal = ref<HTMLElement>()

onClickOutside(modal, () => {
  active.value = false
})
</script>

<template>
  <div @click="active = true">
    <span v-if="selected">
      <img src="@/assets/images/keyboard_1.jpg">
      {{ selected.name }}
    </span>
    <span v-else>
      <slot/>
    </span>
  </div>
  <Teleport to="body" v-if="active">
    <div class="absolute top-0 left-0 h-[100dvh] w-full backdrop-blur flex items-center justify-center z-50">
      <div ref="modal">
        <div v-for="item in items">
          <span>
            <img src="@/assets/images/keyboard_1.jpg" class="w-20">
            {{ item.name }}
            {{ item.price }}
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>
