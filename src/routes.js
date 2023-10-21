import { Router } from "express"
import { createPerson, createTransactionRecord, deletePerson, getSummaryTransaction, getTransactions, getUsers } from "./service.js"

const routes = Router()

routes.post("/user", async (req, res) => {
  const { name, centro, email } = req.body

  const user = await createPerson(name, centro, email)

  try {
    return res.send(user)
  }
  catch (e) {
    console.error(e)
  }
})

routes.get("/users", async (req, res) => {
  const users = await getUsers()

  try {
    return res.send(users)
  }
  catch (e) {
    console.error(e)
  }
})

routes.delete("/users", async (req, res) => {
  const user = await deletePerson()

  try {
    return res.send(user)
  }
  catch (e) {
    console.error(e)
  }
})

routes.post("/transaction", async (req, res) => {
  const { title, idPerson, typeTransaction, value, category } = req.body

  const newTransaction = await createTransactionRecord(title, idPerson, typeTransaction, value, category)

  try {
    return res.send(newTransaction)
  }
  catch (e) {
    console.error(e)
  }
})

routes.get("/transactions", async (req, res) => {
  const transactions = await getTransactions()

  try {
    return res.send(transactions)
  }
  catch (e) {
    console.error(e)
  }
})

routes.get("/summary", async (req, res) => {
  const summaryUser = await getSummaryTransaction()

  try {
    return res.send(summaryUser)
  }
  catch (e) {
    console.error(e)
  }
})

routes.get("/summary/:id", async (req, res) => {
  const { id } = req.params

  const summaryUser = await getSummaryTransaction(id)

  try {
    return res.send(summaryUser)
  }
  catch (e) {
    console.error(e)
  }
})

export default routes
