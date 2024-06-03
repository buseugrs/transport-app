const express = require('express');
const { createUser, checkUserPassword, getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/create', createUser);
router.post('/login', checkUserPassword);
router.get('/:id', getUser);

module.exports = router;
