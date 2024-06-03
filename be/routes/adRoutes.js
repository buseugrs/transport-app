const express = require('express');
const { getAds, addAd } = require('../controllers/adController');

const router = express.Router();

router.get('/', getAds);
router.post('/add', addAd);

module.exports = router;
