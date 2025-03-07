# 🔑 License Key Generator API

An open-source PKI-based license signing & verification system.

## ✨ Features
- ✅ **Secure License Signing** - Uses RSA PKI to prevent forgery
- ✅ **Tamper-Proof Verification** - Ensures license authenticity
- ✅ **REST API Ready** - Works with any frontend
- ✅ **Swagger UI Included** - Test API calls in your browser

## 📦 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/license-key-generator.git
   cd license-key-generator
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```
3. **Generate RSA key pair**  
   ```bash
   node generateKeys.js
   ```
4. **Run the API**  
   ```bash
   node app.js
   ```
5. **Test in Swagger UI**  
   Open: [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

## 🚀 API Endpoints

### **🔹 Sign a License**
```
POST /sign-license
{
  "licenseKey": "USER123-PRODUCT456-EXP20251231"
}
```

### **🔹 Verify a License**
```
POST /verify-license
{
  "licenseKey": "USER123-PRODUCT456-EXP20251231",
  "signature": "signed_data_here"
}
```

## 🛠️ Contributing
- Fork the repo  
- Open an issue or PR with improvements  

## 📢 Where to Share?
Want to help this project gain visibility? Share on:
- 🔹 **GitHub Discussions** → [github.com/discussions](https://github.com/discussions)
- 🔹 **Hacker News** → [news.ycombinator.com](https://news.ycombinator.com)
- 🔹 **r/webdev, r/programming** → [reddit.com](https://www.reddit.com/)
- 🔹 **Dev.to, Hashnode, Medium** → Post a blog
- 🔹 **LinkedIn, Twitter** → Share with your network

