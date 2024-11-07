import { defineComponent } from 'vue'
import { useLogger } from 'vue-logger-plugin'
export default defineComponent({
  // example using composition api
  setup() {
    const log = useLogger()
    log.info('Setting up MyComponent...')
    return {}
  },
  // example using options api
  methods: {
    test() {
      const testObject = {
        name: 'test',
        value: 'this is a test object'
      }
      this.$log.debug('Test Message', testObject)
      this.$log.info('Test Message', testObject)
      this.$log.warn('Test Message', testObject)
      this.$log.error('Test Message', testObject)
      this.$log.log('Test Message', testObject)
      // change options
      this.$log.apply({ level: 'error' }) // applies new log level
      this.$log.warn('This is not logged now')
    }
  }
})