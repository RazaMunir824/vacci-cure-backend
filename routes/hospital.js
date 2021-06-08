const express = require("express");
const db = require("../DbConnection");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/hospital/:id", (req, res) => {
  return db
    .select("*")
    .from("hospital")
    .where({ hospital_id: req.params.id })
    .then((data) => res.json(data[0]))
    .catch((err) => res.json({ message: "Hospital not found" }));
});

//hospital_name email
router.post("/register-hospital", (req, res) => {
  const {
    hospital_name,
    email,
    contact_number,
    address,
    password,
    govt_private,
    user_role,
  } = req.body;

  // checking for empty fields
  if (
    !hospital_name ||
    !govt_private ||
    !address ||
    !email ||
    !contact_number ||
    !password ||
    password.length < 6
  ) {
    return res
      .status(400)
      .json({ message: "Please fill all the required fields." });
  } else {
    //encrypting password
    let hash = bcrypt.hashSync(password, 10);

    return db("hospital")
      .returning("*")
      .insert({
        hospital_name,
        email,
        contact_number,
        address,
        password: hash,
        govt_private,
        user_role,
      })
      .then((data) =>
        res.json({ message: "Registered Successfully", user: data })
      )
      .catch((err) =>
        // res.status(400).json({
        //   message: "Email/contact_number/hospital_name  already exists.",
        // })
        console.log(err)
      );
  }
});

module.exports = router;