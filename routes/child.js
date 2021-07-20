const express = require("express");
const db = require("../DbConnection");
const router = express.Router();
const isAuthorized = require("../middlewares/isAuthorized");
const jwt_decode = require("jwt-decode");
const moment = require("moment");
const config = require('config');

//twilio
const accountSid =config.get('TWILIO_ACCOUNT_SID');
const authToken =config.get('TWILIO_AUTH_TOKEN');
const msgToken =config.get('TWILIO_MSG_SID');
const client = require("twilio")(accountSid, authToken);


router.get("/child/:number", (req, res) => {
  const { number } = req.params;
  // let decoded = jwt_decode(req.headers["authorization"]);
  db.select("*")
    .returning("*")
    .from("child")
    .where("contact_number", "=", number)
    .then((data) => {
      db.select("*")
        .from("child")
        .fullOuterJoin("vaccines", "child.child_id", "vaccines.child_id")
        .then((data) =>
          res.json(data.filter((item) => item.contact_number === number))
        )
        .catch((err) => res.json({ message: "No child registered yet." }));
    })
    .catch((err) => res.json({ message: "No child registered yet." }));
});


router.get("/child", (req, res) => {
  let decoded = jwt_decode(req.headers["authorization"]);
  db.select("*")
    .returning("*")
    .from("child")
    .where("registered_by", "=", decoded.email)
    .then((data) => {
      db.select("*")
        .from("child")
        .fullOuterJoin("vaccines", "child.child_id", "Vaccines.child_id")
        .then((data) =>
          res.json(data.filter((item) => item.registered_by === decoded.email))
        )
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json({ message: "No child registered yet." }));
});



//register child
//address Unique
router.post("/register-child", (req, res) => {
  const { name,father_name,dob,place_of_birth,address,contact_number,registered_by} = req.body;

  // checking for empty fields
  if (!name || !father_name || !dob || !registered_by || !contact_number || !place_of_birth){
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
        next_vaccine_date: moment
          .utc(dob, "YYYY-MM-DD hh:mm:ss a")
          .add(42, "days")
          .format("M/D/YYYY"),
        increment: 1,
      })
      .then((data) => {
        db("vaccines")
          .insert({ child_id: data[0].child_id })
          .then((data) => console.log("done"));
        let text = `Dear ${data[0].father_name}! \nthanks for registering your child "${data[0].name}" 
        in vacci-cure\n\nKindly please do your initial vaccination. we'll send a alert few days before 
        the next dose.`;
        
        client.messages
          .create({
            body: text,
            messagingServiceSid: msgToken,
            to: data[0].contact_number,
          })
          .then((message) => console.log(message.sid))
          .done();

        return res.json({ message: "Registered Successfully", child: data });
      })
      .catch((err) =>
        res.status(400).json({
          message: "Cann't register a child",
        })
      );
  }
});

//Update Route
router.post("/child/vaccine/:id/:name", (req, res) => {
  const { name, id } = req.params;
  return db("vaccines")
    .update(name, req.body.value)
    .returning("*")
    .where("v_id", "=", id)
    .then((data) => res.json({ message: "updated" }))
    .catch((err) => res.json(err));
});


//Gettting Routes
router.get("/all-childs", (req, res) => {
  db.select("*")
    .from("child")
    .returning("*")
    .then((data) => res.json(data));
});


//Delete Routes
router.delete("/child/:id", (req, res) => {
  db("vaccines")
    .where("child_id", "=", req.params.id)
    .del()
    .then((data) => {
      db("child")
        .where("child_id", "=", req.params.id)
        .del()
        .then((data) => {
          db.select("*")
            .from("child")
            .then((data) => res.json(data));
        });
    })
    .catch((err) => res.json({ message: "Error deleting child." }));
});

module.exports = router;