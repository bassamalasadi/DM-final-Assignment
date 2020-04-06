const Reservation = require("../models/Reservation");
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = {
  // reservations index
  async reservationIndex(req, res, next) {
    if (req.query.search) {
      // get reservation by name
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      let reservations = await Reservation.find({ name: regex });
      res.render("reservations/index", { reservations });
    } else {
      //get all reservations
      let reservations = await Reservation.find({});
      res.render("reservations/index", { reservations });
    }
  },

  // new reservation
  reservationNew(req, res, next) {
    res.render("reservations/new");
  },

  // create reservation
  async reservationCreate(req, res, next) {
    let reservation = await Reservation.create(req.body.reservation);
    req.session.success = "Reservation Created Successfully!";
    res.redirect(`/reservations/${reservation.id}`);
  },
  // show reservations
  async reservationShow(req, res, next) {
    let reservation = await Reservation.findById(req.params.id);
    res.render("reservations/show", { reservation });
  },
  // reservation edit
  async reservationEdit(req, res, next) {
    let reservation = await Reservation.findById(req.params.id);
    res.render("reservations/edit", { reservation });
  },

  // reservation update
  async reservationUpdate(req, res, next) {
    let reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body.reservation
    );
    res.redirect(`/reservations/${reservation.id}`);
  },

  // reservation destroy
  async reservationDestroy(req, res, next) {
    await Reservation.findByIdAndRemove(req.params.id);
    res.redirect("/reservations");
  },
};
