const { Router } = require("express");

const router = Router();

router.get("/offerts", (_req, res) => {
  res.send("OFERTAS");
});

module.exports = router;
