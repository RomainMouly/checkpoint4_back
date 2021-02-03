const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`ça marche port ${port}`);
});
