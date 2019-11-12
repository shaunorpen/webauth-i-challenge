const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const usersRouter = require("./api/usersRouter");
const restrictedRouter = require("./api/restrictedRouter");

const server = express();
const port = process.env.PORT || 5000;
const sessionConfig = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));
server.use("/api/restricted", restrictedRouter);
server.use("/api", usersRouter);

server.get("*", (req, res) => {
  res.status(200).json("API is running.");
});

server.listen(port, () => {
  console.log("Server listening on port " + port);
});
