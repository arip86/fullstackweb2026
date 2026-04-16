const mysql = require("mysql2");
const db = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "dbstudent_fullstack",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
//test koneksi
db.connect((err) =>{
    if(err){
        console.log("Koneksi Gagal", err);
    } else {
        console.log("Koneksi Database Berhasil");
    }
});

module.exports = db;