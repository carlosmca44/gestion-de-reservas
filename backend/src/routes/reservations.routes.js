const { Router } = require("express");
const {
  getAllReservations,
  createReservation,
  deleteReservation,
  updateReservation,
} = require("../controllers/reservations.controller");

const router = Router();

router.get("/reservations", getAllReservations);

router.post("/reservations", createReservation);

router.delete("/reservations", deleteReservation);

router.put("/reservations", updateReservation);

module.exports = router;
