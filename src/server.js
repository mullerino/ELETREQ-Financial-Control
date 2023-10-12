import express from "express"
import cfg from "./config/config.js"
import fetchData from "./service.js"

const server = express()

const main = () => {
   fetchData()

  server.listen(cfg.port, () => {
    console.log(`Server on na porta ${cfg.port}`)
  })
}

main()
