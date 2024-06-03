const express = require('express');
const { checkMessage, getMessages, sendMessage } = require('../controllers/messageController');

const router = express.Router();

router.get('/check/:id', checkMessage);
router.get('/:id', getMessages);
router.post('/send', sendMessage);

module.exports = router;
