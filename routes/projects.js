const express = require("express");
const router = express.Router();
const connection = require("../config");

router.get("/", (req, res) => {
  connection.query("SELECT * FROM project", (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM project WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    }
  );
});

router.post("/", (req, res) => {
  connection.query("INSERT INTO project SET ?", [req.body], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a project");
    } else {
      res.status(200).send("Successfully saved a project");
    }
  });
});

router.delete("/:id", (req, res) => {
  connection.query(
    "DELETE FROM project WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting a project");
      } else {
        res.status(200).send("project deleted!");
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const newProject = req.body;
  const idProject = req.params.id;

  connection.query(
    "UPDATE project SET ? WHERE id = ?",
    [newProject, idProject],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating project");
      } else {
        res.status(200).send("Project successfully updated");
      }
    }
  );
});

module.exports = router;
