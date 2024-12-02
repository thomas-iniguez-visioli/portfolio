
<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'

</script>

<template>
<p></p><p></p>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>portfolio</template>

   
  </WelcomeItem>,<p></p><p></p>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>RGPD</template>

   
  </WelcomeItem>
  
  
</template>
