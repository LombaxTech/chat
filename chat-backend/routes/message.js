const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');

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

router.post('/:name/message', async (req, res) => {
    let userName = 'rakib';
    let partnerName = req.params.name;
    let { message } = req.body;

    try {
        let user = await User.findOne({ name: userName });
        if (!user) return res.status(400).json({ error: "YOU does not have account" })
        // let partner = await User.findOne({ name: partnerName });
        // if (!partner) return res.status(400).json({ error: "partner does not exist" })
        // res.json(user);
        let inbox = user.inbox;
        res.json(inbox);

    } catch (error) {
        return res.status(400).json({ error: `there has been an error of: ${error}` })
    }
})

module.exports = router;