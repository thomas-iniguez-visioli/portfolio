
    <script setup>
    import WelcomeItem from './situationItem.vue'
    import DocumentationIcon from './icons/IconDocumentation.vue'
    
    </script>
    
    <template>
    <p></p><p></p>
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>1</template>
    
       
      </WelcomeItem>
      
      
    </template>
    