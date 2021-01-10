const express = require("express");
const mysql = require("mysql");

//Create Connection
const db = mysql.createConnection({
  host: "192.168.64.2",
  user: "username",
  password: "password",
  database: "nodemysql",
});

//connect
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("mysql connected ...");
});

const app = express();

//Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE customer";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send("database created");
    console.log(result);
  });
});

app.get("/createnewtable", (req, res) => {
  let sql =
    "CREATE TABLE users(id int AUTO_INCREMENT, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("Table created");
  });
});

app.get("/adduser", (req, res) => {
  let user = { firstname: "Saif", lastname: "Ullah", email: "saif@siful.dev" };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send("user added");
  });
});
app.get("/adduser2", (req, res) => {
  let user = { firstname: "Siful", lastname: "Islam", email: "saif@siful.dev" };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send("user added");
  });
});
app.get("/adduser3", (req, res) => {
  let user = { firstname: "John", lastname: "Doe", email: "saif@jhon.dev" };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send("user added .. ");
  });
});
app.get("/users", (req, res) => {
  let sql = "SELECT * FROM users";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("All users");
  });
});
app.get("/users/:id", (req, res) => {
  let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("one users");
  });
});

app.get("/updateusers/:id", (req, res) => {
  let newemail = "sifulsmm@gmail.com";
  let sql = `UPDATE users SET email = '${newemail}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("one users");
  });
});

app.get("/deleteuser/:id", (req, res) => {
  let newemail = "sifulsmm@gmail.com";
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("User Deleted");
  });
});

app.get("/", (req, res) => {
  res.send("<h2>I am here</h2>");
});

app.listen("3000", () => {
  console.log("Server is running in 3000");
});
