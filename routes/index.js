const express = require("express");
const router = express.Router();

const owners = require("./owners");
const profile = require("./profile");
const contacts = require("./contacts");
const projects = require("./projects");

router.use("/owners", owners);
router.use("/profile", profile);
router.use("/contacts", contacts);
router.use("/projects", projects);
router.get("/", (req, res) => {
  res.send("OK");
});
module.exports = router;
