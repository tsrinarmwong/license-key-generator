# 🔏 LICENSE KEY GENERATOR (PKI-Based Signing)

A lightweight **open-source** JavaScript library for **signing and verifying software license keys** using **RSA 2048-bit encryption**.
<img width="720" alt="Screenshot 2025-03-09 at 4 31 33 PM" src="https://github.com/user-attachments/assets/1ec53512-b053-4acf-a0ef-8469e44097d5" />


## 🚀 Features
- 🔑 **Generate RSA Key Pairs**
- 🔏 **Sign License Keys**
- ✅ **Verify Signed Licenses**
- 🔒 **Uses SHA256 + RSA for Security**
- 🛠 **Minimal & Easy to Integrate**
- 🌍 **Open-source with API support (Swagger UI)**

---

## 📦 Installation
To install this package, run:

```sh
npm install
```

### **Requirements**
- Node.js 16+  
- Express.js (for API)  
- Crypto module (built into Node.js)  

---

## ⚡ Usage

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

## **💼 API Usage**
You can also run the **License Key API** using **Express + Swagger**.

### **Start API Server**
```sh
node api/app.js
```
The API will start at **http://localhost:5001**

---

### **🔹 API Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/generate-keys` | Generates a new RSA key pair |
| `POST` | `/sign-license` | Signs a license key with a private key |
| `POST` | `/verify-license` | Verifies a signed license key |

---

### **🔹 Testing the API with Swagger**
Swagger UI is available at:

📌 **http://localhost:5001/api-docs**

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

## **💜 License**
This project is licensed under the **MIT License**.  
Feel free to modify and use it in your own projects.

---

## **🤝 Contributions**
Pull requests are welcome! Please follow the contribution guidelines in `docs/CONTRIBUTING.md`.

---

## **📧 Contact**
- GitHub: [https://github.com/tsrinarmwong]
- Email: [tsrinarmwong.careers@hawk.iit.edu]

---

🔥 **Happy coding!** 🚀

