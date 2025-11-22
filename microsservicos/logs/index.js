const axios = require('axios')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())

const logs = []

app.post('/eventos', (req, res) => {
    const evento = req.body
    const log = { id: uuidv4(), horario: new Date(), type: evento.type, payload: evento.payload }
    logs.push(log)
    res.status(201).json(log)
})

app.get('/logs', (req, res) => {
  res.json(logs)
})

const port = 8000
app.listen(port, () => {
  console.log(`Logs. Porta ${port}.`)
})