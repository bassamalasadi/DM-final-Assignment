const express = require("express");
const router = express.Router();
const {
  reservationIndex,
  reservationNew,
  reservationCreate,
  reservationShow,
  reservationEdit,
  reservationUpdate,
  reservationDestroy,
} = require("../controllers/reservations");
const { asyncErrorHandler, isLoggedIn } = require("../middleware");

/* GET reservations index /reservations. */
router.get("/", isLoggedIn, asyncErrorHandler(reservationIndex));

/* GET reservations new /reservations/new. */
router.get("/new", isLoggedIn, reservationNew);

/* POST reservations create /reservations. */
router.post("/", isLoggedIn, asyncErrorHandler(reservationCreate));

/* GET reservations show /reservations/:id. */
router.get("/:id", asyncErrorHandler(reservationShow));

/* GET reservations edit /reservations/:id/edit. */
router.get("/:id/edit", isLoggedIn, asyncErrorHandler(reservationEdit));

/* PUT reservations update /reservations/:id. */
router.put("/:id", isLoggedIn, asyncErrorHandler(reservationUpdate));

/* DELETE reservations destroy /reservations/:id. */
router.delete("/:id", isLoggedIn, asyncErrorHandler(reservationDestroy));
module.exports = router;
