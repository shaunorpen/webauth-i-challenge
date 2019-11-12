const express = require("express");
const users = require("./usersModel");

const router = express.Router();

router.get("/users", restricted, async (req, res) => {
  try {
    const allUsers = await users.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/*", restricted, async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "You're logged in ok, but nothing to show here." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

module.exports = router;
