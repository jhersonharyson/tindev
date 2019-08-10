const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: `Olá ${req.query.name}` });
});

router.post("/devs", (req, res) => {
  return res.json(req.body);
});

module.exports = router;
