const { Router } = require("express");
const {
  getAllReservations,
  createReservation,
  deleteReservation,
  updateReservation,
  getPendientReservations,
  getDenayReservations,
  changePedientDenay,
} = require("../controllers/reservations.controller");

const router = Router();

router.get("/reservations", getAllReservations);

router.get("/reservations/pendient", getPendientReservations);

router.get("/reservations/denay", getDenayReservations);

router.post("/reservations/new", createReservation);

router.delete("/reservations", deleteReservation);

router.put("/reservations", updateReservation);

router.patch("/reservations/toDenay", changePedientDenay);

module.exports = router;
