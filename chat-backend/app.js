const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect('mongodb://testuser:testpass123@ds255329.mlab.com:55329/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err))


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send('hello')
})

// Routes
const messageRoutes = require('./routes/message');
const authRoutes = require('./routes/auth');

// Routes middleware
app.use('/api', messageRoutes)
app.use('/api', authRoutes)

// * IO STUFF

io.on('connection', socket => {

    socket.on('join room', e => {
        socket.join(e);
    })

    socket.on('msg', e => {
        io.to(e.roomName).emit('message', e.message)
    })

});

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`started listening on port ${PORT}`)
})