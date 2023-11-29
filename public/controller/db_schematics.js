require("dotenv").config();
const mongoose = require("mongoose");
const connect_mongodb = require("./db_connection");


// FOR DB
const tb_users = `${process.env.TABLE_USERS}`;

// ...
// DEFINING SCHEMAS
const RegisterSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    first_name: { type: String, required: true },
    surname: { type: String, required: true },
    middle_name: { type: String, required: false },
    date_of_birth: { type: String, required: true },
    staff_id:  { type: Number, required: true },
    department: { type: String, required: true },
    tel: { type: Number, required: true },
    photo: { type: String, required: true }, 
    password: { type: String, required: true },
});


// DEFINING MODELS OR COLLECTIONS 
const RegisterModel = mongoose.model(tb_users, RegisterSchema);


// ...
// TO CLOSE DB AFTER MAKING QUERIES
const disconnect_db = async () => {
    return mongoose.connection.close();
}
// ..


module.exports = { disconnect_db, RegisterModel }
// ...


