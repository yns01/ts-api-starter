import './config/'
import http from 'http'
import stoppable, { StoppableServer } from 'stoppable'
import { app } from './app'
import { createOpsApp } from './app.ops'
import { promisify } from 'util'

const defaultTerminationGracePeriods = 30

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000'
app.set('port', port)

/**
 * Create HTTP server.
 */

const appServer = stoppable(http.createServer(app), defaultTerminationGracePeriods)

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (serverName: string) => (error: any) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${serverName}: ${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${serverName}:${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = (serverName: string, server: StoppableServer) => () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr ? addr.port : 'null'}`
  console.info(`${serverName} Listening on ${bind}`)
}

appServer.listen(port)
appServer.on('error', onError('appServer'))
appServer.on('listening', onListening('appServer', appServer))

const opsServer = stoppable(
  http.createServer(createOpsApp(appServer)),
  defaultTerminationGracePeriods
)
opsServer.listen(process.env.OPS_PORT || '8081')
opsServer.on('error', onError('opsServer'))
opsServer.on('listening', onListening('opsServer', opsServer))

/**
 *
 * graceful shutdown
 *
 */
const handleError = (err: Error) => {
  console.warn('Error happened during graceful shutdown', err)
  process.exit(1)
}

const handleSignal = (signal: string) => () => {
  console.warn(`Got ${signal}. Graceful shutdown start`, new Date().toISOString())

  try {
    const stopOpsServer = promisify(opsServer.stop)
    const stopAppServer = promisify(appServer.stop)

    Promise.all([stopOpsServer(), stopAppServer()])
      .then(() => {
        console.warn('Successful graceful shutdown', new Date().toISOString())
        process.exit(0)
      })
      .catch(handleError)
  } catch (err) {
    handleError(err)
  }
}

process.on('SIGTERM', handleSignal('SIGTERM'))
process.on('SIGINT', handleSignal('SIGINT'))
