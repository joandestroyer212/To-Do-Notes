import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost", // process.env.DB_HOST,
    port: 3306, // Number(process.env.DB_PORT),
    user: "root", // process.env.DB_USER,
    password: "", // process.env.DB_PASSWORD,
    database: "to-do_db", // process.env.DB_DATABASE,
});

export default pool;