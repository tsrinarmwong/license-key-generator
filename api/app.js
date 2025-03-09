const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { signLicense } = require("../src/signLicense");
const { verifyLicense } = require("../src/verifyLicense");
const { generateKeyPair } = require("../src/generateKeys");

const app = express();
app.use(express.json());
app.use(cors());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "License Signing API",
      version: "1.0.0",
      description: "API for signing and verifying software license keys using PKI.",
    },
  },
  apis: ["./api/app.js"], // API documentation location
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /generate-keys:
 *   get:
 *     summary: Generates a unique RSA key pair
 *     description: Returns a newly generated RSA 2048-bit key pair.
 *     responses:
 *       200:
 *         description: RSA key pair
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 publicKey:
 *                   type: string
 *                 privateKey:
 *                   type: string
 */
app.get("/generate-keys", (req, res) => {
  const { publicKey, privateKey } = generateKeyPair();
  res.json({ publicKey, privateKey });
});

/**
 * @swagger
 * /sign-license:
 *   post:
 *     summary: Signs a license key
 *     description: Takes a license key and signs it with the provided private key.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licenseKey:
 *                 type: string
 *               privateKey:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signed license key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signature:
 *                   type: string
 */
app.post("/sign-license", (req, res) => {
  const { licenseKey, privateKey } = req.body;
  if (!licenseKey || !privateKey) return res.status(400).json({ error: "License key and private key are required" });

  const signature = signLicense(licenseKey, privateKey);
  res.json({ signature });
});

/**
 * @swagger
 * /verify-license:
 *   post:
 *     summary: Verifies a signed license key
 *     description: Validates if a given license key and signature match a public key.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licenseKey:
 *                 type: string
 *               signature:
 *                 type: string
 *               publicKey:
 *                 type: string
 *     responses:
 *       200:
 *         description: License verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 */
app.post("/verify-license", (req, res) => {
  const { licenseKey, signature, publicKey } = req.body;
  if (!licenseKey || !signature || !publicKey) return res.status(400).json({ error: "Missing fields" });

  const isValid = verifyLicense(licenseKey, signature, publicKey);
  res.json({ valid: isValid });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 API Server running on port ${PORT}`));