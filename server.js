const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// Logger middleware: runs on every request, then passes control on
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

const uri = process.env.MONGO_URI; // keep your Atlas string out of the code
const client = new MongoClient(uri);
let db;

app.get("/lessons", async (req, res) => {
  const lessons = await db.collection("lesson").find({}).toArray();
  res.json(lessons);
});

app.post("/orders", async (req, res) => {
  const result = await db.collection("order").insertOne(req.body);
  res.json(result);
});

async function start() {
  await client.connect();
  db = client.db("afterschool"); // use your own database name
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}
start();