const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const tripsController = require("../controllers/tripsController");
router.get("/", tripsController.listTrips);     
router.get("/mine", auth, tripsController.myTrips);
router.get("/:id", tripsController.getTrip);      
router.post("/", auth, tripsController.createTrip);
router.post("/:id/join", auth, tripsController.joinTrip);
router.post("/:id/leave", auth, tripsController.leaveTrip);


module.exports = router;