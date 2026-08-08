const crypto = require("crypto");

const generateGuestId = () => {
    return "GST-" + crypto.randomBytes(5).toString("hex").toUpperCase();
};

module.exports = generateGuestId;