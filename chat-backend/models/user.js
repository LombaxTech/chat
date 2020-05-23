const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: String
}, { timestamps: true });

const inboxSchema = new Schema({
    partnerName: {
        type: String,
        required: true
    },
    partnerId: {
        type: String,
        required: true
    },
    messages: [messageSchema]
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    inbox: [inboxSchema]
})

const User = mongoose.model('User', userSchema);
module.exports = User;

// ? Role 0 => student, 1 => tutor, 2 => admin