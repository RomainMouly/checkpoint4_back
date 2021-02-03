const express = require("express");
const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM contact", (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.post("/", (req, res) => {
  connection.query("INSERT INTO contact SET ?", [req.body], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a contact");
    } else {
      res.status(200).send("Successfully saved a contact");
    }
  });
});

router.delete("/:id", (req, res) => {
  connection.query("DELETE FROM contact WHERE id=?", [req.params.id], (err) => {
    if (err) {
      res.status(500).send("Error deleting a contact");
    } else {
      res.status(200).send("contact deleted");
    }
  });
});

module.exports = router;
