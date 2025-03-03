
    <script setup>
    import WelcomeItem from './projetItem.vue'
    import DocumentationIcon from './icons/IconDocumentation.vue'
    
    </script>
    
    <template>
    
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>RGPD</template></WelcomeItem><br/>,
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>francenuit</template></WelcomeItem><br/>,
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>uptime</template></WelcomeItem><br/>,
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>youtube</template></WelcomeItem><br/>
      
      
    </template>
    