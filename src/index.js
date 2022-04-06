const { res } = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const customers = []

// Middleware
function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.params

  const customer = customers.find(customer => customer.cpf === cpf)

  if(!customer) {
    return res.status(400).json({ error: "Customer not found!"})
  }

  return next()
}

app.post('/account', (req, res) => {
  const { cpf, name } = req.body

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

  if (customerAlreadyExists) {
    return res.status(400).json({ error: "Customer already exists!"})
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })
  res.status(201).send()

  console.log(customers)
})

app.get('/statement/:cpf', (req, res) => {

  return res.json(customer.statement)
})
app.listen(3333)