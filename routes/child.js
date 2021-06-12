const express = require("express");
const db = require("../DbConnection");
const router = express.Router();
const isAuthorized = require("../middlewares/isAuthorized");

router.get("/child",isAuthorized, (req, res) => {
  let email = "ali@gmail.co";
  return db
    .select("*")
    .returning('*')
    .from("child")
    .where("registered_by", "=", email)
    .then((data) => res.json(data[0]))
    .catch((err) => res.json({ message: "Child not found" }));
});

//address Unique
router.post("/register-child", (req, res) => {
  const {
    name,
    father_name,
    dob,
    place_of_birth,
    address,
    contact_number,
    registered_by,
  } = req.body;

  // checking for empty fields
  if (
    !name ||
    !father_name ||
    !dob ||
    !registered_by ||
    !contact_number ||
    !place_of_birth
  ) {
    return res
      .status(400)
      .json({ message: "Please fill all the required fields." });
  } else {
    return db("child")
      .returning("*")
      .insert({
        name,
        father_name,
        dob,
        place_of_birth,
        address,
        contact_number,
        registered_by,
      })
      .then((data) =>
        res.json({ message: "Registered Successfully", child: data })
      )
      .catch((err) =>
        // res.status(400).json({
        //   message: "Cann't register a child",
        // })
        console.log(err)
      );
  }
});

module.exports = router;