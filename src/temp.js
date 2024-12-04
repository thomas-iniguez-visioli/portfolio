import { defineComponent } from 'vue'
import { useLogger } from 'vue-logger-plugin'
export default defineComponent({
  // example using composition api
  setup() {
    const log = useLogger()
    console.log(log)
    log.info('Setting up MyComponent...')
    return log
  }
  // example using options api
})
