<script setup lang="ts">
import Links from "./components/Links.vue"
import History from "./components/History.vue"
import About from "./components/About.vue"
import { onMounted } from "vue"
import { appendExternalSvgIcons } from "./utils/appendSvg"
import { useScroll } from "./utils/scroll.ts"

onMounted(() => {
  appendExternalSvgIcons()
})
useScroll(".section")
</script>

<template>
  <main>
    <Links />
    <History />
    <About />
  </main>
</template>
