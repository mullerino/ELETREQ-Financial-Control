import { createPerson } from "../service.js"
import assert from 'assert';

const createUser = createPerson

describe('Função para criar novo usuário', () => {
  it('Deve criar um usuário no banco', async () => {
    const result = await createUser('João', 'Caee', 'joao@gmail.com')
    assert.ok(result)
  })
})
