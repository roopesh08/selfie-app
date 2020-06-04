const express = require("express");
const Datastore = require("nedb");
const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api/selfie", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

app.post("/api", (req, res) => {
  const data = req.body;

  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  //   console.log(database);
  res.json({
    status: "success",
    data,
  });
});

port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening ${port}`);
});
