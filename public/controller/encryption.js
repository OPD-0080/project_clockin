const crypto = require("crypto");
const bcrypt = require("bcrypt");

const KEY_1 = process.env.SECRETE_KEY_1;
const KEY_2 = process.env.SECRETE_KEY_2;

const encrypt_data = async (data) => {
    try {
        console.log("... INITIATING ENCRYTING OF DATA ...", data);
        
        const Hmac = crypto.createHmac("sha256", KEY_1);
        Hmac.update(data);
        const hased_data = Hmac.digest("hex");

        const encrypted_data = await bcrypt.hash(hased_data, KEY_2);
        return encrypted_data
    } catch (error) {
        console.log("...ERROR IN ENCRYTPING DATA ...", error);
    }
}

module.exports = { encrypt_data }