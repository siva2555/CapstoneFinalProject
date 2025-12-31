const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "maintenance_tracker",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: test connection once
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Pool Connection Failed:", err.message);
    return;
  }
  console.log("✅ MySQL Pool Connected");
  connection.release();
});

module.exports = db;
