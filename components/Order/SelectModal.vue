<script setup lang="ts">
const props = defineProps<{
  type: "keyboards" | "switches" | "keycaps",
}>()

const keyboardBuildKey = props.type === "keyboards" ? "keyboard" : props.type
type Type = KeyboardBuild[typeof keyboardBuildKey]

const items = ref([] as Type[])
const otherItems = ref([] as Type[])

const form = getFormResult()

if(form) {
  items.value = form.response[props.type].matching
} else {
  items.value = (await $fetch("/api/" + props.type) as Type[])
    .filter((item) => item.stock > 0)
}

const selected = defineModel<Type | null>()
selected.value = form?.chosen[keyboardBuildKey]

const hasLoadedAll = ref(false)
const isActive = ref(false)

function loadAll() {
  if(form) {
    otherItems.value = form.response[props.type].other
    hasLoadedAll.value =  true
  }
}
</script>

<template>
  <OrderSelectItem 
    v-if="selected"
    :type="props.type"
    :item="selected"
    @click="isActive = true"
    class="border-2 border-black bg-white hover:bg-gray-50"
  />
  <button 
    v-else 
    type="button"
    @click="isActive = true"
    class="w-full flex items-center gap-2 p-2 rounded-lg border-2 border-black hover:bg-gray-50 bg-white"
  >
    <p class="text-2xl sm:text-4xl font-bold px-6 sm:px-8 py-4">
      ?
    </p>
    <p class="text-lg md:text-2xl font-bold text-start">
      <slot />
    </p>
  </button>
  <BaseModal
    :isActive="isActive" 
    @clicked-outside="isActive = false"
    class="w-[95%] max-w-screen-sm border-2 border-black rounded-2xl p-2 sm:p-5 bg-white drop-shadow-lg shadow-gray-500 space-y-4"
  >
    <div class="text-center rounded-full border-black border-2 px-2 py-5">
      <h3 class="text-lg xs:text-2xl font-bold px-4">
        <template v-if="form">
          Odgovaraju Vašoj pretrazi
        </template>
        <template v-else>
          <slot />
        </template>
      </h3>
    </div> 
    <div>
      <OrderSelectItem 
        v-for="item in items" 
        :item="item" 
        :type="props.type"
        @click="selected = item; isActive = false"
        class="border-transparent border-2 hover:border-black hover:bg-gray-50"
      />
    </div>
    <template v-if="form && hasLoadedAll">
      <div class="text-center rounded-full border-black border-2 px-2 py-5">
        <h3 class="text-lg xs:text-2xl font-bold px-4">
          Ostale opcije
        </h3>
      </div>
      <div>
        <OrderSelectItem 
          v-for="item in otherItems" 
          :item="item" 
          :type="props.type"
          @click="selected = item; isActive = false"
          class="border-transparent border-2 hover:border-black"
        />
      </div>
    </template>
    <button
      type="button"
      v-else-if="form"
      class="text-center rounded-full border-black border-2 px-2 py-5 w-full hover:bg-gray-50"
      @click="loadAll"
    >
      <h3 class="text-lg xs:text-2xl font-bold px-4">
        Pogledaj ostale
      </h3>
    </button>
  </BaseModal>
</template>
