const { generateKeyPair } = require("../src/generateKeys");
const { signLicense } = require("../src/signLicense");
const { verifyLicense } = require("../src/verifyLicense");

describe("License Key Generator Tests", () => {
  
  let privateKey, publicKey;
  const licenseKey = "USER123-PRODUCT456-EXP20251231";
  let signature;

  // Generate key pair before running tests
  beforeAll(() => {
    const keys = generateKeyPair();
    privateKey = keys.privateKey;
    publicKey = keys.publicKey;
  });

  test("Generate RSA Key Pair", () => {
    expect(privateKey).toBeDefined();
    expect(publicKey).toBeDefined();
    expect(typeof privateKey).toBe("string");
    expect(typeof publicKey).toBe("string");
  });

  test("Sign License Key", () => {
    signature = signLicense(licenseKey, privateKey);
    expect(signature).toBeDefined();
    expect(typeof signature).toBe("string");
  });

  test("Verify Valid License Key", () => {
    const isValid = verifyLicense(licenseKey, signature, publicKey);
    expect(isValid).toBe(true);
  });

  test("Reject Invalid License Key", () => {
    const fakeLicenseKey = "FAKE-USER123-PRODUCT456";
    const isValid = verifyLicense(fakeLicenseKey, signature, publicKey);
    expect(isValid).toBe(false);
  });

  test("Reject Invalid Signature", () => {
    const fakeSignature = "INVALIDSIGNATURE";
    const isValid = verifyLicense(licenseKey, fakeSignature, publicKey);
    expect(isValid).toBe(false);
  });
});