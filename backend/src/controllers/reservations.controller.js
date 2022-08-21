const pool = require("../db");

const getAllReservations = async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM reservations");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const createReservation = async (req, res, next) => {
  const { client_name, booking } = req.body;

  try {
    await pool.query(
      "INSERT INTO reservations (client_name, booking) VALUES ($1, $2)",
      [client_name, booking]
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
  createReservation,
  deleteReservation,
  updateReservation,
};
