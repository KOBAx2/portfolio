<script setup lang="ts">
import { getHistoryData, type GroupedEntry } from "../utils/historyLoader";

function fetchHistory(): GroupedEntry[] {
  const data = getHistoryData();
  if (!data || data.length === 0) return [];
  return data;
}

const historyGroups = fetchHistory();
</script>

<template>
  <section id="history" class="section">
    <h2>History</h2>
    <ul class="history-list">
      <li v-for="group in historyGroups" :key="group.year">
        <h3>{{ group.year }}</h3>

        <p v-for="entry in group.entries" :key="entry.id">
          <a
            v-if="entry.url"
            :href="entry.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ entry.title }}
          </a>

          <span v-else-if="entry.title">
            {{ entry.title }}
          </span>

          <span v-if="entry.title"> | </span>

          {{ entry.desc }}
        </p>
      </li>
    </ul>
  </section>
</template>
