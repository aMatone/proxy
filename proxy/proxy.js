const express = require('express');
const { encaminharRequisicaoParaAPI } = require('../api/api');
const { encryptData, decryptData } = require('../modules/encryption');
const { limitadorDeTaxa } = require('../middlewares/ratelimit');
const { slowdown } = require('../middlewares/slowdown');

const app = express();
const porta = 3000;

app.use(express.json());
app.use(limitadorDeTaxa());
app.use(slowdown())

app.post('/api', (req, res) => {
  const dadosDaRequisicao = JSON.stringify(req.body);

  const dadosEncriptados = encryptData(dadosDaRequisicao);
  
  encaminharRequisicaoParaAPI(dadosEncriptados)
    .then(respostaDaAPI => {
      const respostaDescriptografada = decryptData(respostaDaAPI);
      res.send(respostaDescriptografada);
    })
    .catch(error => {
      res.status(500).send('Ocorreu um erro ao buscar dados na API');
    });
});

app.listen(porta, () => {
  console.log(`http://localhost:${porta}`);
});
