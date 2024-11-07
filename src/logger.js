import { createLogger, StringifyObjectsHook, LoggerHook, LogEvent } from 'vue-logger-plugin'
const ServerLogHook = {
    run(event) {
      axios.post('/log', { severity: event.level, data: event.argumentArray })
    }
    // example using async/await:
    // async run(event: LogEvent) {
    //   await axios.post('/log', { severity: event.level, data: event.argumentArray })
    // }
  }
// create logger with options
const logger = createLogger({
  enabled: true,
  consoleEnabled:false,
  level: 'debug',
  beforeHooks: [ StringifyObjectsHook ],
  afterHooks: [ ServerLogHook ]
})

export default logger