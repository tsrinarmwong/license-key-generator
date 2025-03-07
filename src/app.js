const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());
app.use(cors());

// Load public & private keys
const privateKey = fs.readFileSync("private.pem", "utf8");
const publicKey = fs.readFileSync("public.pem", "utf8");

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "License Key Generator API",
      version: "1.0.0",
      description: "API for signing and verifying software license keys using PKI.",
    },
  },
  apis: ["./app.js"], // This tells Swagger where to find the API definitions
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /sign-license:
 *   post:
 *     summary: Signs a license key
 *     description: Takes a license key and signs it with the private key.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licenseKey:
 *                 type: string
 *                 example: "USER123-PRODUCT456-EXP20251231"
 *     responses:
 *       200:
 *         description: Signed license key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 licenseKey:
 *                   type: string
 *                 signature:
 *                   type: string
 */
app.post("/sign-license", (req, res) => {
  const { licenseKey } = req.body;
  if (!licenseKey) return res.status(400).json({ error: "License key is required" });

  const sign = crypto.createSign("SHA256");
  sign.update(licenseKey);
  sign.end();

  const signature = sign.sign(privateKey, "base64");

  res.json({ licenseKey, signature });
});

/**
 * @swagger
 * /verify-license:
 *   post:
 *     summary: Verifies a license key
 *     description: Verifies if a given license key and signature are valid.
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
  const { licenseKey, signature } = req.body;
  if (!licenseKey || !signature) return res.status(400).json({ error: "License key and signature are required" });

  const verify = crypto.createVerify("SHA256");
  verify.update(licenseKey);
  verify.end();

  const isValid = verify.verify(publicKey, signature, "base64");

  res.json({ valid: isValid });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));