const db = require("../data/dbConfig");

function getAllUsers() {
  return db("users");
}

function getUserBy(searchParams) {
  return db("users")
    .where(searchParams)
    .first();
}

function addUser(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return getUserBy({ id });
    });
}

module.exports = {
  getAllUsers,
  getUserBy,
  addUser
};
