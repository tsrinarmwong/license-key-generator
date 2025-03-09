const crypto = require("crypto");

/**
 * Verifies a signed license key using RSA public key
 * @param {string} licenseKey - The license key string
 * @param {string} signature - The base64 signature
 * @param {string} publicKey - The public key in PEM format
 * @returns {boolean} - True if valid, false otherwise
 */
function verifyLicense(licenseKey, signature, publicKey) {
  const verify = crypto.createVerify("SHA256");
  verify.update(licenseKey);
  verify.end();
  return verify.verify(publicKey, signature, "base64");
}

module.exports = { verifyLicense };