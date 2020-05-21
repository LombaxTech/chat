const express = require('express');
const router = express.Router();

const { signup, signin, signout, userById } = require('../controllers/auth');

router.get('/', (req, res) => {
    res.send('auth routes')
})

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.param('userId', userById)

module.exports = router;