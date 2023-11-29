// IMPORTATION
require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

// ...
// EXPRESS ROUTERS
const connect_mongodb = require("./public/controller/db_connection");
const get_urls = require("./public/routers/get_urls");
const post_urls = require("./public/routers/post_urls");

//const pool = require("./public/router/pg-cred");
//const  pool = require("./router/pg-cred");
//const { passport_strategy } = require("./public/controller/passport");

// ...
// INITIALIZATION
const app = express(); // all app depends on 
const PORT = process.env.PORT || 3000;
// ...

// MIDDLEWARE
app.set("views", path.join(__dirname, "/public/views/pages")); // setting new view path 
app.set("view engine", "ejs");
//app.use(morgan("dev")); // to detect server request
app.use(bodyParser.json({limit: "3mb"}));  // data will be use  in JSON Format
app.use(bodyParser.urlencoded({extended: true, limit: "3mb"})) // to post request and able to get data from it url
app.use(express.static(path.join(__dirname, "/public")))

/*
const columnNames = {
    session_id: `${process.env.PG_SESSION_ID}`,
    session_data: `${process.env.PG_SESSION_DATA}`,
    expire: `${process.env.PG_SESSION_EXPIRE}`
};
const session_pg_store = new pgSession({
    pool: pool,
    schemaName: `${process.env.PG_SCHEMA}`,
    tableName: `${process.env.PG_SESSION_TABLE_NAME}`,
    columns: columnNames
});
*/
app.use(session({
    secret: `${process.env.SESSION_SECRETE}`,
    resave: true,
    saveUninitialized: true,
   // store: session_pg_store,
    cookie: {
        secure: (process.env.NODE_ENV == "production")? true : false, // enable only in production mode;
        maxAge: 1000 * 60 * 60 * 24 * 7 // to 7 days
    }
}));
app.use(flash());

//initiate router 
connect_mongodb()
app.use("/api/get", get_urls);
app.use("/api/post", post_urls);
// ...
// passort middleware 
//passport.use(passport_strategy);

//app.use(passport.initialize());
//app.use(passport.session());
// ...


app.listen(PORT, () => { console.log(`.....Server is listern on PORT  ${PORT}`) })