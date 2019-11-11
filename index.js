const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());

server.get("*", (req, res) => {
  res.status(200).json("API is running.");
});

server.listen(port, () => {
  console.log("Server listening on port " + port);
});
