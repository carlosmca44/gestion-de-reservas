const express = require("express");

const app = express();

const offertsRoutes = require("./routes/reservations.routes");

//midelware

app.use(express.json());

app.use(offertsRoutes);

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(4000);
console.log("todo en talla");
