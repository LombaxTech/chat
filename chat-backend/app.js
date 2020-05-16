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

// Routes middleware
app.use('/api', messageRoutes)

// * IO STUFF

io.on('connection', socket => {
    // console.log('connected')

    socket.on('msg', e => {
        // console.log(`recieved message`);
        console.log(e);
        io.emit('send message', e)
    });

    // socket.on('')

    socket.emit('test1', 'here is the results for test 1');


});

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`started listening on port ${PORT}`)
})