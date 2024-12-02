import mysql from "mysql2";
let con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "abc123",
  database: "my_web",
});

export function connectDatabase() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
}

export default con;
