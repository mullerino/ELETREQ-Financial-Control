import mysql from "mysql2/promise"
import cfg from "./config/config.js"

const pool = mysql.createPool(cfg.mysql)

const executeQuery = async (query) => {
  const connection = await pool.getConnection()

  try {
    await connection.query('SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED')
    const result = await connection.query(query)

    return result[0]
  }
  finally {
    connection.release()
  }
}

export const getUsers = async () => {
  const query = "SELECT * FROM usuarios"

  return executeQuery(query)
}

export const createPerson = async (name, centro, email) => {
  const query = `
    INSERT INTO usuarios (nome, centro, email) VALUES ('${name}', '${centro}', '${email}')
  `
  return executeQuery(query)
}

export const deletePerson = async (idPerson) => {
  const query = `
    DELETE FROM usuarios WHERE id = ${idPerson}
  `
  return executeQuery(query)
}

export const createTransactionRecord = async (title, idPerson, typeTransaction, value, category) => {
  const query = `
    INSERT INTO entradas_saidas (titulo, id_responsavel, tipo, valor, categoria) 
    VALUES ('${title}', ${idPerson}, '${typeTransaction}', ${value}, '${category}')
  `
  return executeQuery(query)
}

export const getTransactions = async () => {
  const query = "SELECT * FROM entradas_saidas"

  return executeQuery(query)
}

export const deleteTransaction = async (idTransaction) => {
  const query = `
    DELETE FROM entradas_saidas WHERE id = ${idTransaction}
  `

  return executeQuery(query)
}
