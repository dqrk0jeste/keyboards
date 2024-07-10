<script setup lang="ts">
const emit = defineEmits<{
  next: [],
  prev: [],
}>()

const order = useOrder()

const valid = computed(() => 
  order.value.extraFoam 
  && order.value.handlubedSwitches
)

const mods = [
  {
    title: "Stabilizatori",
    desc: "Najbitnije od najbitnijeg su svakako stabilizatori. Nepodmazani i neuravnoteženi stabilizatori su najčešći razlog lošeg zvuka i osećaja pri kucanju. Zato je njihovo sređivanje nezaobilazan korak naše usluge - svaka tastatura koju naručite kod nas dolazi sa podmazanim i uravnoteženim stabilizatorima.",
    price: 0,
    required: true,
  },
  {
    title: "Tape Mod",
    desc: "Ovaj mod je jedan od najpopularnijih i najlakših modova i podrazumeva lepljenje jednog do dva sloja trake na poleđinu ploče tastature. Doprinosi tišem i dubljem zvuku. S obzirom da je u pitanju vrlo lak mod, koji gotovo uvek drastično pomogne celopkupnom zvuku tastature, nudimo ga besplatno, ali imate i opciju da ga preskočite ili eventualno uradite sami.",
    price: 0,
    required: false,
  },
]
</script>

<template>
  <div class="space-y-8">
    <div class="border-black sm:border-2 rounded-2xl sm:p-8">
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">
            A sada najbitniji deo!
          </h2>
          <h3 class="text-xl sm:text-2xl pt-4">
            Ono što custom tastature čini tako dobrim jeste modovanje - ručno doterivanje tastature do željenih performansi.
          </h3>
        </div>
        <OrderMod v-for="(mod, index) in mods" :mod :index="index + 1"/>
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
        :disabled="!valid"
        @click="emit('next')"
        class="font-bold text-lg py-6 px-6 sm:mr-8"
      >
        Sledeće
      </Button>
    </div>
  </div>
</template>
