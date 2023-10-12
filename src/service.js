import mysql from "mysql2/promise"
import cfg from "./config/config.js"

const pool = mysql.createPool(cfg.mysql)

const createPerson = (name, centro, email) => {
  const query = `
    INSERT INTO usuarios (nome, centro, email) VALUES ('${name}', '${centro}', '${email}')
  `
  return query
}

const deletePerson = (idPerson) => {
  const query = `
    DELETE FROM usuarios WHERE id = ${idPerson}
  `
  return query
}

const createTransactionRecord = (title, idPerson, typeTransaction, value, category) => {
  const query = `
  INSERT INTO entradas_saidas (titulo, id_responsavel, tipo, valor, categoria) 
  VALUES ('${title}', ${idPerson}, '${typeTransaction}', ${value}, '${category}')
`
  return query
}

const fetchData = async () => {
  const connection = await pool.getConnection()

  await connection.query('SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED')

  //await connection.query(createPerson('Muller', 'Caeq', 'leandromllr9@gmail.com'))

  //await connection.query(deletePerson(4))

  //await connection.query(createTransactionRecord('Agua', 6, 'saida',  200, 'Agua'))

  const result = await connection.query("SELECT * FROM usuarios")

  console.log(result[0])
 
  return result[0]
}

export default fetchData
