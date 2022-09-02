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

const updateReservation = async (req, res, next) => {
  const { client_name, booking } = req.body;

  try {
    await pool.query(
      "UPDATE reservations SET booking = $2 WHERE client_name = $1",
      [client_name, booking]
    );
    res.send("reservacion modificada");
  } catch (error) {
    res.send("no se pudo modificar");
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
};
