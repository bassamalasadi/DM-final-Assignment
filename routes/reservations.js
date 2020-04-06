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
const { asyncErrorHandler } = require("../middleware");

/* GET reservations index /reservations. */
router.get("/", asyncErrorHandler(reservationIndex));

/* GET reservations new /reservations/new. */
router.get("/new", reservationNew);

/* POST reservations create /reservations. */
router.post("/", asyncErrorHandler(reservationCreate));

/* GET reservations show /reservations/:id. */
router.get("/:id", asyncErrorHandler(reservationShow));

/* GET reservations edit /reservations/:id/edit. */
router.get("/:id/edit", asyncErrorHandler(reservationEdit));

/* PUT reservations update /reservations/:id. */
router.put("/:id", asyncErrorHandler(reservationUpdate));

/* DELETE reservations destroy /reservations/:id. */
router.delete("/:id", asyncErrorHandler(reservationDestroy));
module.exports = router;
