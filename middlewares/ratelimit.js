const rateLimit = require("express-rate-limit");

const limitadorDeTaxa = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 100 // limite de 100 requisições por IP a cada 1 minuto
  });

  module.exports = {limitadorDeTaxa};