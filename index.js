const express = require("express");
const app = express();
const cors = require("cors");
// const routes = require("./routes");
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json())
// app.use(routes);

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
