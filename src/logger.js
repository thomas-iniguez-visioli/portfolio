import { createLogger, StringifyObjectsHook, LoggerHook, LogEvent } from 'vue-logger-plugin'
const ServerLogHook = {
    run(event) {
        console.log(event.argumentArray[0])
      console.log(event.level+"     "+  event.data )
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
  prefixFormat: ({ level, caller }) => (
    caller
      ? `[${level.toUpperCase()}] [${caller?.fileName}:${caller?.functionName}:${caller?.lineNumber}]`
      : `[${level.toUpperCase()}]`
  ),
  beforeHooks: [ StringifyObjectsHook ],
  afterHooks: [ ServerLogHook ]
})

export default logger