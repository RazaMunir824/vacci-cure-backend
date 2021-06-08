const express = require("express");
const db = require("../DbConnection");
const bcrypt = require("bcrypt");
const router = express.Router();
router.get("/:id", (req, res) => {
  return db
    .select("*")
    .from("users")
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
  //console.log(hash)
  return db("users")
    .returning('*')
    .insert({
      username,
      email,
      contact_number,
      address,
      password : hash,
      user_role,
    })
    .then((data) =>
      res.json({ message: "Registered Successfully", user: data })
    )
    .catch((err) =>
     console.log(err)
    );
});

module.exports = router;