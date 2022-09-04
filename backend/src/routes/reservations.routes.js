const { Router } = require("express");
const {
  getAllReservations,
  createReservation,
  deleteReservation,
  updateReservation,
  getPendientReservations,
  getDenayReservations,
  changePedientDenay,
  getVoucherDone,
  setVoucher,
  getNotPayedVoucher,
  getPayedVoucher,
  setNotPayed,
  setPayed,
  setCanceled,
  getCanceledVoucher,
} = require("../controllers/reservations.controller");

const router = Router();

//Reservations

router.get("/reservations", getAllReservations);

router.get("/reservations/pendient", getPendientReservations);

router.get("/reservations/denay", getDenayReservations);

router.post("/reservations/new", createReservation);

router.delete("/reservations", deleteReservation);

router.put("/reservations", updateReservation);

router.patch("/reservations/toDenay", changePedientDenay);

router.patch("/reservations/voucher", setVoucher);

//Voucher

router.get("/voucher/done", getVoucherDone);

router.get("/voucher/notPayed", getNotPayedVoucher);

router.get("/voucher/payed", getPayedVoucher);

router.get("/voucher/canceled", getCanceledVoucher);

router.patch("/voucher/notPayed", setNotPayed);

router.patch("/voucher/payed", setPayed);

router.patch("/voucher/canceled", setCanceled);

module.exports = router;
