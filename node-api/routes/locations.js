const express = require("express");
const router = express.Router();
const Locations = require("../controllers/locationsController");

router.get("/getLocationsList", Locations.getLocationsList);
router.get("/getLocations", Locations.getLocations);
router.post("/saveLocations", Locations.saveLocations);
router.post("/searchLocationSave", Locations.searchLocationSave);
router.post('/deletelocation', Locations.deletelocation);

module.exports = router;