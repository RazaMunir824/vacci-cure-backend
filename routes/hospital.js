const express = require("express");
const db = require("../DbConnection");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt_decode = require("jwt-decode");

router.get("/hospital/:id", (req, res) => {
  let decoded = jwt_decode(req.headers["authorization"]);
  db.select("*")
    .returning("*")
    .from("child")
    .where("registered_by", "=", decoded.email)
    .then((data) => {
      db.select("*")
        .from("child")
        .fullOuterJoin("vaccines", "child.child_id", "vaccines.child_id")
        .then((data) =>
          res.json(data.filter((item) => item.registered_by === decoded.email))
        )
        .catch((err) => res.json({ message: "No child registerd yet" }));
    })
    .catch((err) => res.json({ message: "No child registered yet." }));
});

//hospital_name email
router.post("/register-hospital", (req, res) => {
  const {hospital_name,email,contact_number, address,password,govt_private, user_role,
  } = req.body;

  // checking for empty fields
  if(!hospital_name ||!govt_private ||!address ||!email || !contact_number || !password || password.length < 4){
    return res.status(400).json({ message: "Please fill all the required fields." });
  } else{
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

router.get("/all-hospitals", (req, res) => {
  db.select("*")
    .from("hospital")
    .returning("*")
    .then((data) => res.json(data));
});

router.delete("/hospital/:id", (req, res) => {
  return db("vaccines")
    .where("child_id", "=", req.params.id)
    .del()
    .then((data) => {
      db("hospital")
        .where("hospital_id", "=", req.params.id)
        .del()
        .then((data) => {
          db.select("*")
            .from("hospital")
            .then((data) => res.json(data));
        });
    })
    .catch((err) => res.json({ message: "Error deleting Hospital." }));
});

module.exports = router;




