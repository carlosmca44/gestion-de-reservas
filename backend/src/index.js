const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const offertsRoutes = require("./routes/reservations.routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(offertsRoutes);

app.use((err, _req, res, _next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(4000);
console.log("todo en talla");
