const crypto = require("crypto");
const fs = require("fs");

// Load the private key
const privateKey = fs.readFileSync("private.pem", "utf8");

// Function to sign a license key
function signLicense(licenseData) {
  const sign = crypto.createSign("SHA256"); // Use SHA-256 for hashing
  sign.update(licenseData); // Hash the license data
  sign.end();

  // Create a digital signature using the private key
  const signature = sign.sign(privateKey, "base64");
  return signature;
}

// Example: Generate a signed license
const licenseKey = "USER123-PRODUCT456-EXP20251231";
const signature = signLicense(licenseKey);

console.log("🔑 License Key:", licenseKey);
console.log("🔏 Signed License:", signature);

// Save to file (optional)
fs.writeFileSync("signed_license.txt", `${licenseKey}\n${signature}`);