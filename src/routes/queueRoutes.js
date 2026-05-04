const express = require("express");
const router = express.Router();
const queueController = require("../controllers/queueController");

router.post("/", queueController.enqueue);
router.get("/", queueController.list);
router.put("/next", queueController.next);
router.get("/history/:date", queueController.history);

module.exports = router;