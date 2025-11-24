const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

const estatistica = {
  totalLembretes: 0,
  totalLembretesImportantes: 0,
  totalLembretesComuns: 0,
  totalObservacoes: 0,
  somaCaracteresObservacao: 0,
  mediaCaracteresObservacao: 0
}

const lembretes = {}

const funcoes = {
  LembreteCriado: (lembrete) => {

    lembretes[lembrete.id] = lembrete
    estatistica.totalLembretes++
  },
  LembreteAtualizado: (lembrete) => {
    if (lembrete.status === 'importante') {
      estatistica.totalLembretesImportantes++
    } else {
      estatistica.totalLembretesComuns++
    }
  },

  ObservacaoCriada: (obs) => {
    estatistica.totalObservacoes++
    estatistica.somaCaracteresObservacao += obs.texto.length
    estatistica.mediaCaracteresObservacao =
      estatistica.somaCaracteresObservacao / estatistica.totalObservacoes
  }
}

app.post('/eventos', (req, res) => {
  const { type, payload } = req.body
  try {
    funcoes[type](payload)
  } catch {}
  res.status(200).end()
})

app.get('/estatistica', (req, res) => {
  res.json(estatistica)
})

const port = 9000
app.listen(port, () => {
  console.log(`Estatística. Porta ${port}.`)
})