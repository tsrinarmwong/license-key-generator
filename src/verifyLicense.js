const crypto = require("crypto");
const fs = require("fs");

// Load the public key
const publicKey = fs.readFileSync("public.pem", "utf8");

// Function to verify a signed license
function verifyLicense(licenseData, signature) {
  const verify = crypto.createVerify("SHA256"); // Use SHA-256
  verify.update(licenseData);
  verify.end();

  // Verify the signature using the public key
  return verify.verify(publicKey, signature, "base64");
}

// Example: Verify the signed license
const licenseKey = "USER123-PRODUCT456-EXP20251231";
const signedLicense = fs.readFileSync("signed_license.txt", "utf8").split("\n")[1]; // Read signature

const isValid = verifyLicense(licenseKey, signedLicense);

console.log(isValid ? "✅ License is valid!" : "❌ License is invalid!");