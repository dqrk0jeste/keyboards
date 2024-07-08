<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  isActive: boolean,
}>()

const emit = defineEmits<{
  "clicked-outside": [],
}>()

const modal = ref<HTMLElement>()

onClickOutside(modal, () => {
  emit("clicked-outside")  
})
</script>

<template>
  <Teleport to="body" v-if="props.isActive">
    <div class="absolute top-0 left-0 h-[100dvh] w-full backdrop-blur flex items-center justify-center z-50">
      <div 
        ref="modal" 
        class="max-h-[80dvh] max-w-[90vw] overflow-auto"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
