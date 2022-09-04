const pool = require("../db");

const getAllReservations = async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM reservations");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getPendientReservations = async (_requ, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE pendient = true"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getDenayReservations = async (_requ, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE denay = true"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const createReservation = async (req, res, next) => {
  const {
    client_name,
    hotel,
    adults_count,
    child_count,
    inf_count,
    entry_date,
    exit_date,
    double_rooms,
    simple_rooms,
    triple_rooms,
  } = req.body;

  try {
    await pool.query(
      "INSERT INTO reservations (client_name, hotel, adults_count, child_count, inf_count, entry_date, exit_date, double_rooms, simple_rooms, triple_rooms) VALUES ($1, $2, $3, $4, $5, $6 ,$7 ,$8, $9, $10)",
      [
        client_name,
        hotel,
        adults_count,
        child_count,
        inf_count,
        entry_date,
        exit_date,
        double_rooms,
        simple_rooms,
        triple_rooms,
      ]
    );
    res.send("reservacion insertada");
  } catch (error) {
    next(error);
  }
};

const deleteReservation = async (req, res, next) => {
  const { client_name } = req.body;

  try {
    await pool.query(
      "DELETE FROM reservations WHERE client_name = $1",
      [client_name]
    );
    res.send("reservacion eliminada");
  } catch (error) {
    next(error);
  }
};

const changePedientDenay = async (req, res, next) => {
  const { client_name } = req.body;

  try {
    await pool.query(
      "UPDATE reservations SET pendient = (SELECT denay FROM reservations WHERE client_name = $1), denay = (SELECT pendient FROM reservations WHERE client_name = $1) WHERE client_name = $1",
      [client_name]
    );
    res.send("reservacion modificada");
  } catch (error) {
    next(error);
  }
};

const setVoucher = async (req, res, next) => {
  const { client_name } = req.body;

  try {
    await pool.query(
      "UPDATE reservations SET pendient = false, denay = false, voucher = true WHERE client_name = $1",
      [client_name]
    );
    res.send("con voucher");
  } catch (error) {
    next(error);
  }
};

const updateReservation = async (req, res, next) => {
  const { client_name, booking } = req.body;

  try {
    await pool.query(
      "UPDATE reservations SET booking = $2 WHERE client_name = $1",
      [client_name, booking]
    );
    res.send("reservacion modificada");
  } catch (error) {
    next(error);
  }
};

//Voucher

const getVoucherDone = async (_req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE send_not_payed = false AND payed = false AND voucher = true"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getNotPayedVoucher = async (_req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE send_not_payed = true"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getPayedVoucher = async (_req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE payed = true"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getCanceledVoucher = async (_req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE canceled = true"
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const setNotPayed = async (req, res, next) => {
  const { client_name } = req.body;

  try {
    await pool.query(
      "UPDATE reservations SET send_not_payed = true WHERE client_name = $1",
      [client_name]
    );
    res.send("enviado sin pago");
  } catch (error) {
    next(error);
  }
};

const setPayed = async (req, res, next) => {
  const { client_name } = req.body;

  try {
    await pool.query(
      "UPDATE reservations SET send_not_payed = false, payed = true WHERE client_name = $1",
      [client_name]
    );
    res.send("pagado");
  } catch (error) {
    next(error);
  }
};

const setCanceled = async (req, res, next) => {
  const { client_name } = req.body;

  try {
    await pool.query(
      "UPDATE reservations SET canceled = true, send_not_payed = false WHERE client_name = $1",
      [client_name]
    );
    res.send("cancelada reservacion");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReservations,
  getPendientReservations,
  getDenayReservations,
  createReservation,
  deleteReservation,
  updateReservation,
  changePedientDenay,
  getVoucherDone,
  setVoucher,
  getNotPayedVoucher,
  getPayedVoucher,
  getCanceledVoucher,
  setNotPayed,
  setPayed,
  setCanceled,
};
