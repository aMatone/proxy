const slowdown = (req, res, next) => {
    setTimeout(next, 1000); // Atraso de 1 segundo em cada requisição
  };

module.exports = {slowdown};