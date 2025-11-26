const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())

const palavraChave = 'importante'
const funcoes = {
  ObservacaoCriada: (observacao) => {
    if(observacao.texto.includes(palavraChave))
      observacao.status = 'importante'
    else
      observacao.status = 'comum'
      axios.post('http://localhost:10000/eventos', {
      type: 'ObservacaoClassificada',
      payload: observacao
    })
  },
  LembreteCriado: (lembrete) => {
    if(lembrete.texto.length >= 50)
      lembrete.status = 'importante'
    else
      lembrete.status = 'comum'
      axios.post('http://localhost:10000/eventos', {
      type: 'LembreteClassificado',
      payload: lembrete
    })
  }
}


app.post('/eventos', (req, res) => {
  try{
    const evento = req.body
    console.log(evento)
    funcoes[evento.type](evento.payload)
  }
  catch(e){}
  res.end()
})

const port = 7000
app.listen(port, async () => {
  console.log(`Classificação. Porta ${port}.`)

  try {
    await axios.post('http://localhost:10000/registrar', {
      nome: 'classificacao',
      tipos: ['ObservacaoCriada', 'LembreteCriado']
    })
  }catch (e){}

  try {
    const resp = await axios.get('http://localhost:10000/eventos')
    const tipoEvento = resp.data
    for(let tipo in tipoEvento) {
      const listaEventos = tipoEvento[tipo]
      for(let evento of listaEventos){
        try{
          const { tipo: type, dados: payload } = evento
          if(funcoes[type]){
            console.log(type, payload)
              funcoes[type](payload)
          }
        }
        catch(e){}
      }
    }
  }
  catch(e){}
})