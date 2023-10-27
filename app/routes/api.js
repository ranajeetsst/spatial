// app/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const controller = require("../controllers");

// ===== Start points  =====
router.route("/points")
.post(controller.pointsController.create)
.get(controller.pointsController.get)
// .put(controller.pointsController.update)
router.put('/points/:pointId', controller.pointsController.update)
// ===== End points =====

// ===== Start polygon =====
router.route("/polygons")
.post(controller.polygonsController.create)
.get(controller.polygonsController.get)
router.put('/polygons/:polygonId', controller.polygonsController.update)
// ===== End polygon =====


module.exports = router;
