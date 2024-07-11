<script setup lang="ts">
const emit = defineEmits<{
  next: [],
  prev: [],
}>()

const order = useOrder()

const mods: Mod[] = [
  {
    title: "Stabilizatori",
    desc: "Najbitnije od najbitnijeg su svakako stabilizatori. Nepodmazani i neuravnoteženi stabilizatori su najčešći razlog lošeg zvuka i osećaja pri kucanju. Zato je njihovo sređivanje nezaobilazan korak naše usluge - svaka tastatura koju naručite kod nas dolazi sa podmazanim i uravnoteženim stabilizatorima.",
    price: 0,
    required: true,
    key: null,
  },
  {
    title: "Tape Mod",
    desc: "Ovaj mod je jedan od najpopularnijih i najlakših modova i podrazumeva lepljenje jednog do dva sloja trake na poleđinu ploče tastature. Doprinosi tišem i dubljem zvuku. S obzirom da je u pitanju vrlo lak mod, koji gotovo uvek drastično pomogne celopkupnom zvuku tastature, nudimo ga besplatno, ali imate i opciju da ga preskočite ili eventualno uradite sami.",
    price: 0,
    required: false,
    key: "tapeMod",
  },
  {
    title: "Svičevi",
    desc: "Prethodna dva moda su uglavnom dovoljna da Vaša nova tastatura bude fenomenalna. Ali ako želite da je zaista podignete na sledeći nivo, želite razmisliti o ručnom podmazivanju svičeva. Lube u svičevima doprinosi glađem osećaju pri kucanju, kao i tišem i dubljem zvuku.",
    price: 1000,
    required: false,
    key: "handlubedSwitches",
  },
  {
    title: "Foam Mod",
    desc: "Foam mod podrazumeva dodavanje dodatne pene u telo tastature, koja dodatno amortizuje vibracije nastale pri kucanju. Tastature sa foam modom zato karakteriše tiši i dublji zvuk.",
    price: 200,
    required: false,
    key: "extraFoam",
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
        <Accordion
          type="single"
          defaultValue="0"
          collapsible
          class="bg-white"
        >
          <OrderMod v-for="(mod, index) in mods" :mod :index />
        </Accordion>
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
  </div>
</template>
