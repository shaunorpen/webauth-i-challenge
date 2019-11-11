const express = require("express");
const users = require("./usersModel");
const { sessions } = require("../sessions");

const router = express.Router();

router.get("/users", restricted, async (req, res) => {
  try {
    const allUsers = await users.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function restricted(req, res, next) {
  const { session_id } = req.cookies;
  const session = sessions.find(session => session.uuid === session_id);
  if (session) {
    next();
  } else {
    res.status(400).json({ message: "You shall not pass!" });
  }
}

module.exports = router;
