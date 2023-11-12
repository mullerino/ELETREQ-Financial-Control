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

export const createPerson = async (name, centro, email) => {
  const query = `
    INSERT INTO usuarios (nome, centro, email) VALUES ('${name}', '${centro}', '${email}')
  `
  return executeQuery(query)
}

export const getUsers = async () => {
  const query = "SELECT nome, email, centro, id FROM usuarios"

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

export const getSummaryTransaction = async (idUser = '%') => {
  const query = `
  WITH Somas AS (
    SELECT
      SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END) AS total_entradas,
      SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END) AS total_saidas,
      COUNT(titulo) AS total_transacoes
    FROM entradas_saidas
    WHERE id_responsavel LIKE '${idUser}'
  )
  SELECT
      total_entradas AS entrada,
      total_saidas AS saida,
      total_entradas - total_saidas AS saldo,
      total_transacoes AS qtd_transacoes
  FROM Somas;
  `
  return executeQuery(query)
}
