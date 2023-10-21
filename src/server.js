import express from "express"
import cfg from "./config/config.js"
import routes from "./routes.js"

process.on('uncaughtException', (error) => {
  console.error(error)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, '\nReason:', reason)
})

const main = () => {
  const server = express()

  server.use(express.json())
  server.use(routes)

  server.listen(cfg.port, () => {
    console.log(`Server on na porta ${cfg.port}`)
  })
}

main()
