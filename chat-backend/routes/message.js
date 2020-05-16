const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.get('/', (req, res) => {
    res.send('message routes');
})

router.post('/message', async (req, res) => {

    let name = "Rakib";
    let { messageContent } = req.body;

    let message = new Message({ name, message: messageContent });
    try {
        let result = await message.save();
        res.send(result);
    } catch (error) {
        res.send(`error of: ${error}`)
    }
})

module.exports = router;