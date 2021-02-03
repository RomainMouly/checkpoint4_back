const express = require("express");
const router = express.Router();
const connection = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM owner", (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.post("/", (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  connection.query(
    "INSERT INTO owner (firstname, lastname, email, password) VALUES(?, ?, ?, ?)",
    [firstname, lastname, email, passwordHash],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("error with the projects owner");
      } else {
        res.status(200).send("owner saved with success");
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM owner WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const goodPassword = bcrypt.compareSync(password, result[0].password);
        if (goodPassword) {
          jwt.sign({ result }, process.env.SECRET_KEY_JWT, (err, token) => {
            res.json({ token });
          });
        } else {
          res.status(500).send("mot de passe incorrect");
        }
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const newOwner = req.body;
  const idOwner = req.params.id;

  connection.query(
    "UPDATE owner SET ? WHERE id = ?",
    [newOwner, idOwner],
    (err) => {
      if (err) {
        res.status(500).send("error updating owner");
      } else {
        res.status(200).send("owner successfully updated");
      }
    }
  );
});

module.exports = router;
