
<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <p></p><p></p>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>RGPD</template>

   
  </WelcomeItem>
  <p></p><p></p>
  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>portfolio</template>

   


  </WelcomeItem>
  <p></p><p></p><p></p><p></p>
  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

   
  </WelcomeItem>
  <p></p><p></p>
  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>


  </WelcomeItem>
  <p></p><p></p>
  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

  </WelcomeItem>
</template>
