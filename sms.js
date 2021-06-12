// const Vonage = require("@vonage/server-sdk");
// const db = require("./DbConnection");
// const cron = require("node-cron");
// const moment = require("moment");

// // SMS Service
// const vonage = new Vonage({
//   apiKey: process.env.API_KEY,
//   apiSecret: process.env.API_SECRET,
// });

// const from = "Vacci-Cure";

// cron.schedule("0 0 0 * * *", () => {
//   const d = new Date();
//   // selecting the number to send sms
//   db.select(
//     "contact_number",
//     "increment",
//     "dob",
//     "next_vaccine_date",
//     "name",
//     "father_name"
//   )
//     .from("Child")
//     .returning("*")
//     .where(
//       "next_vaccine_date",
//       "=",
//       `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
//     )
//     .then((data) => {
//       for (let i = 0; i < data.length; i++) {
//         switch (data[i].increment) {
//           case 1: {
//             let text = `Dear ${data[i].father_name}! \n please vaccinate your child ${data[i].name} on ${data[i].next_vaccine_date}`;
//             //calculating next vaccine date
//             let nextDate = moment(data[i].next_vaccine_date, "M/D/YYYY")
//               .add(75, "days")
//               .format("M/D/YYYY");

//             //sending message to the relevent contact_number
//             vonage.message.sendSms(
//               from,
//               data[i].contact_number,
//               text,
//               (err, responseData) => {
//                 if (err) {
//                   console.log("Something went wrong");
//                 } else {
//                   if (responseData) {
//                     console.log("Message sent successfully.");
//                   } else {
//                     console.log(
//                       `Message failed with error: ${responseData.messages[0]["error-text"]}`
//                     );
//                   }
//                 }
//               }
//             );
//             //saving the chnages in db for next round of sms
//             db("Child")
//               .where("contact_number", "=", data[i].contact_number)
//               .update({
//                 increment: data[i].increment + 1,
//                 next_vaccine_date: nextDate,
//               })
//               .then((data) => console.log(data));
//             break;
//           }
//           case 2: {
//             let text = `Dear ${data[i].father_name}! \n please vaccinate your child ${data[i].name} on ${data[i].next_vaccine_date}`;
//             //calculating next vaccine date
//             let nextDate = moment(data[i].next_vaccine_date, "M/D/YYYY")
//               .add(105, "days")
//               .format("M/D/YYYY");

//             //sending message to the relevent contact_number
//             vonage.message.sendSms(
//               from,
//               data[i].contact_number,
//               text,
//               (err, responseData) => {
//                 if (err) {
//                   console.log("Something went wrong");
//                 } else {
//                   if (responseData) {
//                     console.log("Message sent successfully.");
//                   } else {
//                     console.log(
//                       `Message failed with error: ${responseData.messages[0]["error-text"]}`
//                     );
//                   }
//                 }
//               }
//             );
//             //saving the chnages in db for next round of sms
//             db("Child")
//               .where("contact_number", "=", data[i].contact_number)
//               .update({
//                 increment: data[i].increment + 1,
//                 next_vaccine_date: nextDate,
//               })
//               .then((data) => console.log(data));
//             break;
//           }
//           case 3: {
//             let text = `Dear ${data[i].father_name}! \n please vaccinate your child ${data[i].name} on ${data[i].next_vaccine_date}`;
//             //calculating next vaccine date
//             let nextDate = moment(data[i].next_vaccine_date, "M/D/YYYY")
//               .add(270, "days")
//               .format("M/D/YYYY");

//             //sending message to the relevent contact_number
//             vonage.message.sendSms(
//               from,
//               data[i].contact_number,
//               text,
//               (err, responseData) => {
//                 if (err) {
//                   console.log("Something went wrong");
//                 } else {
//                   if (responseData) {
//                     console.log("Message sent successfully.");
//                   } else {
//                     console.log(
//                       `Message failed with error: ${responseData.messages[0]["error-text"]}`
//                     );
//                   }
//                 }
//               }
//             );
//             //saving the chnages in db for next round of sms
//             db("Child")
//               .where("contact_number", "=", data[i].contact_number)
//               .update({
//                 increment: data[i].increment + 1,
//                 next_vaccine_date: nextDate,
//               })
//               .then((data) => console.log(data));
//             break;
//           }
//           case 4: {
//             let text = `Dear ${data[i].father_name}! \n please vaccinate your child ${data[i].name} on ${data[i].next_vaccine_date}`;
//             //calculating next vaccine date
//             let nextDate = moment(data[i].next_vaccine_date, "M/D/YYYY")
//               .add(455, "days")
//               .format("M/D/YYYY");

//             //sending message to the relevent contact_number
//             vonage.message.sendSms(
//               from,
//               data[i].contact_number,
//               text,
//               (err, responseData) => {
//                 if (err) {
//                   console.log("Something went wrong");
//                 } else {
//                   if (responseData) {
//                     console.log("Message sent successfully.");
//                   } else {
//                     console.log(
//                       `Message failed with error: ${responseData.messages[0]["error-text"]}`
//                     );
//                   }
//                 }
//               }
//             );
//             //saving the chnages in db for next round of sms
//             db("Child")
//               .where("contact_number", "=", data[i].contact_number)
//               .update({
//                 increment: data[i].increment + 1,
//                 next_vaccine_date: nextDate,
//               })
//               .then((data) => console.log(data));
//             break;
//           }
//         }
//       }
//     })
//     .catch((err) => console.log(err));
// });

// module.exports;