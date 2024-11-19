
    <script setup>
    import WelcomeItem from './projetItem.vue'
    import DocumentationIcon from './icons/IconDocumentation.vue'
    
    </script>
    
    <template>
    <p></p><p></p>
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>france-nuit</template>
    
       
      </WelcomeItem>,<p></p><p></p>
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>RGPD</template>
    
       
      </WelcomeItem>
      
      
    </template>
    