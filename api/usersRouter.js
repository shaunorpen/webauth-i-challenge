const express = require("express");
const bcrypt = require("bcryptjs");
const users = require("./usersModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUserCreds = {
      username,
      password: bcrypt.hashSync(password, 11)
  }
  try {
    const newUser = await users.addUser(newUserCreds);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const allUsers = await users.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
