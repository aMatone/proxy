const { encryptData, decryptData } = require('../modules/encryption');

function encaminharRequisicaoParaAPI(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(encryptData("Dados da resposta da API"));
    }, 1000);
  });
}

module.exports = {
  encaminharRequisicaoParaAPI
};
