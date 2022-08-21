const { Router } = require("express");
const {
  getAllReservations,
  createReservation,
  deleteReservation,
  updateReservation,
  getPendientReservations,
  getDenayReservations,
} = require("../controllers/reservations.controller");

const router = Router();

router.get("/reservations", getAllReservations);

router.get("/reservations/pendient", getPendientReservations);

router.get("/reservations/denay", getDenayReservations);

router.post("/reservations", createReservation);

router.delete("/reservations", deleteReservation);

router.put("/reservations", updateReservation);

module.exports = router;
