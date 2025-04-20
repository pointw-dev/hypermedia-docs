<template>
  <h3 :id="slug" class="custom-heading" role="heading" aria-level="3">
    <a class="header-anchor" :href="'#' + slug"></a>
    {{ entry.title }}
  </h3>
  <h4 class="standards-reference" v-if="!isNaN(parseFloat(props.number))" :id="slug+props.number"><small>[{{prefix.toUpperCase()}} {{ number }}]</small></h4>
  <blockquote v-if="entry.description">{{ entry.description }}</blockquote>
  <div class="rfc-content">
    <slot />
  </div>
  <p v-if="prefix == 'rfc'" class="rfc-link">
    🔗 <a :href="rfcLink" target="_blank" rel="noopener">Read the spec</a>
  </p>
  <p v-if="entry.obsoletedBy" class="rfc-obsolete">
    ⚠️ This RFC has been <strong>obsoleted</strong> by
    <a :href="`https://www.rfc-editor.org/rfc/rfc${entry.obsoletedBy}.html`" target="_blank" rel="noopener">
      RFC {{ entry.obsoletedBy }}
    </a>.
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { standards } from '../data/standards.js'

const props = defineProps<{
  prefix: [String]
  number: [String]
}>()
// const props = defineProps({
//   rfc: [String, Number]
// })


// const entry = standards[props.prefix][props.number]

const entry = computed(() => {
  const prefix = String(props.prefix)
  const number = String(props.number)

  return standards?.[prefix]?.[number] || {
    title: `${prefix.toUpperCase()} ${number} (Coming Soon)`,
    description: 'Details for this RFC have not yet been added. Check back later!'
  }
})


const rfcLink = computed(() => `https://www.rfc-editor.org/rfc/rfc${props.number}.html`)
const slug = computed(() =>
    entry?.title || 'missing'.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
)
</script>

<style scoped>
.custom-heading {
  position: relative;
  font-size: 1.25em;
  font-weight: 600;
  margin-top: 2em;
  margin-bottom: 0.5em;
}

.custom-heading .header-anchor {
  float: left;
  margin-left: -1em;
  padding-right: 0.5em;
  opacity: 0;
  text-decoration: none;
  font-weight: normal;
}

.custom-heading:hover .header-anchor {
  opacity: 1;
}

.rfc-obsolete {
  margin-top: 0.5em;
  padding: 0.75em;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 6px;
  font-size: 0.95em;
  color: #856404;
}
.standards-reference {
  margin-top: -0.5em;
  padding-left: 1em;
}

</style>
