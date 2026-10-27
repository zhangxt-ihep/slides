<script setup>
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import { pageLabel } from './page-numbering.mjs'

const { $page } = useSlideContext()
const { slides } = useNav()
const label = computed(() => pageLabel($page.value, slides.value.map(slide => slide.meta.slide.frontmatter)))
</script>

<template>
  <span class="rucio-page-number" :data-physical-page="$page" :aria-label="`Page ${label}`">{{ label }}</span>
</template>
