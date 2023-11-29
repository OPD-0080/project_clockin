const validator = require("validator");


const validate_register_field = (req, res, next) => {
    try {
        let proceed = false, status = "", msg  = "";
        const data = req.body;
        const file = req.file;
        
        if (!validator.isEmail(data.email)) {
            msg = "** Required. Provide Valiad Email **"
            proceed = true
        }
        if (data.first_name == "") {
            msg = "** Required. Provide First Name **"
            proceed = true
        }
        if (data.first_name.length < 3 ) {
            msg = "** Required. Provide 3 min characters for First Name field **";
            proceed = true
        }
        if (data.surname == "") {
            msg = "** Required. Provide Surname **"
            proceed = true
        }
        if (data.surname.length < 3 ) {
            msg = "** Required. Provide 3 min characters for Surname field **";
            proceed = true
        }
        if (data.middle_name.length < 3 ) {
            msg = "** Required. Provide 3 min characters for Middle Name field **";
            proceed = true
        }
        if (data.tel.length < 10 ) {
            msg = "** Required. Provide 10 digit numbers for Tel field **";
            proceed = true
        }
        if (!validator.isMobilePhone(data.tel)) {
            msg = "** Required. Provide Valid Phone Number **";
            proceed = true
        }
        if (isNaN(data.tel)) {
            msg = "** Required. Provide ONLY digits or numbers for Tel field **";
            proceed = true
        }
        if (data.department == "") {
            msg = "** Required. Provide your Department **"
            proceed = true
        }
        if (data.department == "") {
            msg = "** Required. Provide your Department **"
            proceed = true
        }
        if (data.daate_of_birth == "") {
            msg = "** Required. Provide your Date of Birth **"
            proceed = true
        }
        if (data.new_password !== data.password) {
            msg = "** Password does not match ! **"
            proceed = true
        }
        if (file == undefined) {
            msg = "** Required. Provide Photo **"
            proceed = true
        }

        if (proceed) {
            // send alert to user
            req.flash("register", msg);
            res.redirect(303, "/api/get/register")
        }
        else {
            next() // move to the next middleware
        }
        
    } catch (error) {
        console.log("...ERROR IN VALIDATING FIELD ...:", error);
    }
}
module.exports = { validate_register_field }