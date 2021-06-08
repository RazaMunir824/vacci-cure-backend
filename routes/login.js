const express = require('express')
const router = express.Router()
const db = require("../DbConnection");
const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.select("email", "password")
      .from("users")
      .where("email", "=", email)
      .then((data) => {
        let isValid = bcrypt.compareSync(password, data[0].password);
        if (isValid) {
          db.select("*")
            .from("users")
            .where("email", "=", email)
            .then((data) => res.json(data[0]))
            .catch((err) =>
              res.status(400).json({ message: "Password or email incorrect." })
            );
        } else {
          res.status(400).json({ message: "Password or email incorrect." });
        }
      })
      .catch((err) => res.status(400).json({ message: "User doesn't exits or else" }));
});
  

module.exports = router;