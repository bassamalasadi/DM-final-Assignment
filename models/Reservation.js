const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  name: String,
  time: String,
  date: String,
  description: String,
  doctor: String,
  location: String,
});

module.exports = mongoose.model("Reservation", ReservationSchema);
