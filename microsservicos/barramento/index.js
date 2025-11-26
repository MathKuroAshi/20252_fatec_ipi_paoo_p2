const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const eventos = {}

const interesses = {}

function registraTipoEvento (evento){
  const { type, payload } = evento
  if(!eventos[type]){
    eventos[type] = []
  }
  eventos[type].push({
    tipo: type,
    dados: payload
  })
}

function interessa (microsservico, tipoEvento) {
  const listaEventos = interesses[microsservico] || [] 
  if (listaEventos.includes('*')) return true 
  return listaEventos.includes(tipoEvento)
}

app.post('/registrar', (req, res) => {
  const { nome, tipos } = req.body
  interesses[nome] = tipos || []
  res.status(201).end()
})

app.post('/eventos', async (req, res) => {
  const evento = req.body
  registraTipoEvento(evento)
    console.log(evento)


  if(interessa('lembretes', evento.type)){
    try{
      await axios.post('http://localhost:4000/eventos', evento)
    }
    catch(e){}
  }

  if(interessa('observacoes', evento.type)){
    try{
      await axios.post('http://localhost:5000/eventos', evento)
    }
    catch(e){}
  }

  if(interessa('consulta', evento.type)){
    try{
      await axios.post('http://localhost:6000/eventos', evento)
    }
    catch(e){}
  }

  if(interessa('classificacao', evento.type)){
    try{
      await axios.post('http://localhost:7000/eventos', evento)
    }
    catch(e){}
  }

  if(interessa('logs', evento.type)){
    try{
      await axios.post('http://localhost:8000/eventos', evento)
    }
    catch(e){}
  }

  if(interessa('estatistica', evento.type)){
    try{
      await axios.post('http://localhost:9000/eventos', evento)
    }
    catch(e){}
  }
  
  res.end()
})

app.get('/eventos', (req, res) => {
  res.json(eventos)
})


const port = 10000
app.listen(port, () => {
  console.log(`Barramento. Porta ${port}.`)
})