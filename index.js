import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

dotenv.config();

const db = mysql
  .createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE,
    port:process.env.DBPORT
  })
  .promise();

db.connect(function (err){
  if(err){
    console.log("Error Connecting to DB",err.message)
  }else{
    console.log("Connected to db");
  }
})

app.get("/", (req, res) => {
  res.status(200).json({ Title: "Sample Task" });
});

app.get("/createtable", async (req, res) => {
  try {
    const [query] = await db.query(
      "CREATE TABLE IF NOT EXISTS USERS(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,First_Name TEXT,Last_Name TEXT,Password TEXT,email TEXT)"
    );
    res.status(200).json({ query });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/allusers", async (req, res) => {
  try {
    const [query] = await db.query(
      "SELECT id,First_Name,Last_Name,email FROM USERS"
    );
    res.status(200).json({ USERS: query });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/adduser", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const [query] = await db.query(
      "INSERT INTO USERS (First_Name,Last_Name,Password,email) VALUES(?,?,?,?)",
      [first_name, last_name, hashpassword, email]
    );
    res.setHeader("set-cookie",["setfromserver=2"]);
    res.status(200).json({ query, message: "User Added" });
  } catch (error) {
    res.status(400).json({ Error : error.message });
    console.log(error.message);
  }
});

app.delete("/deleteuser/:id",async(req,res)=>{
  try {
    const {id} = req.body;
    const [query] =  await db.query("DELETE FROM USERS WHERE id=?",[id]);
    res.status(200).json({ message : "User deleted Successfully",query })
  } catch (error) {
    console.log(error.message);
  }
})

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
