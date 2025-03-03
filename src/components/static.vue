
    <script setup>
    import WelcomeItem from './staticItem.vue'
    import DocumentationIcon from './icons/IconDocumentation.vue'
    
    </script>
    
    <template>
    <p></p><p></p>
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>projet</template>
    
       
      </WelcomeItem>,<p></p><p></p>
      <WelcomeItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>situation</template>
    
       
      </WelcomeItem>
      
      
    </template>
    