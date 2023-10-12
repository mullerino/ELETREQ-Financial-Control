import { Router } from "express"
import { createPerson, createTransactionRecord, getTransactions, getUsers } from "./service.js"

const routes = Router()

routes.post("/user", async (req, res) => {
  const { name, centro, email } = req.body

  const user = await createPerson(name, centro, email)

  try {
    return res.send(user)
  }
  catch (e) {
    console.log(e)
  }
})

routes.get("/users", async (req, res) => {
  const users = await getUsers()

  try {
    return res.send(users)
  }
  catch (e) {
    console.log(e)
  }
})

routes.post("/transaction", async (req, res) => {
  const { title, idPerson, typeTransaction, value, category } = req.body

  const newTransaction = await createTransactionRecord(title, idPerson, typeTransaction, value, category)

  try {
    return res.send(newTransaction)
  }
  catch (e) {
    console.log(e)
  }
})

routes.get("/transactions", async (req, res) => {
  const transactions = await getTransactions()

  try {
    return res.send(transactions)
  }
  catch (e) {
    console.log(e)
  }
})

export default routes
