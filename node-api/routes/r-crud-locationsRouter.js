const express = require('express');
const router = express.Router();
const Locations = require('../controllers/r-crud-locationsController');

router.get('/getCRUDLocationsList', Locations.getCRUDLocationsList);
router.post('/postCRUDLocationsList', Locations.postCRUDLocationsList);
router.post('/postCRUDLoactionUpdateList', Locations.postCRUDLoactionUpdateList);

module.exports = router;