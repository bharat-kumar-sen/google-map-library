const express = require("express");
const router = express.Router();
const Locations = require("../controllers/locationsController");

router.get("/getLocationsList", Locations.getLocationsList);
router.post("/saveLocations", Locations.saveLocations);
// router.post('/deleteLocations', Regions.deleteLocations);

module.exports = router;