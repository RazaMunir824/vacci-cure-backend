const express = require("express");
const db = require("../dbConnection");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt_decode = require("jwt-decode");

//Getting Routes
router.get("/user/:id", (req, res) => {
  return db
    .select("*")
    .from("users")
    .where({ user_id: req.params.id })
    .then((data) => res.json(data));
});


//Register Routes
router.post("/register", (req, res) => {
  const {username,email,contact_number, password,user_role} = req.body;

  // checking for empty fields
  if(!username || !email || !contact_number || !password || password.length < 4){
    return res.status(400).json({ message: "Please fill all the required fields." });
  }
  //encrypting password
  let hash = bcrypt.hashSync(password, 10);
  return db("users")
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
      res.status(400).json({ message: "Email or contact number already exists." })
    );
});


//Change Pasword
router.put("/change-password", (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const decoded = jwt_decode(req.headers.authorization);
  const { email, password } = decoded;
  const isUser = bcrypt.compareSync(oldPassword, password);
  const hash   = bcrypt.hashSync(newPassword, 10);

  db("users")
    .select("*")
    .where("email", "=", email)
    .then((data) => {
      if (isUser) {
        db("users")
          .update({ password: hash })
          .where("user_id", "=", decoded.user_id)
          .then((data) =>
            res.json({ message: "Password changed successfully." })
          )
          .catch((err) => {
            db("hospital")
              .select("*")
              .where("email", "=", email)
              .then((data) => {
                if (isUser) {
                  db("Hospital")
                    .update({ password: hash })
                    .where("hospital_id", "=", decoded.hospital_id)
                    .then((data) =>
                      res.json({ message: "Password changed successfully." })
                    )
                    .catch((err) => res.json({ message: "No user found." }));
                } else {
                  res.json({ message: "No user found agaist this password." });
                }
              });
          });
      } else {
        res.json({ message: "No user found agaist this password." });
      }
    })
    .catch((err) => {
      res.json({ message: "No user found agaist this password." });
    });
});


module.exports = router;