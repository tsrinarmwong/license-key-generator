const core = require("@actions/core");
const { signLicense } = require("../../../src/signLicense");

try {
    const licenseKey = core.getInput("license_key");
    const privateKey = core.getInput("private_key");
    const signature = signLicense(licenseKey, privateKey);

    core.setOutput("signature", signature);
} catch (error) {
    core.setFailed(error.message);
}