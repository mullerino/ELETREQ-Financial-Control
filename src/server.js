import express from "express"
import cors from 'cors'
import cfg from "./config/config.js"
import routes from "./routes.js"

process.on('uncaughtException', (error) => {
  console.error(error)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, '\nReason:', reason)
})

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}

const main = () => {
  const server = express()

  server.use(cors(corsOptions))
  server.use(express.json())
  server.use('/api/v1/', routes)

  server.listen(cfg.port, () => {
    console.log(`Server on na porta ${cfg.port}`)
  })
}

main()
