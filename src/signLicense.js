const crypto = require("crypto");

/**
 * Signs a license key using RSA private key
 * @param {string} licenseKey - The license key string
 * @param {string} privateKey - The private key in PEM format
 * @returns {string} - Base64 encoded signature
 */
function signLicense(licenseKey, privateKey) {
  const sign = crypto.createSign("SHA256");
  sign.update(licenseKey);
  sign.end();
  return sign.sign(privateKey, "base64");
}

module.exports = { signLicense };