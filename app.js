const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 6000;
const server = require('http').createServer(app);
const joi = require('joi');
const io = require('socket.io')(server);
const bodyparser = require('body-parser')

const robaye="this is a simple update on the app"

app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use('/upload', upload)
app.use('/catagory', catagory)
app.use(express.static(path.join('C:', 'Users', 'Robel', 'Desktop', 'FimApp', '/Uploads')));
app.get('/', (req, res) => {
    res.json({
        message: "welcome to our app"
    });
});
function notFound(req, res, next) {
    const error = new Error(`there is an error +${req.OrginalUrl}`);
    next(error);
}

function Errorhandler(error, req, res, next) {
    res.status(400);
    res.json({
        error: error.message,
        stack: error.stack,
    });
    console.log(error.message, ' and ', error.stack);
}


app.use(notFound);
app.use(Errorhandler);
mongoose
    .connect('mongodb://localhost:27017/filmabc', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log(`database successfully connected`));
server.listen(port, () => {
    console.log(`app started on a port ${port}`);
});