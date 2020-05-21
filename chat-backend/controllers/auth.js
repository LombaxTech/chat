const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
        let { email, name, password, role } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            email,
            name,
            role,
            password: hashedPassword
        });
        user = await user.save();
        res.json(user);
    } catch (error) {
        res.send(`error of: ${error}`);
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'user not found' });

        if (!(await bcrypt.compare(password, user.password))) {
            return res.send('email and password do not match');
        }

        // res.send(`welcome ${user.name}!`);
        const token = jwt.sign({ _id: user._id }, 'mySecretKey');
        res.cookie('testCookie', token, { expire: new Date() + 9999 });
        // let { _id, name, email } = user;
        return res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        return res.send(`error of: ${error}`)
    }
}

exports.signout = (req, res) => {
    res.clearCookie('testCookie');
    return res.send('successfully signed out');
}

exports.userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) return res.status(400).json({ error: `no user` });
        req.profile = user;
        next();
    } catch (error) {
        return res.status(400).json({ error: `error of ${error}` });
    }
}
