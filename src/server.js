import express from "express"
import cfg from "./config/config.js"
import routes from "./routes.js"

const server = express()

const main = () => {
  server.use(express.json())
  server.use(routes)

  server.listen(cfg.port, () => {
    console.log(`Server on na porta ${cfg.port}`)
  })
}

main()
