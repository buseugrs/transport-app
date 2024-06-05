const express = require('express');
const { createUser, checkUserPassword, getUser, updateFavoriteAds, getFavoriteAds } = require('../controllers/userController');

const router = express.Router();

router.post('/create', createUser);
router.post('/login', checkUserPassword);
router.get('/:id', getUser);
router.post('/updateFavorites/:username', updateFavoriteAds);
router.get('/getFavoriteAds/:username', getFavoriteAds);

module.exports = router;
