const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 5000;
//mongo db
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yx1p8kh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const employeeCollection = client.db("employeeDB").collection("employee");
    //post task
    app.post("/employee", async (req, res) => {
      const employee = req.body;
      const result = await employeeCollection.insertOne(employee);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("ASIF INC SERVER IS RUNNING");
});

app.listen(port, () => {
  console.log(`ASIF INC SERVER IS RUNNING ${port}`);
});
