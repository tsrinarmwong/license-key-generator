const crypto = require("crypto");

/**
 * Generates an RSA 2048-bit key pair
 * @returns {object} { publicKey, privateKey }
 */
function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  return { publicKey, privateKey };
}

module.exports = { generateKeyPair };