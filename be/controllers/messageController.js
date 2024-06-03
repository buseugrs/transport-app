const Message = require('../models/Message');

const checkMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const unreadMessages = await Message.count({ where: { receiver: id, isRead: false } });
        res.status(200).json({ unreadMessages: unreadMessages > 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessages = async (req, res) => {
    const { id } = req.params;
    try {
        const messages = await Message.findAll({ where: { receiver: id } });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sendMessage = async (req, res) => {
    const { sender, receiver, message } = req.body;
    try {
        const newMessage = await Message.create({ sender, receiver, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { checkMessage, getMessages, sendMessage };
