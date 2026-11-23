// Import the tools we need
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

const app = express();

// Allow the front-end (on a different address) to call this server
app.use(cors());
// Let the server read JSON sent in request bodies
app.use(express.json());

// Logger middleware: prints the time, method and URL of every request,
// then calls next() so the request continues to the next handler
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Static file middleware: serves lesson images from the "images" folder
app.use("/images", express.static(path.join(__dirname, "images")));

// If the image wasn't found above, send an error message
app.use("/images", (req, res) => {
  res.status(404).json({ error: "Image not found" });
});

// Connect to MongoDB Atlas using the native driver.
// The connection string is kept in an environment variable, not in the code.
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

// GET /lessons: return all lessons as JSON
app.get("/lessons", async (req, res) => {
  const lessons = await db.collection("lesson").find({}).toArray();
  res.json(lessons);
});

// POST /orders: save a new order in the "order" collection
app.post("/orders", async (req, res) => {
  const result = await db.collection("order").insertOne(req.body);
  res.json(result);
});

// PUT /lessons/:id: update any attribute(s) of one lesson
// (used after an order to set the new number of spaces)
app.put("/lessons/:id", async (req, res) => {
  const result = await db.collection("lesson").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
});

// Connect to the database first, then start listening for requests
async function start() {
  await client.connect();
  db = client.db("afterschool");
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}
start();