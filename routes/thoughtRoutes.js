// routes/thoughtRoutes.js
const express = require("express");
const thoughtController = require("../controllers/thoughtController");

const router = express.Router();

router.get("/thoughts", thoughtController.getThoughts);
router.post("/thought", thoughtController.addThought);
router.delete("/thought/:id", thoughtController.deleteThought);

module.exports = router;
