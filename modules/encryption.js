const crypto = require('crypto');

const algoritmoDeEncriptacao = 'aes-256-cbc';
const chaveDeEncriptacao = crypto.randomBytes(32);

function encryptData(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algoritmoDeEncriptacao, Buffer.from(chaveDeEncriptacao), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decryptData(data) {
  const [ivHex, encryptedDataHex] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedData = Buffer.from(encryptedDataHex, 'hex');
  const decipher = crypto.createDecipheriv(algoritmoDeEncriptacao, Buffer.from(chaveDeEncriptacao), iv);
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  encryptData,
  decryptData
};
