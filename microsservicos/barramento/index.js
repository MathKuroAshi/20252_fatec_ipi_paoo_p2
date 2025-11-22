const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const eventos = []

app.post('/eventos', async (req, res) => {
  const evento = req.body
  eventos.push(evento)
  console.log(evento)
  try{
    await axios.post('http://localhost:4000/eventos', evento)
  }
  catch(e){}

  try{
    await axios.post('http://localhost:5000/eventos', evento)
  }
  catch(e){}

  try{
    await axios.post('http://localhost:6000/eventos', evento)
  }
  catch(e){}

  try{
    await axios.post('http://localhost:7000/eventos', evento)
  }
  catch(e){}
  
  try{
    await axios.post('http://localhost:8000/eventos', evento)
  }
  catch(e){}
  
  res.end()
})

app.get('/eventos', (req, res) => {
  res.json(eventos)
})


const port = 10000
app.listen(port, () => {
  console.log(`Barramento. Porta ${port}.`)
})