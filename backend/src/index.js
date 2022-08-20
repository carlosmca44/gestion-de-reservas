const express = require("express");
const morgan = require("morgan");

const offertsRoutes = require("./routes/reservations.routes");

const app = express();

//midelware

app.use(offertsRoutes);

app.listen(4000);
console.log("express en el 4000");
