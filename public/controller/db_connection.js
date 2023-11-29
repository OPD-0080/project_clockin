require("dotenv").config();
const mongoose = require("mongoose");


const DATABASE =  process.env.DATABASE;
const connectionString = `mongodb://localhost:27017/${DATABASE}`;
const isProduction = process.env.NODE_ENV == "production"; 


const connect_mongodb = async () => {
    if (isProduction) {
        return process.env.NODE_ENV
    }else {
        const resp = await mongoose.connect(connectionString);
        console.log("...Database is connected ...");
        return resp
    }
}

module.exports = connect_mongodb;
