const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const usersRouter = require("./api/usersRouter");
const restrictedRouter = require("./api/restrictedRouter");

const server = express();
const port = process.env.PORT || 5000;
const sessionConfig = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  store: new KnexSessionStore({
    knex: require("./data/dbConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
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
