//initial setup for server
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 5000;
//mongo db
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    //post employee data
    app.post("/employee", async (req, res) => {
      const employee = req.body;
      const result = await employeeCollection.insertOne(employee);
      res.send(result);
    });
    //get employee data
    app.get("/employee", async(req, res)=>{
        const query = {}
        const result = await employeeCollection.find(query).toArray();
        res.send(result);
    })
    //delete an employee
    app.delete("/employee/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await employeeCollection.deleteOne(query);
        res.send(result);
      });
    //block an employee
    app.put("/blockEmployee/:id", async(req, res)=>{
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            isBlock: true
          },
        };
        const result = await employeeCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      })
    //unblock an employee
    app.put("/unblockEmployee/:id", async(req, res)=>{
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            isBlock: false
          },
        };
        const result = await employeeCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      })
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
