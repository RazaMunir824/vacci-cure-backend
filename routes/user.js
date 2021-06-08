const express = require("express");
const db = require("../dbConnection");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/user/:id", (req, res) => {
  return db
    .select("*")
    .from("user")
    .where({ user_id: req.params.id })
    .then((data) => res.json(data));
});

router.post("/register", (req, res) => {
  const {
    username,
    email,
    contact_number,
    address,
    password,
    user_role,
  } = req.body;

  // checking for empty fields
  if (
    !username ||
    !email ||
    !contact_number ||
    !password ||
    password.length < 6
  ) {
    return res
      .status(400)
      .json({ message: "Please fill all the required fields." });
  }
  //encrypting password
  let hash = bcrypt.hashSync(password, 10);

  return db("user")
    .returning("*")
    .insert({
      username,
      email,
      contact_number,
      address,
      password: hash,
      user_role,
    })
    .then((data) => res.status(200).json(data[0]))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Email or contact number already exists." })
    );
});

module.exports = router;