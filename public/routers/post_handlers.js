//  IMPORTATION OF MODULE
const crypto = require("crypto");
const bcyrpt = require("bcrypt");
const { encrypt_data } = require("../controller/encryption");
const { single_insert_data } = require("../controller/db_queries");
const { fs_renameFile } = require("../utils/file_system");

const baseURL = "./public/storage/users";

const register = async (req, res, next) => {
    try {
        let proceed = "";
        console.log("...GETTING DATA FROM REGISTER API ...", req.body, req.file);
        const data = req.body;
        const file = req.file;
        // Encrypt password with double encryption preceedure  
            const hased_password = await encrypt_data(data.password);
            console.log("...ENCRYPTED DATA RESPONDS ...", hased_password);
        // ..
        // insert into db
            const ext = file.originalname.split(".")[1];
            await fs_renameFile(`${baseURL}/${file.originalname}`, `${baseURL}/${data.staff_id.trim()}.${ext}`);
            const payload = {
                first_name: data.first_name.trim(),
                surname: data.surname.trim(),
                middle_name: data.middle_name.trim(),
                tel: data.tel.trim(),
                staff_id: data.staff_id.trim(),
                date_of_birth: data.date_of_birth.trim(),
                department: data.department.trim(),
                email: data.email.trim(),
                password: hased_password.trim(),
                photo: `${data.staff_id.trim()}.${ext}`         
            }
            //console.log("..payload ...", payload);

            const db_resp = await single_insert_data(payload);
            console.log("...inserting data responds ...", db_resp);
            // Handling errors
                if (db_resp.includes("err")) {
                    req.flash("register", "** User Validation Failed **"); 
                    proceed = false;

                }else if (db_resp.includes("duplicate")) {
                    req.flash("login", "** User Already Exist. Please Login **"); 
                    proceed = true;

                }
                else {
                    req.flash("login", `** User ${payload.email} Registered Sucess **`); 
                    proceed = true;
                }
            // ...
        // ...  
        if (proceed) {
            res.redirect(303, "/api/get/login");
        }else {
            res.redirect(303, "/api/get/register");
        }
    } catch (error) {
        console.log("...ERROR IN REGISTER ROUTER ...::", error);
    }
}
const login = (req, res, next) => {
    try {
        console.log("...GETTING DATA FROM LOGIN API ...", req.body);


    } catch (error) {
        console.log("...ERROR IN LOGIN ROUTER ...::", error);
    }
}
const logout = (req, res, next) => {
    try {
        console.log("...GETTING DATA FROM LOGOUT API ...", req.body);


    } catch (error) {
        console.log("...ERROR IN LOGOUT ROUTER ...::", error);
    }
}

module.exports = { 
    register, login, logout
}