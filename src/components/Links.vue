<script setup lang="ts">
import { getLinkData } from "../utils/linkLoader"
const links = getLinkData()
</script>

<template>
  <section id="links" class="section">
    <h2>Links</h2>
    <ul class="link-list">
      <li v-for="link in links" :key="link.id">
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          {{ link.title }}
        </a>
      </li>
    </ul>
  </section>
</template>
