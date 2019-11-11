const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const usersRouter = require("./api/usersRouter");
const restrictedRouter = require("./api/restrictedRouter");

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use("/api/restricted", restrictedRouter);
server.use("/api", usersRouter);

server.get("*", (req, res) => {
  res.status(200).json("API is running.");
});

server.listen(port, () => {
  console.log("Server listening on port " + port);
});
