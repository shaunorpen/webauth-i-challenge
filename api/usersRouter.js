const express = require("express");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const users = require("./usersModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUserCreds = {
    username,
    password: bcrypt.hashSync(password, 11)
  };
  try {
    const newUser = await users.addUser(newUserCreds);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const credentials = req.body;
  const userDetails = await users.getUserBy({ username: credentials.username });
  if (
    userDetails &&
    bcrypt.compareSync(credentials.password, userDetails.password)
  ) {
    req.session.user = userDetails;
    res
      .status(200)
      .json({ message: "Welcome " + req.session.user.username });
  } else {
    res.status(400).json({ message: "You shall not pass!" });
  }
});

module.exports = router;
