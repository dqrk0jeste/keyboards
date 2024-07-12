<script setup lang="ts">
import { Toaster } from './components/ui/toast'

</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtPage />
  <Toaster />
</template>

<style>
  body {
    position: relative;
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    background-image: url('@/assets/images/pattern.svg');
    background-repeat: repeat;
    background-attachment: fixed;
  }
</style>
