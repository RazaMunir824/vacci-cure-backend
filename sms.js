const Vonage = require("@vonage/server-sdk");
const db = require("./dbConnection");
const cron = require("node-cron");
const moment = require("moment");
const config = require('config');


//twilio
const accountSid =config.get('TWILIO_ACCOUNT_SID');
const authToken =config.get('TWILIO_AUTH_TOKEN');
const msgToken =config.get('TWILIO_MSG_SID');
const client = require("twilio")(accountSid, authToken);

// SMS Service
// const vonage = new Vonage({
//   apiKey: process.env.API_KEY,
//   apiSecret: process.env.API_SECRET,
// });

const from = "Vacci-Cure";

cron.schedule("0 0 0 * * *", () => {
  const d = new Date();
  // selecting the number to send sms
  db.select(
    "contact_number",
    "increment",
    "dob",
    "next_vaccine_date",
    "name",
    "father_name"
  )
    .from("child")
    .returning("*")
    .where(
      "next_vaccine_date",
      "=",
      `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
    )
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        switch (data[i].increment) {
          case 1: {
            let text = `Dear ${data[i].father_name}! \n please vaccinate your child ${data[i].name} on ${data[i].next_vaccine_date}`;
            //calculating next vaccine date
            let nextDate = moment(data[i].next_vaccine_date, "M/D/YYYY")
              .add(75, "days")
              .format("M/D/YYYY");


            client.messages
              .create({
                body: text,
                messagingServiceSid: msgToken,
                to: data[i].contact_number,
              })
              .then((message) => console.log(message.sid))
              .done();
            //saving the chnages in db for next round of sms
            db("child")
              .where("contact_number", "=", data[i].contact_number)
              .update({
                increment: data[i].increment + 1,
                next_vaccine_date: nextDate,
              })
              .then((data) => console.log(data));
            break;
          }
          case 2: {
            let text = `Dear ${data[i].father_name}! \n please vaccinate your child ${data[i].name} on ${data[i].next_vaccine_date}`;
            //calculating next vaccine date
            let nextDate = moment(data[i].next_vaccine_date, "M/D/YYYY")
              .add(105, "days")
              .format("M/D/YYYY");

            client.messages
              .create({
                body: text,
                messagingServiceSid: msgToken,
                to: data[i].contact_number,
              })
              .then((message) => console.log(message.sid))
              .done();
            //saving the chnages in db for next round of sms
            db("child")
              .where("contact_number", "=", data[i].contact_number)
              .update({
                increment: data[i].increment + 1,
                next_vaccine_date: nextDate,
              })
              .then((data) => console.log(data));
            break;
          }
          case 3: {
            let text = `Dear ${data[i].father_name}! \n please vaccinate your child ${data[i].name} on ${data[i].next_vaccine_date}`;
            //calculating next vaccine date
            let nextDate = moment(data[i].next_vaccine_date, "M/D/YYYY")
              .add(270, "days")
              .format("M/D/YYYY");

            client.messages
              .create({
                body: text,
                messagingServiceSid: msgToken,
                to: data[i].contact_number,
              })
              .then((message) => console.log(message.sid))
              .done();
            //saving the chnages in db for next round of sms
            db("child")
              .where("contact_number", "=", data[i].contact_number)
              .update({
                increment: data[i].increment + 1,
                next_vaccine_date: nextDate,
              })
              .then((data) => console.log(data));
            break;
          }
          case 4: {
            let text = `Dear ${data[i].father_name}! \n please vaccinate your child ${data[i].name} on ${data[i].next_vaccine_date}`;
            //calculating next vaccine date
            let nextDate = moment(data[i].next_vaccine_date, "M/D/YYYY")
              .add(455, "days")
              .format("M/D/YYYY");

            client.messages
              .create({
                body: text,
                messagingServiceSid: msgToken,
                to: data[i].contact_number,
              })
              .then((message) => console.log(message.sid))
              .done();
            //saving the chnages in db for next round of sms
            db("child")
              .where("contact_number", "=", data[i].contact_number)
              .update({
                increment: data[i].increment + 1,
                next_vaccine_date: nextDate,
              })
              .then((data) => console.log(data));
            break;
          }
        }
      }
    })
    .catch((err) => console.log(err));
});

module.exports;