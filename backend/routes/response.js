const express = require('express');
const router = express.Router();
const { review } = require('../controllers/review');

router.post('/get-response', review);


module.exports = router;