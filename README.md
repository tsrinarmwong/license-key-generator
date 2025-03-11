# 🔏 LICENSE KEY GENERATOR (PKI-Based Signing)

A lightweight **open-source** JavaScript library for signing and verifying software license key using **RSA 2048-bit encryption**.         
        
⚛️ **I'm actively pushing this to be Post-Quantum Computing (PQC) compatible** to future-proof security.    
        
## ✨ Features
- 🔑 **Generate RSA Key Pairs**
- 🔏 **Sign License Keys**
- ✅ **Verify Signed Licenses**
- 🔒 **Uses SHA256 + RSA for Security**
- 🛠 **Minimal & Easy to Integrate**
- 🌍 **Live API Hosted on Render**

<p align="center">
  <img src="https://github.com/user-attachments/assets/1ec53512-b053-4acf-a0ef-8469e44097d5" width="600">
</p>

## 📑 Table of Contents

- [🔏 LICENSE KEY GENERATOR (PKI-Based Signing)](#-license-key-generator-pki-based-signing)
- [🚀 How It Works](#-how-it-works)
- [🌍 Live API (No Setup Required!)](#-live-api-no-setup-required)
    - [`GET /generate-keys`](#get-generate-keys)
    - [`POST /sign-license`](#post-sign-license)
    - [`POST /verify-license`](#post-verify-license)
  - [🔹 Try it in Swagger UI](#-try-it-in-swagger-ui)
- [⚡ Usage (Local Development)](#-usage-local-development)
- [🧪 Running Tests](#-running-tests)
- [📜 License](#-license)
- [🤝 Contributions](#-contributions)
- [📧 Contact](#-contact)

## 🚀 How It Works
This API allows you to generate RSA key pairs, sign software license keys, and verify them using cryptographic signing.  
   
1️⃣ **Generate an RSA Key Pair** – Get a public and private key. The private key is **yours to keep**.     
2️⃣ **Sign a License Key** – Use your private key to sign a license.     
3️⃣ **Verify a License** – Use the public key to validate the signature.    
        
⚠️ **Warning:** The API **DOES NOT** store any keys for you. If you do not save your private key when generated, it will be lost forever! Users manage their own key storage.

### 🔑 Where Do the Keys Live?
- **Generated Keys:** When you generate a key pair, the **public and private keys exist only in memory** until you save them.
- **Private Key:** This key is meant to be **kept secret**. If you lose it, you cannot re-create or retrieve it.
- **Public Key:** You can store and distribute this safely. It is used to verify signed licenses.

🔹 **Note:** This API **DOES NOT** store your keys or license data.      
👀 If you need a **hosted key storage & validation service**, stay tuned for our upcoming **managed API service**!

---

## **🌍 Live API (No Setup Required!)**
The API is deployed on **Render** and can be accessed directly!

| Feature | Details |
|---------|---------|
| **Base URL** | `https://license-signing-api.onrender.com` |
| **Swagger API Docs** | [`https://license-signing-api.onrender.com/api-docs/`](https://license-signing-api.onrender.com/api-docs/) |

### **API Endpoints**

#### `GET /generate-keys`
- **Returns:** `{ publicKey: string, privateKey: string }`
- **Description:** Generates a new RSA 2048-bit key pair.
- **Example Response:**
  ```json
  {
    "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhki...\n-----END PUBLIC KEY-----",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----"
  }
  ```

#### `POST /sign-license`
- **Request Body:**
  ```json
  {
    "licenseKey": "USER123-PRODUCT456-EXP20251231",
    "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----"
  }
  ```
- **Returns:** `{ signature: string }`
- **Description:** Signs a license key using the provided private key.
- **Example Response:**
  ```json
  {
    "signature": "k7d9f8a8g9s7d9f8a7g9s7d..."
  }
  ```

#### `POST /verify-license`
- **Request Body:**
  ```json
  {
    "licenseKey": "USER123-PRODUCT456-EXP20251231",
    "signature": "k7d9f8a8g9s7d9f8a7g9s7d...",
    "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhki...\n-----END PUBLIC KEY-----"
  }
  ```
- **Returns:** `{ valid: boolean }`
- **Description:** Verifies if the given license key and signature match the public key.
- **Example Response:**
  ```json
  {
    "valid": true
  }
  ```

### **🔹 Try it in Swagger UI**
📌 **Swagger API Docs:** [`https://license-signing-api.onrender.com/api-docs/`](https://license-signing-api.onrender.com/api-docs/)

---

## ⚡ Usage (Local Development)

### **📦 Installation**
To install this package locally, run:

```sh
npm install
```

#### **Requirements**
- Node.js 16+  
- Express.js (for API)  
- Crypto module (built into Node.js)  

### **1️⃣ Generate a Key Pair**
To create an RSA **public-private key pair**, use:

```javascript
const { generateKeyPair } = require("./src/generateKeys");

const { privateKey, publicKey } = generateKeyPair();
console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);
```

---

### **2️⃣ Sign a License Key**
To **sign a license key** with your **private key**, use:

```javascript
const { signLicense } = require("./src/signLicense");

const licenseKey = "USER123-PRODUCT456-EXP20251231";
const signature = signLicense(licenseKey, privateKey);
console.log("🔏 Signature:", signature);
```

---

### **3️⃣ Verify a License Key**
To **verify a license key**, use:

```javascript
const { verifyLicense } = require("./src/verifyLicense");

const isValid = verifyLicense(licenseKey, signature, publicKey);
console.log("✅ Valid License:", isValid);
```

---

## **🧪 Running Tests**
To run the unit tests:

```sh
npm test
```
or  
```sh
jest
```

---

## **📜 License**
This project is licensed under the **MIT License**.  
Feel free to modify and use it in your own projects.

---

## **🤝 Contributions**
Pull requests are welcome! Please follow the contribution guidelines in `docs/CONTRIBUTING.md`.

I'm pushing this tool to **GitHub Marketplace** to make it easier for developers and teams to integrate secure license key management into their workflow.  

💡 **Want to support development?**  
This project is **open for sponsorship!** Your contributions help me bring **Post-Quantum Security** to **software licensing**.  

👉 [Sponsor me on GitHub](https://github.com/sponsors/tsrinarmwong) 🚀 

---

## **📧 Contact**
- GitHub: [https://github.com/tsrinarmwong](https://github.com/tsrinarmwong)
- Email: [tsrinarmwong.careers@hawk.iit.edu](mailto:tsrinarmwong.careers@hawk.iit.edu)

---

🔥 **Happy coding!** 🚀
