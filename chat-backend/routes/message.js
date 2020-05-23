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

// router.post('/:name/message', async (req, res) => {
//     let userName = 'rakib';
//     let partnerName = req.params.name;
//     let { message } = req.body;

//     try {
//         let user = await User.findOne({ name: userName });
//         if (!user) return res.status(400).json({ error: "YOU does not have account" })
//         // let partner = await User.findOne({ name: partnerName });
//         // if (!partner) return res.status(400).json({ error: "partner does not exist" })
//         // res.json(user);
//         let inbox = user.inbox;
//         // res.json(inbox);
//         let currentChat = inbox.filter(chat => chat.partner == partnerName);
//         // res.json(currentChat);
//         if (currentChat.length == 0) {
//             inbox.push({
//                 partner: partnerName
//             })
//             currentChat = inbox.filter(chat => chat.partner == partnerName);
//         }
//         currentChat[0].messages.push({
//             name: userName,
//             message
//         })
//         try {
//             let result = await user.save();
//             res.json({ success: true, result })
//         } catch (error) {
//             res.json({ error })
//         }
//     } catch (error) {
//         return res.status(400).json({ error: `there has been an error of: ${error}` })
//     }
// })

router.post('/:userTwoId/message', async (req, res) => {
    let userOneId = '5ec58b1b31024c309065d79f';
    let { userTwoId } = req.params;
    let { message } = req.body;

    try {
        let userOne = await User.findOne({ _id: userOneId });
        if (!userOne) return res.status(400).json({ error: "User 1 does not have account" })
        let userTwo = await User.findOne({ _id: userTwoId });
        if (!userTwo) return res.status(400).json({ error: "User 2 does not have account" })

        let userOneInbox = userOne.inbox;
        let userTwoInbox = userTwo.inbox;

        let userOneCurrentChat = userOneInbox.filter(chat => chat.partnerId == userTwoId);

        // return res.json({ userOneCurrentChat })

        if (userOneCurrentChat.length == 0) {
            userOneInbox.push({
                partnerName: userTwo.name,
                partnerId: userTwoId
            })
            userTwoInbox.push({
                partnerName: userOne.name,
                partnerId: userOneId
            })
            userOneCurrentChat = userOneInbox.filter(chat => chat.partnerId == userTwoId);
        }
        let userTwoCurrentChat = userTwoInbox.filter(chat => chat.partnerId == userOneId);

        // return res.json({ userOneCurrentChat, userTwoCurrentChat })
        userOneCurrentChat[0].messages.push({
            name: userOne.name,
            message
        })
        userTwoCurrentChat[0].messages.push({
            name: userOne.name,
            message
        })
        try {
            let result = await userOne.save();
            let resultTwo = await userTwo.save();
            res.json({ success: true, result, resultTwo })
        } catch (error) {
            res.json({ error })
        }
    } catch (error) {
        return res.status(400).json({ error: `there has been an error of: ${error}` })
    }
})

// * GETTING INBOX FOR A USER 
router.get('/inbox/:userId', async (req, res) => {
    let { userId } = req.params;

    try {
        let user = await User.findOne({ _id: userId });
        if (!user) return res.status(400).json({ error: `user not found` });

        return res.json(user.inbox);
    } catch (error) {
        return res.json({ error })
    }
})

// * GET A SPECIFIC CHAT
router.get('/inbox/:userId/:chatId', async (req, res) => {
    let { userId, chatId } = req.params;
    try {
        let user = await User.findOne({ _id: userId });
        if (!user) return res.status(400).json({ error: `user not found` });

        let inbox = user.inbox;
        let chat = inbox.filter(chat => chat._id == chatId)[0]
        return res.json(chat);
    } catch (error) {
        return res.json({ error })
    }
})

module.exports = router;